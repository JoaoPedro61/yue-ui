import { AbstractControl, FormGroup } from '@angular/forms';
import { AfterContentInit, AfterViewInit, OnDestroy, OnInit } from '@angular/core';

import { YueUiFormularyMask } from '@joaopedro61/yue-ui/formulary/mask';
import { getMask } from '@joaopedro61/yue-ui/formulary/utils';

import { Modifiers, FormularySource, } from './../fix-ralacional';
import { Listener } from '../modifiers';



export abstract class FieldAbstraction implements OnInit, AfterViewInit, AfterContentInit, OnDestroy {

  private _formGroup!: FormGroup;

  private _abstractControl!: AbstractControl;

  private _formularyOptions!: Modifiers.FormularyOptions;

  private _model!: {[x: string]: any};

  public readonly identifier!: string;

  public readonly formulary!: FormularySource;

  public readonly field!: Modifiers.FieldStruct;

  public readonly parent: any;

  public get enabled(): boolean {
    if (this.abstractControl) {
      return this.abstractControl.enabled;
    }
    return true;
  }

  public get formGroup(): FormGroup {
    if (this._formGroup) {
      return this._formGroup;
    } else {
      const cached = this.formulary.getGroup();
      if (cached) {
        this._formGroup = cached;
        return cached;
      } else {
        throw new Error(`Cached form group isn't found!`);
      }
    }
  }

  public get abstractControl(): AbstractControl {
    if (this._abstractControl) {
      return this._abstractControl;
    } else {
      const cached = this.formulary.getControl(this.identifier);
      if (cached) {
        this._abstractControl = cached;
        return cached;
      } else {
        throw new Error(`Cached control isn't found!`);
      }
    }
  }

  public get formularyOptions(): Modifiers.FormularyOptions {
    if (this._formularyOptions) {
      return this._formularyOptions;
    } else {
      const cached = this.formulary.getOptions();
      if (cached) {
        this._formularyOptions = cached;
        return cached;
      } else {
        return {};
      }
    }
  }

  public get placeholder(): Modifiers.FieldStruct['placeholder'] {
    if (this.field) {
      if (typeof this.field.placeholder === 'function') {
        return this.field.placeholder();
      }
      return this.field.placeholder;
    }
    return null;
  }

  public get fieldAppend(): Modifiers.FieldStruct['fieldAppend'] | null {
    if (this.field) {
      return this.field.fieldAppend;
    }
    return null;
  }

  public get fieldPrepend(): Modifiers.FieldStruct['fieldPrepend'] | null {
    if (this.field) {
      return this.field.fieldPrepend;
    }
    return null;
  }

  public get mask(): YueUiFormularyMask | null {
    if (this.field) {
      if (typeof this.field.mask === 'function') {
        const retval = this.field.mask();
        return getMask(retval as string) || null;
      } else if (this.field.mask) {
        return getMask(this.field.mask as string) || null;
      }
    }
    return null;
  }

  public get model(): {[x: string]: any} {
    if (this._model) {
      return this._model;
    } else {
      const cached = this.formulary.getModel();
      if (cached) {
        this._model = cached;
        return cached;
      } else {
        return {};
      }
    }
  }
  
  public get useInitialFocus(): boolean {
    if (this.formulary) {
      if (this.formulary.useInitialFocus) {
        return this.identifier === this.formulary.getFirstFieldIdentifier(true)
      }
    }
    return false;
  }

  public get styles(): { [x: string]: any } {
    if (this.field) {
      return this.field.styles || {};
    }
    return {};
  }

  public get contextRenderer(): { [x: string]: any } {
    return {
      model: this.model,
      abstractControl: this.abstractControl,
      field: this.field,
      formGroup: this.formGroup,
      formulary: this.formulary,
    };
  }

  constructor() { }

  public listeners(type: string, paramenters?: any): void {
    if (this.field.listeners && typeof this.field.listeners === `object`) {
      if (type in this.field.listeners) {
        const listener = (this.field.listeners as any)[type] as Listener;
        if (listener) {
          const args = [
            this.field,
            ...(Array.isArray(paramenters) ? paramenters : [paramenters]),
            this,
          ];
          if (typeof listener === `function`) {
            listener.apply(this, args);
          } else if (!Array.isArray(listener) && typeof listener === `object`) {
            listener.handler.apply(listener.scope, args);
          }
        }
      }
    }
  }

  public ngOnInit(): void {
    this.listeners(`componentOnInit`);
  }

  public ngAfterViewInit(): void {
    this.listeners(`componentOnAfterViewInit`);
  }

  public ngAfterContentInit(): void {
    this.listeners(`componentOnAfterContentInit`);
  }

  public ngOnDestroy(): void {
    this.listeners(`componentOnDestroy`);
  }

}
