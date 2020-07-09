import { BehaviorSubject } from 'rxjs';
import { YueUiI18nService } from './i18n.fix';


export type YueUiI18nDictionary = BehaviorSubject<{[x: string]: string | object}>;

export type YueUiI18nComponentsDictionary = BehaviorSubject<{
  [componentName: string]: { [x: string]: any }
}>;

export type YueUiI18nLanguage = BehaviorSubject<string | null>;

export type YueUiI18nDefaultLanguage = string | null;

export abstract class YueUiI18nNotFoundHandler {

  public abstract handle(token: string, parameters: Partial<any>, service: YueUiI18nService): any;

}
