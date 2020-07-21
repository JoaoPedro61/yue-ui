import { TemplateRef, Type } from '@angular/core';
import { YueUiButtonSize, YueUiButtonType } from '@JoaoPedro61/yue-ui/button';

import { SpecificValidatorObjectFormation } from '@JoaoPedro61/yue-ui/formulary/utils';
import { Observable } from 'rxjs';
// import { YueSelectProperties, YueSelectMode } from '../custom-input/inputs/input-select/interfaces';
type YueSelectProperties = any;
type YueSelectMode = any;
import { ParentTypes } from './enums';




export { YueSelectMode, YueUiButtonSize, YueUiButtonType };


export type BasicFn = (...parameters: any[]) => any;


export type YueSwitchModes = 'normal' | 'indeterminate' | 'radio';


export interface BasicButtonProperties {
  [x: string]: any;
}


export interface PredefinedListenerWithScope {
  scope: any;
  handler: (...args: any[]) => void;
}



export type AllowedFieldsTypes = 'writable'
 | 'enumerable'
 | 'selectable'
 | 'checkable'
 | 'touchable'
 | 'internal';



export type Listener = PredefinedListenerWithScope | ((...args: any[]) => void);


export type FieldDOMStruct = string
  | TemplateRef<any>
  | Type<any>
  | ((...args: any[]) => string)
  | Observable<string>;


export interface FieldStruct {

  /**
   * Commons Properties
   */
  enable?: boolean;
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

  /**
   * Selectables fields
   */
  options?: ((...args: any[]) => ((string | object | number)[] | Observable<any>)) | ((string | object | number)[] | Observable<any>);
  properties?: YueSelectProperties;
  mode?: YueSelectMode | YueSwitchModes;

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
  fragments: Partial<{[s: string]: string}>;
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
interface BaseMetadata<S = any> {
  [x: string]: any;
  struct: S;
  identifier: string;
  fragments: Partial<{[s: string]: string}>;
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
