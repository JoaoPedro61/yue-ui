import { Directive, TemplateRef, Optional } from '@angular/core';
import { YueUiModalRef } from '../utils/modal-ref';



@Directive({
  selector: '[yueUiModalFooter]',
  exportAs: `yueUiModalFooterRef`,
})
export class YueUiModalFooterDirective {

  constructor(public readonly templateRef: TemplateRef<{}>, @Optional() private modalRef: YueUiModalRef<any>, ) {
    if (this.modalRef) {
      this.modalRef.updateConfig({
        footer: this.templateRef
      });
      this.modalRef.updateConfig({});
      this.modalRef.containerInstance.doUpdateConfigs();

      Promise.resolve().then(() => {
        this.modalRef.updateConfig({});
        this.modalRef.containerInstance.doUpdateConfigs();

        this.modalRef.containerInstance.cdr.markForCheck();
        this.modalRef.containerInstance.cdr.detectChanges();
        
        const footer = this.modalRef.containerInstance.modalFooterRef;
        
        if (footer) {
          this.modalRef.containerInstance.modalFooterRef.cdr.markForCheck();
          this.modalRef.containerInstance.modalFooterRef.cdr.detectChanges();
        }
      });
    }
  }

}
