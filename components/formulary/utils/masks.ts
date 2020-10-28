import { YueUiFormularyMask } from '@joaopedro61/yue-ui/formulary/mask';




export interface TextMasks {
  [mask: string]: YueUiFormularyMask;
}

export const MASKS: TextMasks = {
  ipaddress: `000.000.000.000`,
};

export function getMask(mask: string): YueUiFormularyMask | void {
  if (mask.length) {
    if (MASKS.hasOwnProperty(mask)) {
      const maskObject = MASKS[mask];
      if (maskObject) {
        return maskObject;
      }
    }
  }
}
