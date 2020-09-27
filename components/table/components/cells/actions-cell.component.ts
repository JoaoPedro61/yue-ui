import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
  HostBinding,
  OnDestroy
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { YueUiTableActions, TableDataRowItem, YueUiTableAction } from '../../utils/interfaces';



@Component({
  selector: `yue-ui-table-actions-cell`,
  template: `
    <button #popoverRef="yueUiPopoverRef" yueUiButton yueUiPopover [yueUiPopoverContent]="actionsList" yueUiPopoverPlacement="bottomRight" [yueUiPopoverContentStyles]="{'padding.px': 0}">
      <i yueUiIcon yueUiIconType="yue-ui-gg-more-vertical-alt" [style.marginRight.px]="0"></i>
      <ng-template #actionsList>
        <div [style.minWidth.px]="120">
          <yue-ui-menu>
            <yue-ui-menu-item *ngFor="let item of options$ | async" (click)="triggerEvent(item); popoverRef.hide();">
              <div style="display: flex;flex-direction: row;justify-content: space-between;align-content: center;align-items: center;">
                <div style="display: flex;flex-direction: row;justify-content: flex-start;align-content: center;align-items: center;">
                  <div style="display: flex;flex-direction: row;justify-content: flex-start;align-content: center;align-items: center;">
                    <ng-container *ngIf="item.prefix">
                      <div style="margin-right: 6px;">
                        <yue-ui-smart-render [yueUiSmartRender]="item.prefix" [yueUiSmartRenderContext]="item"></yue-ui-smart-render>
                      </div>
                    </ng-container>
                    <ng-container *ngIf="item.icon">
                      <div style="margin-right: 6px;">
                        <i yueUiIcon [yueUiIconType]="item.icon"></i>
                      </div>
                    </ng-container>
                  </div>
                  <div>
                    <ng-container *ngIf="item.label">
                      <div>
                        <yue-ui-smart-render [yueUiSmartRender]="item.label" [yueUiSmartRenderContext]="item"></yue-ui-smart-render>
                      </div>
                    </ng-container>
                  </div>
                </div>
                <div style="margin-left: 25px;">
                  <ng-container *ngIf="item.sufix">
                    <div>
                      <yue-ui-smart-render [yueUiSmartRender]="item.sufix" [yueUiSmartRenderContext]="item"></yue-ui-smart-render>
                    </div>
                  </ng-container>
                </div>
              </div>
            </yue-ui-menu-item>
          </yue-ui-menu>
        </div>
      </ng-template>
    </button>
  `,
  styles: [
    `
    :host {
      display: flex;
      justify-content: center;
    }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: `yueUiTableActionsCellRef`,
  preserveWhitespaces: false,
  host: {
    '[class.yue-ui-table-actions-cell]': `true`,
  },
})
export class YueUiTableActionsCellComponent implements OnInit, OnChanges, OnDestroy {

  public options$: BehaviorSubject<YueUiTableActions> = new BehaviorSubject<YueUiTableActions>([]);

  @Input()
  public yueUiTableActionsCellActions: YueUiTableActions = [];

  @Input()
  public yueUiTableActionsCellRow!: TableDataRowItem[];

  @Output()
  public yueUiTableActionsCellTriggerAction: EventEmitter<{
    action: YueUiTableAction;
    data: Partial<any>;
  }> = new EventEmitter();

  public get hasOptions(): boolean {
    return (this.options$.getValue() || []).length > 0;
  }

  @HostBinding(`style.display`)
  public get shouldDisplaySelf(): string | null {
    return !this.hasOptions ? `none` : null;
  }

  constructor(public readonly cdr: ChangeDetectorRef) { }

  public updateOptionsList(): void {
    const options: YueUiTableActions = [];
    if (this.yueUiTableActionsCellRow) {
      const row = this.yueUiTableActionsCellRow[0];
      if (row) {
        let data: Partial<any> = row.full;
        for (let i = 0, l = this.yueUiTableActionsCellActions.length; i < l; i++) {
          if (this.yueUiTableActionsCellActions[i].condition) {
            if (typeof this.yueUiTableActionsCellActions[i].condition) {
              const condition: (data: Partial<any>) => boolean = this.yueUiTableActionsCellActions[i].condition as any;
              if (condition(data)) {
                options.push(this.yueUiTableActionsCellActions[i]);
              }
            } else {
              throw new Error("Sorry, but actions conditions will be only of type function.");
            }
          } else {
            options.push(this.yueUiTableActionsCellActions[i]);
          }
        }
      }
    }
    this.options$.next(options);
  }

  public triggerEvent(item: YueUiTableAction): void {
    if (this.yueUiTableActionsCellRow) {
      const row = this.yueUiTableActionsCellRow[0];
      if (row) {
        this.yueUiTableActionsCellTriggerAction.emit({
          action: item,
          data: row.full,
        });
      }
    }
  }

  public ngOnInit(): void { }

  public ngOnChanges(changes: SimpleChanges): void {
    const { yueUiTableActionsCellActions, yueUiTableActionsCellRow } = changes;
    if (yueUiTableActionsCellActions || yueUiTableActionsCellRow) {
      this.updateOptionsList();
    }
  }

  public ngOnDestroy(): void {
    this.options$.complete();
  }

}
