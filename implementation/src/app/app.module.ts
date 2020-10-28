import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LayoutModule } from '@angular/cdk/layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { YueUiLayoutModule } from '@joaopedro61/yue-ui/layout';
import { YueUiThematizationModule } from '@joaopedro61/yue-ui/thematization';
import { YueUiButtonModule } from '@joaopedro61/yue-ui/button';
import { YueUiTooltipModule } from '@joaopedro61/yue-ui/tooltip';
import { YueUiPopoverModule } from '@joaopedro61/yue-ui/popover';
import { YueUiMenuModule } from '@joaopedro61/yue-ui/menu';
import { YueUiFormularyBuilderModule } from '@joaopedro61/yue-ui/formulary/builder';
import { YueUiFormularyTextModule } from '@joaopedro61/yue-ui/formulary/text';
import { YueUiFormularyPasswordModule } from '@joaopedro61/yue-ui/formulary/password';
import { YueUiFormularyTextareaModule } from '@joaopedro61/yue-ui/formulary/textarea';
import { YueUiFormularySwitchModule } from '@joaopedro61/yue-ui/formulary/switch';
import { YueUiFormularySelectModule } from '@joaopedro61/yue-ui/formulary/select';
import { YueUiModalModule } from '@joaopedro61/yue-ui/modal';
import { YueUiImageModule } from '@joaopedro61/yue-ui/image';
import { YueUiBreadcrumbModule } from '@joaopedro61/yue-ui/breadcrumb';
import { YueUiPanelModule } from '@joaopedro61/yue-ui/panel';
import { YueUiTableModule } from '@joaopedro61/yue-ui/table';
import { YueUiIconModule } from '@joaopedro61/yue-ui/icon';
import { YueUiGridModule } from '@joaopedro61/yue-ui/grid';
import { YueUiNotificationModule } from '@joaopedro61/yue-ui/notification';


import { Component1 as Home } from './component-1';
import { Component2 as Child1 } from './component-2';
import { Component3 as Modal1 } from './component-3';
import { YueUiHttpModule } from '@joaopedro61/yue-ui/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



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

    FormsModule,
    ReactiveFormsModule,

    BrowserAnimationsModule,

    LayoutModule,

    YueUiLayoutModule,
    YueUiThematizationModule,
    YueUiButtonModule,
    YueUiTooltipModule,
    YueUiPopoverModule,
    YueUiMenuModule,
    YueUiFormularyBuilderModule,
    YueUiFormularyTextModule,
    YueUiFormularyPasswordModule,
    YueUiFormularyTextareaModule,
    YueUiFormularySwitchModule,
    YueUiFormularySelectModule,
    YueUiModalModule,
    YueUiImageModule,
    YueUiBreadcrumbModule,
    YueUiPanelModule,
    YueUiTableModule,
    YueUiHttpModule,
    YueUiIconModule,
    YueUiGridModule,
    YueUiNotificationModule,
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
