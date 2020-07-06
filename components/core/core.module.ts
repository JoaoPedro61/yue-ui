import { NgModule, Inject } from '@angular/core';

import { YUE_UI_CORE_ENABLE_LOG } from './core.utils';
import { logging } from './utils';



@NgModule({
  providers: [
    {
      provide: YUE_UI_CORE_ENABLE_LOG,
      useValue: false,
    }
  ]
})
export class YueUiCoreModule {

  constructor(@Inject(YUE_UI_CORE_ENABLE_LOG) private readonly enableLog: boolean) {
    logging
      .configure({
        enable: this.enableLog,
        minLevels: {
          '': 'info',
        }
      })
      .registerConsoleLogger();
  }

}
