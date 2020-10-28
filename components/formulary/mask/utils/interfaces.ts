export interface YueUiFormularyMaskFormatToRegExp {
  [x: string]: RegExp;
}

export type YueUiFormularyMask = string | ((value: string) => string);

export interface YueUiFormularyMasks {
  formatToRegExp: YueUiFormularyMaskFormatToRegExp;
  allFormatsStr: string;
  allFormatsGlobal: RegExp;  
}
