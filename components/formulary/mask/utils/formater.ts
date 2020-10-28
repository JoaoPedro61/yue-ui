import { YueUiFormularyMask, YueUiFormularyMasks } from './interfaces';



export const YUE_UI_FORMULARY_MASKS: YueUiFormularyMasks = {
  formatToRegExp: {
    '0': /[0-9]/,
    'a': /[a-z]/,
    'A': /[A-Z]/,
    'B': /[a-zA-Z]/,
  },
  allFormatsStr: '',
  allFormatsGlobal: /[]/,
};

export function yueUiFormularyMaskUpdateAllFormatsGlobal(): void {
  const _allFormatsStr = '(' +
    Object.keys(YUE_UI_FORMULARY_MASKS.formatToRegExp)
      .map(key => YUE_UI_FORMULARY_MASKS.formatToRegExp[key].toString())
      .map(regexStr => regexStr.substr(1, regexStr.length - 2))
      .join('|')
    + ')';
  const _allFormatsGlobal = yueUiFormularyMaskGetAllFormatRegExp('g', _allFormatsStr);
  YUE_UI_FORMULARY_MASKS.allFormatsStr = _allFormatsStr;
  YUE_UI_FORMULARY_MASKS.allFormatsGlobal = _allFormatsGlobal;
}

yueUiFormularyMaskUpdateAllFormatsGlobal();

export function yueUiFormularyMaskValueToFormat(value: string, format: YueUiFormularyMask): string {
  console.log(YUE_UI_FORMULARY_MASKS);
  console.log(value);
  console.log(format);
  
  let _format!: string;
  const unmaskedValue = yueUiFormularyMaskUnmaskValue(value);
  if (typeof format === `function`) {
    _format = format(unmaskedValue || ``);
  } else {
    _format = format;
  }
  const maskedValueArray = unmaskedValue.split('');
  for (let formatCharPosition = 0; formatCharPosition < _format.length; formatCharPosition++) {
    const valueChar = maskedValueArray[formatCharPosition];
    // Do skip position if no value was inputted at this position
    if (valueChar === undefined) {
      continue;
    }
    let formatChar: string = _format[formatCharPosition];
    let formatRegex = yueUiFormularyMaskGetFormatRegExp(formatChar);
    const isSeparator = formatChar && !formatRegex;
    if (isSeparator) {
      // Adds separator on correct position and skips formatting
      maskedValueArray.splice(formatCharPosition, 0, formatChar);
      continue;
    }
    if (valueChar && formatRegex && formatRegex.test(valueChar)) {
      // Adds formatted char to the correct position
      maskedValueArray.splice(formatCharPosition, 1, valueChar);
    }
  }
  // Join all parsed value, limiting length to the one specified in format
  return maskedValueArray.join('').substr(0, _format.length);
}

export function yueUiFormularyMaskUnmaskValue(value: string): string {
  const unmaskedMathes = value.replace(' ', '').match(YUE_UI_FORMULARY_MASKS.allFormatsGlobal);
  return unmaskedMathes ? unmaskedMathes.join('') : '';
}

export function yueUiFormularyMaskGetAllFormatRegExp(flags?: string, regex?: string) {
  return new RegExp(regex || YUE_UI_FORMULARY_MASKS.allFormatsStr, flags);
}

export function yueUiFormularyMaskGetFormatRegExp(formatChar: string): RegExp | null {
  return formatChar && YUE_UI_FORMULARY_MASKS.formatToRegExp[formatChar] ? YUE_UI_FORMULARY_MASKS.formatToRegExp[formatChar] : null;
}
