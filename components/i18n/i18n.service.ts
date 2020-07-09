import { Injectable, Inject } from '@angular/core';
import { Observable, merge, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { deepMerge, serializeStringJsonPath, logging } from 'yue-ui/core/utils';

import { YueUiI18nDictionary, YueUiI18nLanguage, YueUiI18nComponentsDictionary, YueUiI18nNotFoundHandler } from './i18n.intefaces';
import { YUE_UI_I18N_DICTIONARY, YUE_UI_I18N_COMPONENTS_DICTIONARY, YUE_UI_I18N_LANGUAGE, YUE_UI_I18N_NOT_FOUND_HANDLER } from './i18n.utils';


const logger = logging.getLogger('core.i18n');



@Injectable()
export class YueUiI18nService {

  constructor(
    @Inject(YUE_UI_I18N_NOT_FOUND_HANDLER) private readonly notFoundHandler: YueUiI18nNotFoundHandler,
    @Inject(YUE_UI_I18N_DICTIONARY) private readonly dictionary: YueUiI18nDictionary,
    @Inject(YUE_UI_I18N_COMPONENTS_DICTIONARY) private readonly componentsDictionary: YueUiI18nComponentsDictionary,
    @Inject(YUE_UI_I18N_LANGUAGE) private readonly language: YueUiI18nLanguage
  ) {
  }

  public dictionaryAsync(): Observable<any> {
    return this.dictionary.asObservable();
  }

  public getLanguage(): string | null {
    return this.language.getValue();
  }

  public async setLanguage(language: string): Promise<any> {
    return fetch(`assets/i18n/${language}.json`)
      .then(res => res.json())
      .then((response) => {
        if (response.hasOwnProperty(`components`)) {
          const A01 = this.componentsDictionary.getValue();
          const A02 = response.components;
          const A03 = deepMerge(A01, A02) as any;
          this.componentsDictionary.next(A03);
        }
        this.language.next(language);
        this.dictionary.next(response);
      })
      .catch(() => {
        logger.error(`The language file was not found, check if the following file exists in your "assets" folder: "assets/i18n/${language}.json"`);
      });
  }

  public parserInterpolate(str: string, parameters: {[x: string]: any} = {}): string {
    const parKeys: string[] = Object.keys(parameters);
    if (parKeys.length > 0) {
      let someIsObservable = false;
      const whichIsObsevables: string[] = [];
      for (let i = 0, l = parKeys.length; i < l; i++) {
        if (typeof parameters[parKeys[i]].subscribe === 'function') {
          someIsObservable = true;
          whichIsObsevables.push(parKeys[i]);
        }
      }
      if (someIsObservable) {
        logger.error(`Sorry but the messages parameters can't contain an observable. This is the keys that are observable in this message: ${JSON.stringify(whichIsObsevables, void 0, 2)}`);
      } else {
        let formmated: string = str;
        for (let i = 0, l = parKeys.length; i < l; i++) {
          const regex: RegExp = new RegExp(`{${parKeys[i]}}`, 'gm');
          if (regex.test(formmated)) {
            formmated = formmated.replace(regex, parameters[parKeys[i]]);
          }
        }
        return formmated;
      }
    }
    return str;
  }

  public translate(token: string, parameters: Partial<any> = {}): string {
    if (/\|/gm.test(token)) {
      const segments: string[] = token.split('|');
      token = segments.shift() as string;
      const pars: Partial<any> = {};
      for (let i = 0, l = segments.length; i < l; i++) {
        if (/\:/gm.test(segments[i])) {
          const pair: string[] = segments[i].split(':');
          if (pair[0]) {
            pars[pair[0]] = pair[1];
          } else {
            logger.error(`Sorry, but we have an error on parsing piped parameters to default entry data.`);
          }
        }
      }
      parameters = Object.assign(parameters, pars);
    }
    if (/\[\]/.test(token)) {
      logger.info(`Sorry but the token formation is invalid, it is not allowed to access values with the bracket model.`);
      logger.info(`You can do the following, transform the token from that:`);
      logger.info(`  YOUR_TOKEN['YOU_SUB_TOKEN']`);
      logger.info(`To this:`);
      logger.info(`  YOUR_TOKEN.YOU_SUB_TOKEN`);
    } else {
      if (!(/^components/gm.test(token))) {
        const language: string | null = this.language.getValue();
        const source: { [x: string]: string | object } | null = this.dictionary.getValue();
        if (language) {
          if (source) {
            if (/\./gm.test(token)) {
              const serialize = serializeStringJsonPath(source);
              if (serialize.hasOwnProperty(token)) {
                if (typeof serialize[token] === `string`) {
                  return this.parserInterpolate(serialize[token] as string, parameters);
                }
              }
            } else {
              if (source.hasOwnProperty(token)) {
                if (typeof source[token] === `string`) {
                  return this.parserInterpolate(source[token] as string, parameters);
                }
              }
            }
          }
        }
      } else {
        const path = token.replace(/^components\./, '');
        const componentName = path.split(`.`).shift() as string;
        const minorPath = path.replace(`${componentName}.`, '').split('.').shift() as string;
        const source: { [x: string]: { [x: string]: string } } | null = this.componentsDictionary.getValue();
        if (source) {
          if (source.hasOwnProperty(componentName)) {
            const target = source[componentName];
            const serialize = serializeStringJsonPath(target);
            if (serialize.hasOwnProperty(minorPath)) {
              return this.parserInterpolate(serialize[minorPath], parameters);
            }
          }
        }
      }
    }
    if (this.notFoundHandler && typeof this.notFoundHandler.handle === `function`) {
      const retum = this.notFoundHandler.handle(token, parameters, this);

      if (retum !== void 0) {
        return retum;
      }
    }
    return token;
  }

  public translateAsync(token: string, parameters: Partial<any> = {}): Observable<string> {
    return merge(
      of(this.translate(token, parameters)),
      this.dictionary.asObservable().pipe(filter(v => v !== null), map(() => this.translate(token, parameters)))
    );
  }

}
