import { Directive } from '@angular/core';
import { CdkConnectedOverlay } from '@angular/cdk/overlay';



@Directive({
  selector: `[cdkConnectedOverlay][yueUiConnectedOverlay]`,
  exportAs: 'cdkConnectedOverlayRef'
})
export class YueUiOverlayDirective {

  constructor(private readonly cdkConnectedOverlay: CdkConnectedOverlay) {
    this.cdkConnectedOverlay.backdropClass = 'yue-ui-overlay-transparent-backdrop';
  }

}
