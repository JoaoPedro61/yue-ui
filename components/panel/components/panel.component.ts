import { Component, ChangeDetectionStrategy, ContentChild, ElementRef, HostListener } from '@angular/core';

import { elementDimentions } from '@joaopedro61/yue-ui/core/utils';


import { YueUiPanelContentComponent } from './content.component';
import { YueUiPanelHeaderComponent } from './header.component';



@Component({
  selector: `yue-ui-panel`,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  host: {
    '[class.yue-ui-panel]': 'true',
  },
  styleUrls: [
    `./../styles/panel.component.less`,
  ],
  exportAs: `yueUiPanelRef`,
})
export class YueUiPanelComponent {

  @ContentChild(YueUiPanelHeaderComponent, { static: false, read: ElementRef })
  public panelHeader!: ElementRef<any>;

  @ContentChild(YueUiPanelContentComponent, { static: false })
  public panelContent!: YueUiPanelContentComponent;

  constructor(public readonly el: ElementRef) { }

  public getHeightDifference(): number {
    let headerHeight = 0;
    if (this.panelHeader) {
      headerHeight = elementDimentions(this.panelHeader.nativeElement).FULL_HEIGHT;
    }
    const parentHeight = elementDimentions(this.el.nativeElement).FULL_HEIGHT;
    return parentHeight - headerHeight;
  }

  public updateHeight(): void {
    this.panelContent.setHeight(this.getHeightDifference());
    this.panelContent.cdr.detectChanges();
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

