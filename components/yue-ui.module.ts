import { NgModule } from '@angular/core';



import { YueUiLayoutModule } from './layout';
import { YueUiI18nModule } from './i18n';
import { YueUiButtonModule } from './button';
import { YueUiThematizationModule } from './thematization';
import { YueUiHttpModule } from './http';

export * from './version';


@NgModule({
  declarations: [ ],
  imports: [ ],
  exports: [
    YueUiLayoutModule,
    YueUiI18nModule,
    YueUiButtonModule,
    YueUiThematizationModule,
    YueUiHttpModule
  ]
})
export class YueUiModule { }
