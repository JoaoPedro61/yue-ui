import { NgModule } from '@angular/core';

import { YueUiButtonDirective } from './directives/button.directive';
import { YueUiButtonGroupComponent } from './components/button-group.component';


@NgModule({
  declarations: [
    YueUiButtonDirective,
    YueUiButtonGroupComponent,
  ],
  entryComponents: [
    YueUiButtonGroupComponent,
  ]
})
export class YueUiButtonModule {

}
