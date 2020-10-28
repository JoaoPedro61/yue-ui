import { Validators, AbstractControl, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';



export type YueUiFormularyUtilsValidatorMesssage = string | ((...args: any[]) => string) | Observable<string>;

export type YueUiFormularyUtilsValidatorMesssages = YueUiFormularyUtilsValidatorMesssage[];

export type YueUiFormularyUtilsValidatorPrimitiveHandler = (control: FormControl | AbstractControl) => any;

export type YueUiFormularyUtilsValidatorHandler = YueUiFormularyUtilsValidatorPrimitiveHandler | ((...value: any[]) => ((control: FormControl | AbstractControl) => { [x: string]: any } | null));

export interface YueUiFormularyUtilsValidator {
  message: YueUiFormularyUtilsValidatorMesssage;
  validator: YueUiFormularyUtilsValidatorHandler;
  name: string;
}

export interface YueUiFormularyUtilsValidators {
  [x: string]: YueUiFormularyUtilsValidator;
}

export const YUE_UI_FORMULARY_VALIDATORS: YueUiFormularyUtilsValidators = {
  required: {
    name: `required`,
    message: 'Este campo não pode ser vazio',
    validator(control: AbstractControl) {
      if (Array.isArray(control.value)) {
        return control.value.length ? null : { required: true };
      } else if (control.value instanceof Object) {
        if (control.value instanceof Date) {
          return null;
        }
        return Object.keys(control.value).length ? null : { required: true };
      } else {
        let value = control.value !== null || control.value !== undefined ? null : { required: true };
        if (value) { return value; }
        value = (typeof control.value === 'string' && control.value.length) || typeof control.value === 'number' || typeof control.value === 'boolean' ? null : { required: true };
        return value;
      }
    }
  },
  max: {
    name: `max`,
    message: 'Valor máximo excedido',
    validator: Validators.max
  },
  min: {
    name: `min`,
    message: 'Valor mínimo excedido',
    validator: Validators.min
  },
  number: {
    name: `number`,
    message: 'Tipo número inválido',
    validator: (control: AbstractControl) => {
      if (control.value === undefined || control.value === null || control.value === '') {
        return void 0;
      }
      function invalid() {
        return {
          number: true
        };
      }
      if (Array.isArray(control.value)) {
        return invalid();
      }
      if (!Array.isArray(control.value) && typeof control.value === 'object') {
        return invalid();
      }
      if (!(/^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/gm.test(control.value))) {
        return invalid();
      }
      return null;
    }
  },
  integer: {
    name: `integernumber`,
    message: 'Tipo número inválido, não pode ser um valor quebrado',
    validator: (control: AbstractControl) => {
      if (control.value === undefined || control.value === null || control.value === '') {
        return void 0;
      }
      function invalid() {
        return {
          number: true
        };
      }
      if (Array.isArray(control.value)) {
        return invalid();
      }
      if (!Array.isArray(control.value) && typeof control.value === 'object') {
        return invalid();
      }
      if (!(/^\d+$/gm.test(control.value))) {
        return invalid();
      }
      return null;
    }
  },
  maxlength: {
    name: `maxlength`,
    message: 'Tamanho máximo excedido',
    validator: Validators.maxLength
  },
  minlength: {
    name: `minlength`,
    message: 'Tamanho mínimo excedido',
    validator: Validators.minLength
  },
  email: {
    name: `email`,
    message: 'Endereço de E-mail inválido',
    validator: Validators.email
  },
  null: {
    name: `null`,
    message: 'Vazio',
    validator: Validators.nullValidator
  }
};

export function yueUiFormularyAddValidator(validation: YueUiFormularyUtilsValidator, force: boolean = false) {
  if (validation) {
    if (!(validation.name in YUE_UI_FORMULARY_VALIDATORS) || force) {
      YUE_UI_FORMULARY_VALIDATORS[validation.name] = validation;
    }
  }
  return yueUiFormularyAddValidator;
}

export function yueUiFormularyRemoveValidator(validator: string) {
  if (validator) {
    if ((validator in YUE_UI_FORMULARY_VALIDATORS)) {
      delete YUE_UI_FORMULARY_VALIDATORS[validator];
    }
  }
  return yueUiFormularyRemoveValidator;
}

export function yueUiFormularySetValidatorMessage(validator: string, message: YueUiFormularyUtilsValidatorMesssage) {
  if (YUE_UI_FORMULARY_VALIDATORS.hasOwnProperty(validator)) {
    YUE_UI_FORMULARY_VALIDATORS[validator].message = message;
  }
  return yueUiFormularySetValidatorMessage;
}

export function yueUiFormularyGetValidatorsNames(): string[] {
  return Object.keys(YUE_UI_FORMULARY_VALIDATORS);
}

export function yueUiFormularyGetValidatorsMessages(erros: string[]): YueUiFormularyUtilsValidatorMesssages {
  const results = [];
  if (erros.length) {
    for (let index = 0, length = erros.length; index < length; index++) {
      if (YUE_UI_FORMULARY_VALIDATORS.hasOwnProperty(erros[index])) {
        if (YUE_UI_FORMULARY_VALIDATORS[erros[index]].message) {
          results.push(YUE_UI_FORMULARY_VALIDATORS[erros[index]].message);
        }
      }
    }
  }
  return results;
}

export function yueUiFormularyGetValidators(validators: string[]): YueUiFormularyUtilsValidatorPrimitiveHandler[] {
  const result = [];
  for (let index = 0, length = validators.length; index < length; index++) {
    const validator = validators[index];
    if ('string' === typeof validator) {
      const hasParams = /\:/gm.test(validator);
      if (hasParams) {
        const splited = validator.split(':') as string[];
        const validatorName = splited.shift() as string;
        const parameters = [];
        for (let indexP = 0, lengthP = splited.length; indexP < lengthP; indexP++) {
          if (/^\d+$/.test(splited[indexP])) {
            parameters.push(parseFloat(splited[indexP]));
          } else {
            parameters.push(splited[indexP]);
          }
        }
        if (YUE_UI_FORMULARY_VALIDATORS.hasOwnProperty(validatorName)) {
          const validatorFunc = (YUE_UI_FORMULARY_VALIDATORS[validatorName].validator as any)(...parameters);
          result.push(validatorFunc);
        }
      } else {
        if (YUE_UI_FORMULARY_VALIDATORS.hasOwnProperty(validator)) {
          result.push(YUE_UI_FORMULARY_VALIDATORS[validator].validator);
        }
      }
    }
  }
  return result;
}

export function yueUiFormularyGetFullValidators(validators: string[]): YueUiFormularyUtilsValidator[] {
  const result = [];
  for (let index = 0, length = validators.length; index < length; index++) {
    const validator = validators[index];
    if ('string' === typeof validator) {
      const hasParams = /\:/gm.test(validator);
      if (hasParams) {
        const splited = validator.split(':') as string[];
        const validatorName = splited.shift() as string;
        const parameters = [];
        for (let indexP = 0, lengthP = splited.length; indexP < lengthP; indexP++) {
          if (/^\d+$/.test(splited[indexP])) {
            parameters.push(parseFloat(splited[indexP]));
          } else {
            parameters.push(splited[indexP]);
          }
        }
        if (YUE_UI_FORMULARY_VALIDATORS.hasOwnProperty(validatorName)) {
          const validatorFunc = (YUE_UI_FORMULARY_VALIDATORS[validatorName].validator as any)(...parameters);
          result.push({
            name: validatorName,
            message: YUE_UI_FORMULARY_VALIDATORS[validatorName].message,
            validator: validatorFunc
          });
        }
      } else {
        if (YUE_UI_FORMULARY_VALIDATORS.hasOwnProperty(validator)) {
          result.push(YUE_UI_FORMULARY_VALIDATORS[validator]);
        }
      }
    }
  }
  return result;
}
