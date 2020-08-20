import { TemplateRef, Type } from '@angular/core';
import { YueUiButtonSize, YueUiButtonType } from '@JoaoPedro61/yue-ui/button';

import { SpecificValidatorObjectFormation } from '@JoaoPedro61/yue-ui/formulary/utils';
import { YueUiSelectMode, YueUiSelectProperties } from '@JoaoPedro61/yue-ui/formulary/custom';

import { Observable } from 'rxjs';

import { ParentTypes } from './enums';




export { YueUiSelectMode, YueUiButtonSize, YueUiButtonType };


export type BasicFn = (...parameters: any[]) => any;


export type YueSwitchModes = 'normal' | 'indeterminate' | 'radio';


export interface BasicButtonProperties {
  [x: string]: any;
}


export interface PredefinedListenerWithScope {
  scope: any;
  handler: (...args: any[]) => void;
}

export interface FormularyOptions {
  [x: string]: any;
}

export type AllowedFieldsTypes = 'writable'
  | 'enumerable'
  | 'checkable'
  | 'selectable'
  | 'touchable'
  | 'internal';


export interface ComponentsInjection {
  [z: string]: Type<any>;
}


export type ChangeHandler = (changes: HistoryChanges) => void;


export type Listener = PredefinedListenerWithScope | ((...args: any[]) => void);


export type FieldDOMStruct = string
  | TemplateRef<any>
  | Type<any>
  | Observable<string>;

export interface HistoryChanges {
  [prop: string]: {
    current: any;
    old: any;
  };
}

export interface FieldIndicators {
  required?: boolean;
}

export interface CommonInheritMethods {
  dispatchChanges(): void;
  removeChangeHandler(alias: string): void;
  setChangeHandler(alias: string, fn: BasicFn): void;
  getChanges(): HistoryChanges;
  clearChanges(): void;
}

export interface FieldStruct extends CommonInheritMethods {

  /**
   * Commons Properties
   */
  enable?: boolean;
  indicators?: FieldIndicators;
  default?: any;
  wrapper?: GeneratedFieldMetadata[];
  identifier: string;
  type?: AllowedFieldsTypes;
  width?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  label?: FieldDOMStruct;
  labelAppend?: FieldDOMStruct;
  labelPrepend?: FieldDOMStruct;
  description?: FieldDOMStruct;
  template?: FieldDOMStruct;
  validators?: Array<string | ((...args: any[]) => SpecificValidatorObjectFormation)>;
  placeholder?: string | ((...args: any[]) => string) | Observable<string>;
  listeners?: {
    tap?: Listener;
  };
  hide?: boolean | ((...args: any) => boolean);
  styles?: { [style: string]: any };

  /**
   * Selectables fields
   */
  options?: ((...args: any[]) => (({ [x: string]: any })[]
    | Observable<({ [x: string]: any })>))
    | (({ [x: string]: any })[]
        | Observable<({ [x: string]: any })>
      );
  properties?: YueUiSelectProperties;
  mode?: YueUiSelectMode | YueSwitchModes;

  /**
   * Others properties
   */
  mask?: string | ((...args: any[]) => string);
  vstype?: string;
}



export interface FormulariesCommons {
  identifier: string;
}



export interface StaircaseFormularyStepStruct extends FormulariesCommons {
  name?: string;
  buttons?: GeneratedButtonMetadata;
  children: GeneratedFieldMetadata[];
  fragments: Partial<{ [s: string]: string }>;
  metadataType: ParentTypes.StaircaseFormulary;
  mode: ParentTypes.StaircaseFormulary;
}



export interface StaircaseFormularyStruct extends FormulariesCommons {
  mode: ParentTypes.StaircaseFormulary;
  children: StaircaseFormularyStepStruct[];
}



export interface LinearFormularyStruct extends FormulariesCommons {
  mode: ParentTypes.LinearFormulary;
  children: GeneratedFieldMetadata[];
}



export type ModifiersFn<R = any> = (parent: string, target: Partial<R>) => Partial<R>;



export interface CustomButtonStruct extends Partial<BasicButtonProperties> {
  label?: string;
  identifier: string;
  children?: GeneratedButtonMetadata[];
}



/**
 * Base metadata model
 */
interface BaseMetadata<S = any> extends CommonInheritMethods {
  [x: string]: any;
  struct: S;
  identifier: string;
  fragments: Partial<{ [s: string]: string }>;
}



/**
 * Buttons
 */
export interface GeneratedButtonMetadata extends BaseMetadata<CustomButtonStruct> {
  metadataType: ParentTypes.Button;
}

export type GeneratedButtonMetadataFn = () => GeneratedButtonMetadata;



/**
 * Fields
 */
export interface GeneratedFieldMetadata extends BaseMetadata<FieldStruct> {
  metadataType: ParentTypes.Field;
}

export type GeneratedFieldMetadataFn = () => GeneratedFieldMetadata;



/**
 * Staircase formulary mode
 */
export interface GeneratedStaircaseFormularyMetadata extends BaseMetadata<StaircaseFormularyStruct> {
  metadataType: ParentTypes.StaircaseFormulary;
}

export type GeneratedStaircaseFormularyMetadataFn = () => GeneratedStaircaseFormularyMetadata;



/**
 * Linear formulary mode
 */
export interface GeneratedLinearFormularyMetadata extends BaseMetadata<LinearFormularyStruct> {
  metadataType: ParentTypes.LinearFormulary;
}

export type GeneratedLinearFormularyMetadataFn = () => GeneratedLinearFormularyMetadata;
