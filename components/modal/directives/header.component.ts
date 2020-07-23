import { Directive } from '@angular/core';



@Directive({
  selector: `[yueUiModalHeader]`,
  exportAs: `f`,
  host: {
    '[class.yue-ui-modal-header]': `true`,
  }
})
export class YueUiModalHeaderDirective { }