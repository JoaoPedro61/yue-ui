import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { YueInputSwitchComponent } from './inputs/input-switch/input-switch.component';
import { YueInputDatepickerComponent } from './inputs/input-datepicker/input-datepicker.component';
import { YueInputSelectComponent } from './inputs/input-select/input-select.component';
import { YueInputSelectOptionComponent } from './inputs/input-select/input-select-option/input-select-option.component';


@NgModule({
  declarations: [
    YueInputSwitchComponent,
    YueInputDatepickerComponent,
    YueInputSelectComponent,
    YueInputSelectOptionComponent
  ],
  entryComponents: [
    YueInputSwitchComponent,
    YueInputDatepickerComponent,
    YueInputSelectComponent,
    YueInputSelectOptionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    YueInputSwitchComponent,
    YueInputDatepickerComponent,
    YueInputSelectComponent,
    YueInputSelectOptionComponent
  ],
})
export class CustomInputModule { }
