import { ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { deserializeStringJsonPath } from './../../commons/deserialize-string-json-path';

import getMask, { TextMask } from '../masks/masks';

import { FieldStruct } from '../modifiers';



export abstract class InputField<F extends FieldStruct = FieldStruct> {

  private updateFrom: 'MODEL' | 'NATIVE' = 'NATIVE';

  private timer: any = null;

  public isReady = false;

  private subscription$!: Subscription | null;

  private subscription1$!: Subscription | null;

  private subscription2$!: Subscription | null;

  private grossModel!: any;

  private currentMask!: TextMask | void;

  public readonly control!: FormControl;

  public readonly detector?: ChangeDetectorRef;

  public readonly formulary?: any;

  public field!: F;

  private model$!: Observable<any>;

  private options$!: Observable<any>;

  public get modelAsObservable(): Observable<any> {
    return this.model$;
  }

  public get unparsedModel(): any {
    return this.grossModel;
  }

  public get model(): any {
    return this.formulary.snapshotModel;
  }

  public get options(): any {
    return this.formulary.snapshotOptions;
  }

  public get mask(): TextMask | false {
    if (this.field) {
      if (this.field.mask) {
        if (!('function' === typeof this.field.mask)) {
          const trivialMask = getMask(this.field.mask);
          this.currentMask = trivialMask;
          if (trivialMask) {
            return trivialMask;
          }
        } else {
          const mask = this.field.mask();
          if (mask) {
            const trivialMask = getMask(mask);
            this.currentMask = trivialMask;
            if (trivialMask) {
              return trivialMask;
            }
          }
        }
      }
    }
    return false;
  }

  public aliveModel$!: any;

  public get aliveModel(): any {
    return this.aliveModel$;
  }

  public get isWritable(): boolean {
    if (this.field && this.field.hasOwnProperty('listeners') && !this.field.listeners) {
      return false;
    } else {
      if (this.formulary.snapshotOptions.hasOwnProperty('listeners') && !this.formulary.snapshotOptions.listeners) {
        return false;
      } else {
        return true;
      }
    }
  }

  constructor() { }

  private updates(): void {
    if (this.model$ && !this.subscription$) {
      this.subscription$ = this.model$
        .subscribe((model) => {
          if (!this.timer) {
            this.timer = setTimeout(() => {
              this.aliveModel$ = model;
              if (this.detector) {
                this.detector.markForCheck();
              }
              this.timer = null;
            }, 100);
          }
        });
    }
    if (this.control) {
      if (!this.subscription1$) {
        this.subscription1$ = this.control.valueChanges
          .subscribe((value) => {
            if (this.updateFrom === `NATIVE`) {
              try {
                const formated = deserializeStringJsonPath(this.field.identifier, this.model, value, false);
                if (formated) {
                  this.formulary.setModel(formated.source);
                }
              } catch (e) {
                throw new Error(e);
              }
              if (this.detector) {
                this.detector.markForCheck();
              }
            }
          });
      }
      if (this.field.hasOwnProperty('listeners') && !this.field.listeners) {
        if (!this.control.disabled) {
          this.control.disable();
        }
      }
      if (this.field.hasOwnProperty('default')) {
        if (this.control.value === null || this.control.value === undefined) {
          this.control.setValue(this.field.default);
        }
      }
    }
    if (this.options$ && !this.subscription2$) {
      this.options$
        .subscribe((options) => {
          if (this.field && this.field.hasOwnProperty('listeners') && !this.field.listeners) {
            if (!this.control.disabled) {
              this.control.disable();
            }
          } else {
            if (options.hasOwnProperty('listeners') && !options.listeners) {
              if (!this.control.disabled) {
                this.control.disable();
              }
              this.control.disable();
            } else {
              if (this.control.disabled) {
                this.control.enable();
              }
            }
          }
        });
    }
    if (this.detector) {
      this.detector.detectChanges();
    }
  }

  private init(): void {
    this.updates();
  }

  public clear(): void {
    this.control.setValue(null);
  }

  public execListnner(listener: string, onlyEnabled: boolean, parameters: any[]): void {
    if (listener) {
      if (this.field.listeners) {
        if ((this.field.listeners as any)[listener as any]) {
          const fn = (this.field.listeners as any)[listener as any];
          if ('function' === typeof fn) {
            if (onlyEnabled) {
              if (this.control.disabled) {
                return void 0;
              }
            }
            fn.apply(this, parameters);
          } else if (!Array.isArray(fn) && 'object' === typeof fn) {
            if ('function' === typeof fn.tap) {
              fn.apply(fn.scope ? fn.scope : this, parameters);
            }
          }
        }
      }
    }
  }

  public destroy(): void {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
      this.subscription$ = null;
    }
    if (this.subscription1$) {
      this.subscription1$.unsubscribe();
      this.subscription1$ = null;
    }
    if (this.subscription2$) {
      this.subscription2$.unsubscribe();
      this.subscription2$ = null;
    }
  }

}
