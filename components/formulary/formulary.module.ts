import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TextMaskModule } from 'angular2-text-mask';

import { YueUiButtonModule } from '@JoaoPedro61/yue-ui/button';
import { VERSION } from '@JoaoPedro61/yue-ui/version';
import { logging } from '@JoaoPedro61/yue-ui/core/utils';




import { CustomInputModule } from './custom-input/custom-input.module';

import { FormularyComponent } from './formulary.component';

import { FORMULARY_SERVICE_TOKEN, FORMULARY_SERVICE_SUBJECT, FORMULARY_COMPONENTS_TOKEN } from './formulary.tokens';

import { InputWritableComponent } from './abstracts-inputs/input-writable/input-writable.component';
import { InputEnumerableComponent } from './abstracts-inputs/input-enumerable/input-enumerable.component';
import { InputSelectableComponent } from './abstracts-inputs/input-selectable/input-selectable.component';
import { InputCheckableComponent } from './abstracts-inputs/input-checkable/input-checkable.component';
import { InputTouchableComponent } from './abstracts-inputs/input-touchable/input-touchable.component';

import { YueInputWrapperComponent } from './extends/input-wrapper/input-wrapper.component';
import { YueInputLabelComponent } from './extends/input-label/input-label.component';
import { YueInputDescriptorComponent } from './extends/input-descriptor/input-descriptor.component';
import { YueInputEncapsulationComponent } from './extends/input-encapsulation/input-encapsulation.component';



const logger = logging.getLogger('core.formulary');

@NgModule({
  declarations: [
    FormularyComponent,

    YueInputWrapperComponent,
    YueInputLabelComponent,
    YueInputDescriptorComponent,
    YueInputEncapsulationComponent,

    InputCheckableComponent,
    InputEnumerableComponent,
    InputSelectableComponent,
    InputTouchableComponent,
    InputWritableComponent
  ],
  entryComponents: [
    FormularyComponent,

    YueInputWrapperComponent,
    YueInputLabelComponent,
    YueInputDescriptorComponent,
    YueInputEncapsulationComponent,

    InputCheckableComponent,
    InputEnumerableComponent,
    InputSelectableComponent,
    InputTouchableComponent,
    InputWritableComponent
  ],
  imports: [
    CommonModule,
    TextMaskModule,
    FormsModule,
    ReactiveFormsModule,

    CustomInputModule,

    YueUiButtonModule
  ],
  providers: [
    {
      provide: FORMULARY_SERVICE_TOKEN,
      useValue: FORMULARY_SERVICE_SUBJECT
    },
    {
      provide: FORMULARY_COMPONENTS_TOKEN,
      useValue: {
        writable: InputWritableComponent,
        enumerable: InputEnumerableComponent,
        selectable: InputSelectableComponent,
        checkable: InputCheckableComponent,
        touchable: InputTouchableComponent,
      }
    }
  ],
  exports: [
    FormularyComponent
  ]
})
export class YueUiFormularyModule {

  constructor() {
    logger.info(`YueUiFormularyModule on version: ${VERSION.full}`);
  }

}
