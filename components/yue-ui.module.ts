import { NgModule } from '@angular/core';



import { YueUiLayoutModule } from './layout';
import { YueUiI18nModule } from './i18n';
import { YueUiButtonModule } from './button';
import { YueUiThematizationModule } from './thematization';

export * from './version';


@NgModule({
  declarations: [ ],
  imports: [ ],
  exports: [
    YueUiLayoutModule,
    YueUiI18nModule,
    YueUiButtonModule,
    YueUiThematizationModule
  ]
})
export class YueUiModule { }
