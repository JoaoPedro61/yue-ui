import { NgModule } from '@angular/core';



import { YueUiLayoutModule } from './layout';
import { YueUiI18nModule } from './i18n';
import { YueUiButtonModule } from './button';
import { YueUiThematizationModule } from './thematization';
import { YueUiHttpModule } from './http';
import { YueUiCollapseModule } from './collapse';
import { YueUiTooltipModule } from './tooltip';

export * from './version';


@NgModule({
  declarations: [ ],
  imports: [ ],
  exports: [
    YueUiLayoutModule,
    YueUiI18nModule,
    YueUiButtonModule,
    YueUiThematizationModule,
    YueUiHttpModule,
    YueUiCollapseModule,
    YueUiTooltipModule,
  ]
})
export class YueUiModule { }
