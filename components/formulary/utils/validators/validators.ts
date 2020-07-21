import { Validators, AbstractControl } from '@angular/forms';

type ValidatorMessage = string | ((...args: any[]) => string);

type ValidatorsMessages = ValidatorMessage[];

interface SpecificValidatorObjectFormation {
  message: ValidatorMessage;
  validator: (...args: any[]) => any;
  name: string;
}

interface ValidatorObjectFormation {
  [x: string]: SpecificValidatorObjectFormation;
}

const VALIDATORS: ValidatorObjectFormation = {
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
  integernumber: {
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
  },
  ipaddress: {
    name: `ipaddress`,
    message: 'Endereço de IP inválido',
    validator: (control: AbstractControl) => {
      if (control.value) {
        if (!(/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gm.test(control.value))) {
          return {
            ipaddress: true
          };
        }
      }
      return null;
    }
  },
  ipaddressmanagement: {
    name: `ipaddressmanagement`,
    message: 'Endereço de IP de Gerência inválido',
    validator: (control: AbstractControl) => {
      if (control.value) {
        if (!(/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\/(\d){1,3}$/gm.test(control.value))) {
          return {
            ipaddressmanagement: true
          };
        }
      }
      return null;
    }
  },
  macaddress: {
    name: `macaddress`,
    message: 'Endereço de MAC inválido',
    validator: (control: AbstractControl) => {
      if (control.value) {
        if (!(/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/.test(control.value))) {
          return {
            macaddress: true
          };
        }
      }
      return null;
    }
  },
  brzipcode: {
    name: `brzipcode`,
    message: 'CEP inválido',
    validator: (control: AbstractControl) => {
      if (control.value) {
        if (!(/^\d{5}[\-]?\d{3}$/gm.test(control.value))) {
          return {
            brzipcode: true
          };
        }
      }
      return null;
    }
  },
  cpf: {
    name: `cpf`,
    message: 'CPF inválido',
    validator: (control: AbstractControl) => {
      if (control.value) {
        if (!(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/.test(control.value))) {
          return {
            cpf: true
          };
        }
      }
      return null;
    }
  },
  cnpj: {
    name: `cnpj`,
    message: 'CNPJ inválido',
    validator: (control: AbstractControl) => {
      if (control.value) {
        if (!(/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/.test(control.value))) {
          return {
            cnpj: true
          };
        }
      }
      return null;
    }
  },
  sixdigitsauth: {
    name: `sixdigitsauth`,
    message: 'Código de autenticação inválido',
    validator: (control: AbstractControl) => {
      if (control.value) {
        if (!(/^(\d){3}\-(\d){3}$/gm.test(control.value))) {
          return {
            sixdigitsauth: true
          };
        }
      }
      return null;
    }
  },
  brphone: {
    name: `brphone`,
    message: 'Número de telefone inválido',
    validator: (control: AbstractControl) => {
      if (control.value) {
        if (typeof control.value === 'string' || typeof control.value === 'number') {
          if (/\-/.test(control.value.toString())) {
            if (!(/^\(\d\d\)\s((\d{5}-\d{4})|(\d{4}-\d{4}))$/gm.test(control.value.toString()))) {
              return {
                brphone: true
              };
            }
          } else {
            if (control.value.toString().length !== 11 || control.value.toString().length !== 12) {
              return {
                brphone: true
              };
            }
          }
        } else {
          return {
            brphone: true
          };
        }
      }
      return null;
    }
  },
  cpforcnpj: {
    name: `cpforcnpj`,
    message: 'CPF/CNPJ inválido',
    validator: (control: AbstractControl) => {
      if (control.value) {
        if (!(/(^\d{3}\.\d{3}\.\d{3}\-\d{2}$)|(^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$)/.test(control.value))) {
          return {
            cpforcnpj: true
          };
        }
      }
      return null;
    }
  },
};

function updateMessageValidator(validator: string, message: string | ((...args: any[]) => string)) {
  if (VALIDATORS.hasOwnProperty(validator)) {
    VALIDATORS[validator].message = message;
  }
  return updateMessageValidator;
}

function getValidatorsNames(): string[] {
  return Object.keys(VALIDATORS);
}

function getMessages(erros: string[]): (string | ((...args: any[]) => string))[] {
  const results = [];
  if (erros.length) {
    for (let index = 0, length = erros.length; index < length; index++) {
      if (VALIDATORS.hasOwnProperty(erros[index])) {
        if (VALIDATORS[erros[index]].message) {
          results.push(VALIDATORS[erros[index]].message);
        }
      }
    }
  }
  return results;
}

function getValidators(validators: (string | ((...args: any[]) => any))[]): any {
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
        if (VALIDATORS.hasOwnProperty(validatorName)) {
          const validatorFunc = VALIDATORS[validatorName].validator(...parameters);
          result.push({
            name: `result`,
            message: VALIDATORS[validatorName].message,
            validator: validatorFunc
          });
        }
      } else {
        if (VALIDATORS.hasOwnProperty(validator)) {
          result.push(VALIDATORS[validator]);
        }
      }
    }
  }
  return result;
}

export {
  VALIDATORS,
  getMessages,
  ValidatorsMessages,
  ValidatorMessage,
  updateMessageValidator,
  getValidatorsNames,
  SpecificValidatorObjectFormation,
  ValidatorObjectFormation,
  getValidators,
};

