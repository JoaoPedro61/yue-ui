import { InjectionToken } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Formulary } from './formulary'

import Interfaces from './fix-ralacional';



export const FORMULARY_SERVICE_TOKEN: InjectionToken<BehaviorSubject<Formulary>> = new InjectionToken('FORMULARY_SERVICE_TOKEN');

export const FORMULARY_SERVICE_SUBJECT: BehaviorSubject<Formulary> = new BehaviorSubject(null as any);

export const FORMULARY_COMPONENTS_TOKEN: InjectionToken<Interfaces.ComponentsInjection> = new InjectionToken('FORMULARY_COMPONENTS_TOKEN');
