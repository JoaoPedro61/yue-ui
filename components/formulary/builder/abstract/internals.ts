import { Modifiers } from '../fix-ralacional';
import { NoopComponent } from './noop.component';
import { SwitchAbstractionComponent } from './switch.abstraction.component';



export const INTERNALS: Modifiers.ComponentsInjection = {
  writable: NoopComponent,
  checkable: SwitchAbstractionComponent,
};
