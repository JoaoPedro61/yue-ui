import { Component, OnInit, ChangeDetectionStrategy, Input, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { take, filter } from 'rxjs/operators';

import { YueUiI18nService } from './i18n.service';



/**
 * Use this to have a translation update when the tokens change or
 * when the language has changed, thus updating the tokens will
 * work even if the component you are using has OnPush change detection
 *
 * @usageNotes
 * ```html
 * <yue-ui-i18n token="YOUR_TOKEN"></yue-ui-i18n>
 * ```
 *
 * @export
 * @class YueUiI18nComponent
 * @implements {OnInit}
 * @implements {OnChanges}
 * @implements {OnDestroy}
 */
@Component({
  selector: 'yue-ui-i18n',
  template: `<span *ngIf="translation" [innerText]="translation"><span>`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class YueUiI18nComponent implements OnInit, OnDestroy, OnChanges {

  /**
   * Observable susbscription
   *
   * @ignore
   * @internal
   *
   * @private
   * @type {Subscription}
   * @memberof YueUiI18nComponent
   */
  private dictionaryAsync$!: Subscription;

  /**
   * Parameter's input
   *
   * @memberof YueUiI18nComponent
   */
  @Input()
  public yueUiI18nParameters: Partial<any> = {};

  /**
   * Token's input
   *
   * @memberof YueUiI18nComponent
   */
  @Input()
  public yueUiI18nToken!: string;

  /**
   * Receive a translation's token
   *
   * @memberof YueUiI18nComponent
   */
  public translation!: string;

  /**
   * Creates an instance of YueUiI18nComponent.
   *
   * @param {YueUiI18nService} i18n Service of i18n
   * @memberof YueUiI18nComponent
   */
  constructor(private readonly i18n: YueUiI18nService) { }

  /**
   * Gets a translation's token
   *
   * @ignore
   * @internal
   *
   * @private
   * @memberof YueUiI18nComponent
   */
  private translate(): void {
    this.i18n.translateAsync(this.yueUiI18nToken, this.yueUiI18nParameters)
      .pipe(take(1))
      .subscribe((token: string) => {
        this.translation = token;
      });
  }

  /**
   * @ignore
   * @internal
   *
   * @memberof YueUiI18nComponent
   */
  public ngOnInit(): void {
    this.dictionaryAsync$ = this.i18n
      .dictionaryAsync()
      .pipe(filter(v => v !== null))
      .subscribe(() => this.translate());
  }

  public ngOnChanges(changes: SimpleChanges): void {
    const { yueUiI18nParameters, yueUiI18nToken } = changes;

    if ( yueUiI18nParameters || yueUiI18nToken ) {
      this.translate();
    }
  }

  public ngOnDestroy(): void {
    if (this.dictionaryAsync$) {
      if (!this.dictionaryAsync$.closed) {
        this.dictionaryAsync$.unsubscribe();
      }
    }
  }

}
