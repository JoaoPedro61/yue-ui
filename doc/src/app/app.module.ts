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

import { Component as Home } from './home/component';



@NgModule({
  declarations: [
    AppComponent,
    Home
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
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
