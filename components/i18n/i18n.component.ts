import { Component, OnInit, ChangeDetectionStrategy, Input, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { take, filter } from 'rxjs/operators';

import { YueUiI18nService } from './i18n.service';



@Component({
  selector: 'yue-ui-i18n',
  template: `<span *ngIf="translation" [innerText]="translation"><span>`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class YueUiI18nComponent implements OnInit, OnDestroy, OnChanges {

  private dictionaryAsync$!: Subscription;

  @Input()
  public yueUiI18nParameters: Partial<any> = {};

  @Input()
  public yueUiI18nToken!: string;

  public translation!: string;

  constructor(private readonly i18n: YueUiI18nService) { }

  private translate(): void {
    this.i18n.translateAsync(this.yueUiI18nToken, this.yueUiI18nParameters)
      .pipe(take(1))
      .subscribe((token: string) => {
        this.translation = token;
      });
  }

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
