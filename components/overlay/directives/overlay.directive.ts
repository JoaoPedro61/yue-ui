import { Directive } from '@angular/core';
import { CdkConnectedOverlay, OverlayRef } from '@angular/cdk/overlay';



@Directive({
  selector: `[cdkConnectedOverlay][yueUiConnectedOverlay]`,
  exportAs: 'cdkConnectedOverlayRef'
})
export class YueUiOverlayDirective {

  public get overlayRef(): OverlayRef {
    return this.cdkConnectedOverlay.overlayRef;
  }

  constructor(public readonly cdkConnectedOverlay: CdkConnectedOverlay) {
    this.cdkConnectedOverlay.backdropClass = 'yue-ui-overlay-transparent-backdrop';
  }

}
