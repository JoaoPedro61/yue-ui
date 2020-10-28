import { Component, ChangeDetectionStrategy, ElementRef, HostListener, ViewEncapsulation } from '@angular/core';

import { elementDimentions } from '@joaopedro61/yue-ui/core/utils';


import { YueUiPanelContentComponent } from './content.component';



@Component({
  encapsulation: ViewEncapsulation.None,
  selector: `yue-ui-panel`,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  host: {
    '[class.yue-ui-panel]': 'true',
  },
  exportAs: `yueUiPanelRef`,
})
export class YueUiPanelComponent {

  public panelHeader: ElementRef<any> | null = null;

  public panelContent: YueUiPanelContentComponent | null = null;

  constructor(public readonly el: ElementRef) { }

  public setHeaderEl(el: ElementRef<any> | null): void {
    this.panelHeader = el;
    setTimeout(() => {
      this.updateHeight();
    });
    this.dispathFakeEvent();
  }

  public setPanelContent(comp: YueUiPanelContentComponent | null): void {
    this.panelContent = comp;
    setTimeout(() => {
      this.updateHeight();
    });
    this.dispathFakeEvent();
  }

  public getHeightDifference(): number {
    let headerHeight = 0;
    if (this.panelHeader) {
      headerHeight = elementDimentions(this.panelHeader.nativeElement).FULL_HEIGHT;
    }
    const parentHeight = elementDimentions(this.el.nativeElement).FULL_HEIGHT;
    return parentHeight - headerHeight;
  }

  public updateHeight(): void {
    if (this.panelContent) {
      this.panelContent.setHeight(this.getHeightDifference());
      this.panelContent.cdr.detectChanges();
    }
  }

  public dispathFakeEvent(): void {
    window.dispatchEvent(new Event('resize'));
  }

  public ngAfterViewInit(): void {
    setTimeout(() => {
      this.updateHeight();
    });
    this.dispathFakeEvent();
  }

  @HostListener(`window:resize`)
  public onResize(): void {
    this.updateHeight();
  }

}

