import { Directive } from '@angular/core';



@Directive({
  selector: `[yueUiModalFooter]`,
  exportAs: `f`,
  host: {
    '[class.yue-ui-modal-footer]': `true`,
  }
})
export class YueUiModalFooterDirective {

}