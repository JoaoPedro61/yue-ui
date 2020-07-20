import { Type } from '@angular/core';



export interface ComponentsInjection {
  [inputName: string]: Type<any>;
}
