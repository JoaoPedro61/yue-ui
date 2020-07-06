import { NgModule, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

import { logging } from 'yue-ui/core/utils';

import { VERSION } from 'yue-ui/version';


import {
  YUE_UI_I18N_DICTIONARY,
  YUE_UI_I18N_LANGUAGE,
  YUE_UI_I18N_COMPONENTS_DICTIONARY,
  YUE_UI_I18N_DEFAULT_LANGUAGE,
  YUE_UI_I18N_NOT_FOUND_HANDLER
} from './i18n.utils';

import { YueUiI18nService } from './i18n.service';
import { YueUiI18nComponent } from './i18n.component';
import { YueUiI18nDirective } from './i18n.directive';
import { YueUiI18nPipe } from './i18n.pipe';

import { YueUiI18nDefaultLanguage, YueUiI18nNotFoundHandler } from './i18n.intefaces';



const logger = logging.getLogger('core.i18n');


/**
 * Internationalization Module, used for handling translations between languages
 *
 * @usageNotes
 * In your assets folder create a directory called "i18n",
 * inside this directory put your translation files, after that just
 * import the YueUiI18nService service, and set the language,
 * if you want to set a language without having to import this service,
 * in your module import the injection token called "YUE_UI_I18N_DEFAULT_LANGUAGE",
 * as in the following example:
 * ```typescript
 *
 * {
 *   imports: [
 *     YueUiI18nModule,
 *     {
 *       provide: YUE_UI_I18N_DEFAULT_LANGUAGE,
 *       useValue: `en-us`
 *     }
 *   ]
 * }
 * ```
 *
 * The name of the file that is inside the i18n
 * folder is very important because to define the language in the
 * system, we use the following logic, we take the name of the .json
 * file inside the folder, and remove the ".json" from the name,
 * it would look like this by the logic:
 *
 * ```
 * this.i18nService.setLanguage(`en-us`);
 * ```
 * And within the i18n folder we have:
 * en-us.json
 *
 * The same logic is used in the standard language injection token
 *
 * @export
 * @class YueUiI18nModule
 */
@NgModule({
  declarations: [
    YueUiI18nPipe,
    YueUiI18nComponent,
    YueUiI18nDirective
  ],
  imports: [
    CommonModule
  ],
  providers: [
    YueUiI18nService,
    {
      provide: YUE_UI_I18N_DICTIONARY,
      useValue: new BehaviorSubject(null)
    },
    {
      provide: YUE_UI_I18N_LANGUAGE,
      useValue: new BehaviorSubject(null)
    },
    {
      provide: YUE_UI_I18N_COMPONENTS_DICTIONARY,
      useValue: new BehaviorSubject({ })
    },
    {
      provide: YUE_UI_I18N_NOT_FOUND_HANDLER,
      useClass: class implements YueUiI18nNotFoundHandler {
        public handle(token: string, paramenters: {[x: string]: any}, service: YueUiI18nService): any {
          if (paramenters.hasOwnProperty('default')) {
            return service.parserInterpolate(paramenters.default, paramenters);
          }
          return token;
        }
      }
    },
    {
      provide: YUE_UI_I18N_DEFAULT_LANGUAGE,
      useValue: null
    }
  ],
  exports: [
    YueUiI18nPipe,
    YueUiI18nComponent,
    YueUiI18nDirective
  ],
  entryComponents: [
    YueUiI18nComponent
  ]
})
export class YueUiI18nModule {

  /**
   * Creates an instance of YueUiI18nModule.
   *
   * @param {YueUiI18nDefaultLanguage} defaultLanguage Default language to set the file translation when this module is instantiated
   * @param {YueUiI18nService} i18n Internationalization Service to update dictionaries and the standard language
   * @memberof YueUiI18nModule
   */
  constructor(@Inject(YUE_UI_I18N_DEFAULT_LANGUAGE) private readonly defaultLanguage: YueUiI18nDefaultLanguage, private readonly i18n: YueUiI18nService) {
    logger.info(`YueUiI18nModule on version: ${VERSION.full}`);
    if (this.defaultLanguage) {
      if (!this.i18n.getLanguage()) {
        this.i18n.setLanguage(this.defaultLanguage);
      }
    }
  }

}
