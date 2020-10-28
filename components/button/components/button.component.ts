import { Component, ChangeDetectionStrategy, Input, AfterViewInit, OnDestroy, OnChanges, OnInit, SimpleChanges, ViewEncapsulation } from "@angular/core";
import { Subject } from 'rxjs';
import { YueUiButtonSize, YueUiButtonType } from '../utils/interfaces';




@Component({
  encapsulation: ViewEncapsulation.None,
  selector: `yue-ui-button, button[yueUiButton], a[yueUiButton]`,
  template: `
    <i class="yue-ui-button-icon-loading" yueUiIcon [yueUiIconSpin]="true" yueUiIconType="yue-ui-gg-spinner" *ngIf="yueUiButtonLoading"></i>
    <ng-content></ng-content>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  host: {
    '[class.yue-ui-button]': 'true',

    '[class.yue-ui-button-ghost]': 'yueUiButtonGhost',
    '[class.yue-ui-button-block]': 'yueUiButtonBlock',
    '[class.yue-ui-button-dashed]': 'yueUiButtonDashed',
    '[class.yue-ui-button-rounded]': 'yueUiButtonRounded',
    '[class.yue-ui-button-disabled]': 'yueUiButtonDisable',

    '[class.yue-ui-button-size-default]': 'yueUiButtonSize === "default"',
    '[class.yue-ui-button-size-small]': 'yueUiButtonSize === "small"',
    '[class.yue-ui-button-size-large]': 'yueUiButtonSize === "large"',

    '[class.yue-ui-button-type-default]': 'yueUiButtonType === "default" || !yueUiButtonType',
    '[class.yue-ui-button-type-primary]': 'yueUiButtonType === "primary"',
    '[class.yue-ui-button-type-secondary]': 'yueUiButtonType === "secondary"',
    '[class.yue-ui-button-type-success]': 'yueUiButtonType === "success"',
    '[class.yue-ui-button-type-danger]': 'yueUiButtonType === "danger"',
    '[class.yue-ui-button-type-warning]': 'yueUiButtonType === "warning"',
    '[class.yue-ui-button-type-info]': 'yueUiButtonType === "info"',
    '[class.yue-ui-button-type-light]': 'yueUiButtonType === "light"',
    '[class.yue-ui-button-type-dark]': 'yueUiButtonType === "dark"',

    '[class.yue-ui-button-loading]': 'yueUiButtonLoading',

    '[attr.tabindex]': 'yueUiButtonDisable ? -1 : (tabIndex === null ? null : tabIndex)',
    '[attr.disabled]': 'yueUiButtonDisable || null',

    '(click)': 'healtDisableEvents($event)',
  }
})
export class YueUiButtonComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {

  private readonly destroy$: Subject<void> = new Subject();

  private readonly loading$: Subject<boolean> = new Subject();

  @Input()
  public yueUiButtonGhost = false;

  @Input()
  public yueUiButtonBlock = false;

  @Input()
  public yueUiButtonDashed = false;

  @Input()
  public yueUiButtonSize: YueUiButtonSize = 'default';

  @Input()
  public yueUiButtonDisable = false;

  @Input()
  public yueUiButtonRounded = false;

  @Input()
  public yueUiButtonLoading = false;

  @Input()
  public yueUiButtonType: YueUiButtonType = 'default';

  @Input()
  public yueUiButtonTabIndex: string | number | null = null;

  @Input()
  public tabIndex: string | number | null = null;

  constructor() {}

  public healtDisableEvents(event: Event): void {
    if (this.yueUiButtonDisable) {
      event.preventDefault();
      event.stopImmediatePropagation();
      event.stopPropagation();
    }
  }

  public ngOnInit(): void { }

  public ngAfterViewInit(): void { }

  public ngOnChanges(changes: SimpleChanges): void {
    const { yueUiButtonLoading } = changes;
    if (yueUiButtonLoading) {
      this.loading$.next(yueUiButtonLoading.currentValue);
    }
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();

    this.loading$.complete();
  }

}
