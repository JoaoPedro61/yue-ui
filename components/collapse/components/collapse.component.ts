import { Component, ChangeDetectionStrategy, OnDestroy, Input } from '@angular/core';
import { Subject } from 'rxjs';

import { YueUiCollapsePanelComponent } from './collapse-panel.component';



@Component({
  selector: 'yue-ui-collapse',
  template: `<ng-content select="yue-ui-collapse-panel"></ng-content>`,
  host: {
    '[class.yue-ui-collapse]': 'true',
    '[class.yue-ui-collapse-has-panels]': 'panelsList && panelsList.length > 0',
  },
  styles: [
    `
      :host {
        display: block;
        position: relative;
      }
    `
  ],
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class YueUiCollapseComponent implements OnDestroy {

  private destroy$: Subject<void> = new Subject();

  @Input('yueUiCollapseAccordion')
  public accordion = false;

  public panelsList: YueUiCollapsePanelComponent[] = [];

  public addPanel(panel: YueUiCollapsePanelComponent): void {
    this.panelsList.push(panel);
  }

  public removePanel(panel: YueUiCollapsePanelComponent): void {
    this.panelsList.splice(this.panelsList.indexOf(panel), 1);
  }
  
  public handleAccordion(collapse: YueUiCollapsePanelComponent): void {
    if (this.accordion && !collapse.open) {
      this.panelsList
        .filter(item => item !== collapse)
        .forEach(item => {
          if (item.open) {
            item.open = false;
            item.markForCheck();
          }
        });
    }
    collapse.open = !collapse.open;
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
