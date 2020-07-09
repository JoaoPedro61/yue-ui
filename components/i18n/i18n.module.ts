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

  constructor(@Inject(YUE_UI_I18N_DEFAULT_LANGUAGE) private readonly defaultLanguage: YueUiI18nDefaultLanguage, private readonly i18n: YueUiI18nService) {
    logger.info(`YueUiI18nModule on version: ${VERSION.full}`);
    if (this.defaultLanguage) {
      if (!this.i18n.getLanguage()) {
        this.i18n.setLanguage(this.defaultLanguage);
      }
    }
  }

}
