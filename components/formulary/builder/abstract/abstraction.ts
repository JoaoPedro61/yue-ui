import { Modifiers, Formulary, } from './../fix-ralacional';
import { AbstractControl, FormGroup } from '@angular/forms';



export abstract class FieldAbstraction {

  private _formGroup!: FormGroup;

  private _abstractControl!: AbstractControl;

  private _options!: Modifiers.FormularyOptions;

  private _model!: {[x: string]: any};

  public readonly identifier!: string;

  public readonly formulary!: Formulary;

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

  public get options(): Modifiers.FormularyOptions {
    if (this._options) {
      return this._options;
    } else {
      const cached = this.formulary.getOptions();
      if (cached) {
        this._options = cached;
        return cached;
      } else {
        return {};
      }
    }
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

  constructor() { }

  public listeners(type: string, paramenters?: any[]): void {
  }

}

