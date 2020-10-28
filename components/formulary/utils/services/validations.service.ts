import { Injectable } from '@angular/core';

import {
  yueUiFormularyAddValidator,
  yueUiFormularyRemoveValidator,
  YueUiFormularyUtilsValidator,
  yueUiFormularySetValidatorMessage,
  YueUiFormularyUtilsValidatorMesssage,
  yueUiFormularyGetValidatorsNames,
  yueUiFormularyGetValidatorsMessages,
  YueUiFormularyUtilsValidatorMesssages,
  YueUiFormularyUtilsValidatorPrimitiveHandler,
  yueUiFormularyGetValidators,
  yueUiFormularyGetFullValidators
} from '../validators';



@Injectable()
export class YueUiFormularyUtilsValidationsService {

  public add(validation: YueUiFormularyUtilsValidator, force: boolean = false): this {
    yueUiFormularyAddValidator(validation, force);
    return this;
  }

  public remove(validator: string): this {
    yueUiFormularyRemoveValidator(validator);
    return this;
  }

  public setValidatorMessage(validator: string, message: YueUiFormularyUtilsValidatorMesssage): this {
    yueUiFormularySetValidatorMessage(validator, message);
    return this;
  }

  public getValidatorsNames(): string[] {
    return yueUiFormularyGetValidatorsNames();
  }

  public getValidatorsMessages(validators: string[]): YueUiFormularyUtilsValidatorMesssages {
    return yueUiFormularyGetValidatorsMessages(validators);
  }

  public getValidators(validators: string[]): YueUiFormularyUtilsValidatorPrimitiveHandler[] {
    return yueUiFormularyGetValidators(validators);
  }

  public getFullValidators(validators: string[]): YueUiFormularyUtilsValidator[] {
    return yueUiFormularyGetFullValidators(validators);
  }

}
