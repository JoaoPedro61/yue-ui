import { TemplateRef, Type } from '@angular/core';
import { YueUiButtonSize, YueUiButtonType, YueUiButton } from '@joaopedro61/yue-ui/button';

import { SpecificValidatorObjectFormation } from '@joaopedro61/yue-ui/formulary/utils';
import { YueUiSelectMode, YueUiSelectProperties } from '@joaopedro61/yue-ui/formulary/custom/select';
import { YueUiSwitchModes } from '@joaopedro61/yue-ui/formulary/custom/switch';
import { YueUiGridEmbeddedProperty } from '@joaopedro61/yue-ui/grid';

import { Observable } from 'rxjs';

import { ParentTypes } from './enums';




export { YueUiSelectMode, YueUiButtonSize, YueUiButtonType, YueUiSwitchModes };


export type BasicFn = (...parameters: any[]) => any;




export interface BasicButtonProperties extends YueUiButton {
  [x: string]: any;
  identifier: string;

  label?: FieldDOMStruct;
  icon?: string;

  click?: Listener;
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


export type Listener = PredefinedListenerWithScope | BasicFn;


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

export type YueUiTextModes = 'text' | 'textarea' | 'password';

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
  width?: 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 17
    | 18
    | 19
    | 20
    | 21
    | 22
    | 23
    | 24
    | {
      lg?: number | YueUiGridEmbeddedProperty;
      md?: number | YueUiGridEmbeddedProperty;
      xs?: number | YueUiGridEmbeddedProperty;
      sm?: number | YueUiGridEmbeddedProperty;
      xl?: number | YueUiGridEmbeddedProperty;
      xxl?: number | YueUiGridEmbeddedProperty;
    };
  label?: FieldDOMStruct;
  labelAppend?: FieldDOMStruct;
  labelPrepend?: FieldDOMStruct;
  description?: FieldDOMStruct;
  template?: FieldDOMStruct;
  validators?: Array<string | ((...args: any[]) => SpecificValidatorObjectFormation)>;
  placeholder?: string | ((...args: any[]) => string | null) | Observable<string | null> | null;
  listeners?: {
    click?: Listener;
    mousedown?: Listener;
    mouseup?: Listener;
    mouseenter?: Listener;
    mouseleave?: Listener;
    focus?: Listener;
    blur?: Listener;
    search?: Listener;
    change?: Listener;
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
  mode?: YueUiSelectMode | YueUiSwitchModes | YueUiTextModes;

  /**
   * Others properties
   */
  mask?: string | ((...args: any[]) => string | null) | null;
  vstype?: string;
}



export interface FormulariesCommons {
  identifier: string;
}



export interface StaircaseFormularyStepStruct extends FormulariesCommons {
  name?: string;
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



export interface ButtonStruct extends Partial<BasicButtonProperties>, CommonInheritMethods  { }



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
export interface GeneratedButtonMetadata extends BaseMetadata<ButtonStruct> {
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

export type ButtonsAlign = 'start' | 'center' | 'end';

export interface ListenEvent {
  type: 'modelChanged' | 'clickedAtFooterButton';
  data: any;
}
