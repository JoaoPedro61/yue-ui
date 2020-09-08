import { Directive, TemplateRef, Optional } from '@angular/core';
import { YueUiModalRef } from '../utils/modal-ref';



@Directive({
  selector: '[yueUiModalFooter]',
  exportAs: `yueUiModalFooterRef`
})
export class YueUiModalFooterDirective {

  constructor(@Optional() private modalRef: YueUiModalRef<any>, public templateRef: TemplateRef<{}>) {
    if (this.modalRef) {
      this.modalRef.updateConfig({
        footer: this.templateRef
      });
    }
  }

}
