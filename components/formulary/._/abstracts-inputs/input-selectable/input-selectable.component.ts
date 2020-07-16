import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { InputField } from './../../extends/input-field';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';



interface Refresh {
  valuenoaccents: string;
  value: string;
}

@Component({
  template: `
    <ng-container *ngIf="isReady">
      <yue-select
        [abstractControl]="control"
        [propLabel]="propLabel"
        [propValue]="propValue"
        [placeholder]="placeholder"
        [mode]="inputMode"
        [disabled]="disabled"
        [options]="inputOptions"
        (searching)="searching($event);">
      </yue-select>
    </ng-container>
  `,
  styleUrls: ['./input-selectable.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputSelectableComponent extends InputField implements OnInit, OnDestroy {

  private readonly optionsBehavior$: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  private subscriptionOptionslist$?: Subscription | null;

  private get optionslist$(): Observable<any> {
    return this.optionsBehavior$.asObservable();
  }

  public get inputOptions(): Observable<any> {
    return this.optionslist$;
  }

  public get inputMode(): string {
    if (this.field.mode) {
      if (this.field.mode === 'single' || this.field.mode === 'multiple') {
        return this.field.mode;
      }
    }
    return 'single';
  }

  public get placeholder(): string {
    if (this.field.placeholder) {
      if ('function' === typeof this.field.placeholder) {
        return this.field.placeholder();
      } else {
        return this.field.placeholder;
      }
    }
    return '';
  }

  public get propLabel(): string | false {
    if (this.field.properties) {
      if (this.field.properties.hasOwnProperty('label')) {
        if (this.field.properties.label === undefined) {
          return false;
        }
        return this.field.properties.label;
      }
    }
    return 'label';
  }

  public get propValue(): string | false {
    if (this.field.properties) {
      if (this.field.properties.hasOwnProperty('value')) {
        if (this.field.properties.value === undefined) {
          return false;
        }
        return this.field.properties.value;
      }
    }
    return 'value';
  }

  public get disabled(): boolean {
    if (this.control) {
      return this.control.disabled;
    }
    return false;
  }

  constructor(public readonly detector: ChangeDetectorRef) {
    super();
  }

  private setOptions(options: any, searching?: Refresh): void {
    if (options === void 0) {
      this.optionsBehavior$.next([]);
      return void 0;
    }
    if (options) {
      if (options instanceof Observable) {
        if (!this.subscriptionOptionslist$) {
          this.subscriptionOptionslist$ = options.subscribe((evaluted: any) => {
            if (!Array.isArray(evaluted) && typeof evaluted === 'object') {
              if (evaluted.hasOwnProperty('data') || evaluted.hasOwnProperty('list') || evaluted.hasOwnProperty('items') || evaluted.hasOwnProperty('itens')) {
                if (evaluted.hasOwnProperty('data')) {
                  this.setOptions(evaluted.data);
                } else if (evaluted.hasOwnProperty('list')) {
                  this.setOptions(evaluted.list);
                } else if (evaluted.hasOwnProperty('items')) {
                  this.setOptions(evaluted.items);
                } else if (evaluted.hasOwnProperty('itens')) {
                  this.setOptions(evaluted.itens);
                }
              } else {
                this.setOptions([]);
              }
            } else {
              this.setOptions(evaluted);
            }
          });
        }
      } else if ('function' === typeof options) {
        const r = options(searching, this.control, this.model, this.field, this.formulary);
        if (r instanceof Observable) {
          const s = r.subscribe((evaluted) => {
            if (!Array.isArray(evaluted) && typeof evaluted === 'object') {
              if (evaluted.hasOwnProperty('data') || evaluted.hasOwnProperty('list') || evaluted.hasOwnProperty('items') || evaluted.hasOwnProperty('itens')) {
                if (evaluted.hasOwnProperty('data')) {
                  this.setOptions(evaluted.data);
                } else if (evaluted.hasOwnProperty('list')) {
                  this.setOptions(evaluted.list);
                } else if (evaluted.hasOwnProperty('items')) {
                  this.setOptions(evaluted.items);
                } else if (evaluted.hasOwnProperty('itens')) {
                  this.setOptions(evaluted.itens);
                }
              } else {
                this.setOptions([]);
              }
            } else {
              this.setOptions(evaluted);
            }
            s.unsubscribe();
          });
        } else if (!Array.isArray(r) && typeof r === 'object') {
          if (r.hasOwnProperty('data') || r.hasOwnProperty('list') || r.hasOwnProperty('items') || r.hasOwnProperty('itens')) {
            if (r.hasOwnProperty('data')) {
              this.setOptions(r.data);
            } else if (r.hasOwnProperty('list')) {
              this.setOptions(r.list);
            } else if (r.hasOwnProperty('items')) {
              this.setOptions(r.items);
            } else if (r.hasOwnProperty('itens')) {
              this.setOptions(r.itens);
            }
          } else {
            this.setOptions([]);
          }
        } else {
          this.setOptions(r);
        }
      } else {
        this.optionsBehavior$.next(options);
      }
    } else {
      this.optionsBehavior$.next([]);
    }
  }

  public searching(searching: Refresh): void {
    this.setOptions(this.field.options, searching);
  }

  public ngOnInit(): void {
    this.setOptions(this.field.options);
    this.isReady = true;
    this.detector.detectChanges();
  }

  public ngOnDestroy(): void {
    if (this.subscriptionOptionslist$) {
      this.subscriptionOptionslist$.unsubscribe();
      this.subscriptionOptionslist$ = null;
    }
  }

}
