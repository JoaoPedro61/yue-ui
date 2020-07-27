import { Modifiers } from '../fix-ralacional';
import { SwitchAbstractionComponent } from './switch.abstraction.component';
import { TextAbstractionComponent } from './text.abstraction.component';
import { NumberAbstractionComponent } from './number.abstraction.component';
import { SelectAbstractionComponent } from './select.abstraction.component';
import { TouchableAbstractionComponent } from './touchable.abstraction.component';



export const INTERNALS: Modifiers.ComponentsInjection = {
  writable: TextAbstractionComponent,
  checkable: SwitchAbstractionComponent,
  enumerable: NumberAbstractionComponent,
  selectable: SelectAbstractionComponent,
  touchable: TouchableAbstractionComponent,
};
