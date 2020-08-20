import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LayoutModule } from '@angular/cdk/layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { YueUiLayoutModule } from '@JoaoPedro61/yue-ui/layout';
import { YueUiThematizationModule } from '@JoaoPedro61/yue-ui/thematization';
import { YueUiButtonModule } from '@JoaoPedro61/yue-ui/button';
import { YueUiTooltipModule } from '@JoaoPedro61/yue-ui/tooltip';
import { YueUiPopoverModule } from '@JoaoPedro61/yue-ui/popover';
import { YueUiMenuModule } from '@JoaoPedro61/yue-ui/menu';
import { YueUiBuilderFormularyModule } from '@JoaoPedro61/yue-ui/formulary/builder';
import { YueUiModalModule } from '@JoaoPedro61/yue-ui/modal';
import { YueUiImageModule } from '@JoaoPedro61/yue-ui/image';
import { YueUiBreadcrumbModule } from '@JoaoPedro61/yue-ui/breadcrumb';
import { YueUiPanelModule } from '@JoaoPedro61/yue-ui/panel';
import { YueUiTableModule } from '@JoaoPedro61/yue-ui/table';


import { Component1 as Home } from './component-1';
import { Component2 as Child1 } from './component-2';
import { Component3 as Modal1 } from './component-3';



@NgModule({
  declarations: [
    AppComponent,
    Home,
    Child1,
    Modal1,
  ],
  entryComponents: [
    Modal1
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    BrowserAnimationsModule,

    LayoutModule,

    YueUiLayoutModule,
    YueUiThematizationModule,
    YueUiButtonModule,
    YueUiTooltipModule,
    YueUiPopoverModule,
    YueUiMenuModule,
    YueUiBuilderFormularyModule,
    YueUiModalModule,
    YueUiImageModule,
    YueUiBreadcrumbModule,
    YueUiPanelModule,
    YueUiTableModule,
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
