// tslint:disable
// @ts-ignore

/**
 * Convert a color
 *
 * @export
 * @param {*} rgb RGB Color
 * @return {*}  {*} Hex Color
 */
export function RGBToHex(rgb: any): any {
  let ex = /^rgb\((((((((1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5]),\s?)){2}|((((1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5])\s)){2})((1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5]))|((((([1-9]?\d(\.\d+)?)|100|(\.\d+))%,\s?){2}|((([1-9]?\d(\.\d+)?)|100|(\.\d+))%\s){2})(([1-9]?\d(\.\d+)?)|100|(\.\d+))%))\)$/i;
  if (ex.test(rgb)) {
    // choose correct separator
    let sep = rgb.indexOf(",") > -1 ? "," : " ";
    // turn "rgb(r,g,b)" into [r,g,b]
    rgb = rgb.substr(4).split(")")[0].split(sep);

    // convert %s to 0–255
    for (let R in rgb) {
      let r = rgb[R];
      if (r.indexOf("%") > -1)
        rgb[R] = Math.round(r.substr(0, r.length - 1) / 100 * 255);
      /* Example:
      75% -> 191
      75/100 = 0.75, * 255 = 191.25 -> 191
      */
    }

    let r = (+rgb[0]).toString(16),
      g = (+rgb[1]).toString(16),
      b = (+rgb[2]).toString(16);

    if (r.length == 1)
      r = "0" + r;
    if (g.length == 1)
      g = "0" + g;
    if (b.length == 1)
      b = "0" + b;

    return "#" + r + g + b;

  } else {
    return "Invalid input color";
  }
}

/**
 * Convert a color
 *
 * @export
 * @param {*} rgba RGBA Color
 * @return {*}  {*} HEX with transparence color
 */
export function RGBAToHexA(rgba: any): any {
  let ex = /^rgba\((((((((1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5]),\s?)){3})|(((([1-9]?\d(\.\d+)?)|100|(\.\d+))%,\s?){3}))|(((((1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5])\s){3})|(((([1-9]?\d(\.\d+)?)|100|(\.\d+))%\s){3}))\/\s)((0?\.\d+)|[01]|(([1-9]?\d(\.\d+)?)|100|(\.\d+))%)\)$/i;
  if (ex.test(rgba)) {
    let sep = rgba.indexOf(",") > -1 ? "," : " ";
    rgba = rgba.substr(5).split(")")[0].split(sep);

    // strip the slash if using space-separated syntax
    if (rgba.indexOf("/") > -1)
      rgba.splice(3, 1);

    for (let R in rgba) {
      let r = rgba[R];
      if (r.indexOf("%") > -1) {
        let p = r.substr(0, r.length - 1) / 100;

        if ((R as any) < 3) {
          rgba[R] = Math.round(p * 255);
        } else {
          rgba[R] = p;
        }
      }
    }

    let r = (+rgba[0]).toString(16),
      g = (+rgba[1]).toString(16),
      b = (+rgba[2]).toString(16),
      a = Math.round(+rgba[3] * 255).toString(16);

    if (r.length == 1)
      r = "0" + r;
    if (g.length == 1)
      g = "0" + g;
    if (b.length == 1)
      b = "0" + b;
    if (a.length == 1)
      a = "0" + a;

    return "#" + r + g + b + a;

  } else {
    return "Invalid input color";
  }
}

/**
 * Convert a color
 *
 * @export
 * @param {*} h HEX color
 * @param {*} isPct In percentage mode
 * @return {*}  {*} RGB color
 */
export function hexToRGB(h: any, isPct: any): any {
  let ex = /^#([\da-f]{3}){1,2}$/i;
  if (ex.test(h)) {
    let r = 0, g = 0, b = 0;
    isPct = isPct === true;

    // 3 digits
    if (h.length == 4) {
      r = "0x" + h[1] + h[1] as any;
      g = "0x" + h[2] + h[2] as any;
      b = "0x" + h[3] + h[3] as any;

      // 6 digits
    } else if (h.length == 7) {
      r = "0x" + h[1] + h[2] as any;
      g = "0x" + h[3] + h[4] as any;
      b = "0x" + h[5] + h[6] as any;
    }
    if (isPct) {
      r = +(r / 255 * 100).toFixed(1);
      g = +(g / 255 * 100).toFixed(1);
      b = +(b / 255 * 100).toFixed(1);
    }
    return "rgb(" + (isPct ? r + "%," + g + "%," + b + "%" : +r + "," + +g + "," + +b) + ")";

  } else {
    return "Invalid input color";
  }
}

/**
 * Convert a color
 *
 * @export
 * @param {*} h HEX with transparence color
 * @param {*} isPct In percentage mode
 * @param {number} [fix=0] Fix number
 * @return {*}  {*} RGBA color
 */
export function hexAToRGBA(h: any, isPct: any, fix: number = 0): any {
  let ex = /^#([\da-f]{4}){1,2}$/i;
  if (ex.test(h)) {
    let r = 0, g = 0, b = 0, a = 1;
    isPct = isPct === true;

    if (h.length == 5) {
      r = "0x" + h[1] + h[1] as any;
      g = "0x" + h[2] + h[2] as any;
      b = "0x" + h[3] + h[3] as any;
      a = "0x" + h[4] + h[4] as any;

    } else if (h.length == 9) {
      r = "0x" + h[1] + h[2] as any;
      g = "0x" + h[3] + h[4] as any;
      b = "0x" + h[5] + h[6] as any;
      a = "0x" + h[7] + h[8] as any;
    }
    a = +(a / 255).toFixed(3);
    if (isPct) {
      r = +(r / 255 * 100).toFixed(1);
      g = +(g / 255 * 100).toFixed(1);
      b = +(b / 255 * 100).toFixed(1);
      a = +(a * 100).toFixed(1);
    }

    return "rgba(" + (isPct ? r + "%," + g + "%," + b + "%" + "," + ((fix || a)) : +r + "," + +g + "," + +b + "," + (fix || a)) + ")";

  } else {
    return "Invalid input color";
  }
}

/**
 * Convert a color
 *
 * @export
 * @param {*} rgb RGB Color
 * @return {*}  {*} HSL color
 */
export function RGBToHSL(rgb: any): any {
  let ex = /^rgb\((((((((1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5]),\s?)){2}|((((1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5])\s)){2})((1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5]))|((((([1-9]?\d(\.\d+)?)|100|(\.\d+))%,\s?){2}|((([1-9]?\d(\.\d+)?)|100|(\.\d+))%\s){2})(([1-9]?\d(\.\d+)?)|100|(\.\d+))%))\)$/i;
  if (ex.test(rgb)) {
    let sep = rgb.indexOf(",") > -1 ? "," : " ";
    rgb = rgb.substr(4).split(")")[0].split(sep);

    // convert %s to 0–255
    for (let R in rgb) {
      let r = rgb[R];
      if (r.indexOf("%") > -1)
        rgb[R] = Math.round(r.substr(0, r.length - 1) / 100 * 255);
    }

    // make r, g, and b fractions of 1
    let r = rgb[0] / 255,
      g = rgb[1] / 255,
      b = rgb[2] / 255,

      // find greatest and smallest channel values
      cmin = Math.min(r, g, b),
      cmax = Math.max(r, g, b),
      delta = cmax - cmin,
      h = 0,
      s = 0,
      l = 0;

    // calculate hue
    // no difference
    if (delta == 0)
      h = 0;
    // red is max
    else if (cmax == r)
      h = ((g - b) / delta) % 6;
    // green is max
    else if (cmax == g)
      h = (b - r) / delta + 2;
    // blue is max
    else
      h = (r - g) / delta + 4;

    h = Math.round(h * 60);

    // make negative hues positive behind 360°
    if (h < 0)
      h += 360;

    // calculate lightness
    l = (cmax + cmin) / 2;

    // calculate saturation
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

    // multiply l and s by 100
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    return "hsl(" + h + "," + s + "%," + l + "%)";

  } else {
    return "Invalid input color";
  }
}

/**
 * Convert a color
 *
 * @export
 * @param {*} rgba RGBA color
 * @return {*}  {*} HSLA Color
 */
export function RGBAToHSLA(rgba: any): any {
  let ex = /^rgba\((((((((1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5]),\s?)){3})|(((([1-9]?\d(\.\d+)?)|100|(\.\d+))%,\s?){3}))|(((((1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5])\s){3})|(((([1-9]?\d(\.\d+)?)|100|(\.\d+))%\s){3}))\/\s)((0?\.\d+)|[01]|(([1-9]?\d(\.\d+)?)|100|(\.\d+))%)\)$/i;
  if (ex.test(rgba)) {
    let sep = rgba.indexOf(",") > -1 ? "," : " ";
    rgba = rgba.substr(5).split(")")[0].split(sep);

    // strip the slash if using space-separated syntax
    if (rgba.indexOf("/") > -1)
      rgba.splice(3, 1);

    for (let R in rgba) {
      let r = rgba[R];
      if (r.indexOf("%") > -1) {
        let p = r.substr(0, r.length - 1) / 100;

        if ((R as any) < 3) {
          rgba[R] = Math.round(p * 255);
        }
      }
    }

    // make r, g, and b fractions of 1
    let r = rgba[0] / 255,
      g = rgba[1] / 255,
      b = rgba[2] / 255,
      a = rgba[3],

      // find greatest and smallest channel values
      cmin = Math.min(r, g, b),
      cmax = Math.max(r, g, b),
      delta = cmax - cmin,
      h = 0,
      s = 0,
      l = 0;

    // calculate hue
    // no difference
    if (delta == 0)
      h = 0;
    // red is max
    else if (cmax == r)
      h = ((g - b) / delta) % 6;
    // green is max
    else if (cmax == g)
      h = (b - r) / delta + 2;
    // blue is max
    else
      h = (r - g) / delta + 4;

    h = Math.round(h * 60);

    // make negative hues positive behind 360°
    if (h < 0)
      h += 360;

    // calculate lightness
    l = (cmax + cmin) / 2;

    // calculate saturation
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

    // multiply l and s by 100
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    return "hsla(" + h + "," + s + "%," + l + "%," + a + ")";

  } else {
    return "Invalid input color";
  }
}

/**
 * Convert a color
 *
 * @export
 * @param {*} hsl HSL Color
 * @param {*} isPct In percentage mode
 * @return {*}  {*} RGB Color
 */
export function HSLToRGB(hsl: any, isPct: any): any {
  let ex = /^hsl\(((((([12]?[1-9]?\d)|[12]0\d|(3[0-5]\d))(\.\d+)?)|(\.\d+))(deg)?|(0|0?\.\d+)turn|(([0-6](\.\d+)?)|(\.\d+))rad)((,\s?(([1-9]?\d(\.\d+)?)|100|(\.\d+))%){2}|(\s(([1-9]?\d(\.\d+)?)|100|(\.\d+))%){2})\)$/i;
  if (ex.test(hsl)) {
    let sep = hsl.indexOf(",") > -1 ? "," : " ";
    hsl = hsl.substr(4).split(")")[0].split(sep);
    isPct = isPct === true;

    let h = hsl[0],
      s = hsl[1].substr(0, hsl[1].length - 1) / 100,
      l = hsl[2].substr(0, hsl[2].length - 1) / 100;

    // strip label and convert to degrees (if necessary)
    if (h.indexOf("deg") > -1)
      h = h.substr(0, h.length - 3);
    else if (h.indexOf("rad") > -1)
      h = Math.round(h.substr(0, h.length - 3) / (2 * Math.PI) * 360);
    else if (h.indexOf("turn") > -1)
      h = Math.round(h.substr(0, h.length - 4) * 360);
    // keep hue fraction of 360 if ending up over
    if (h >= 360)
      h %= 360;

    let c = (1 - Math.abs(2 * l - 1)) * s,
      x = c * (1 - Math.abs((h / 60) % 2 - 1)),
      m = l - c / 2,
      r = 0,
      g = 0,
      b = 0;

    if (0 <= h && h < 60) {
      r = c; g = x; b = 0;
    } else if (60 <= h && h < 120) {
      r = x; g = c; b = 0;
    } else if (120 <= h && h < 180) {
      r = 0; g = c; b = x;
    } else if (180 <= h && h < 240) {
      r = 0; g = x; b = c;
    } else if (240 <= h && h < 300) {
      r = x; g = 0; b = c;
    } else if (300 <= h && h < 360) {
      r = c; g = 0; b = x;
    }

    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    if (isPct) {
      r = +(r / 255 * 100).toFixed(1);
      g = +(g / 255 * 100).toFixed(1);
      b = +(b / 255 * 100).toFixed(1);
    }

    return "rgb(" + (isPct ? r + "%," + g + "%," + b + "%" : +r + "," + +g + "," + +b) + ")";

  } else {
    return "Invalid input color";
  }
}

/**
 * Convert a color
 *
 * @export
 * @param {*} hsla HSLA Color
 * @param {*} isPct In percentage mode
 * @return {*}  {*} RGBA
 */
export function HSLAToRGBA(hsla: any, isPct: any): any {
  let ex = /^hsla\(((((([12]?[1-9]?\d)|[12]0\d|(3[0-5]\d))(\.\d+)?)|(\.\d+))(deg)?|(0|0?\.\d+)turn|(([0-6](\.\d+)?)|(\.\d+))rad)(((,\s?(([1-9]?\d(\.\d+)?)|100|(\.\d+))%){2},\s?)|((\s(([1-9]?\d(\.\d+)?)|100|(\.\d+))%){2}\s\/\s))((0?\.\d+)|[01]|(([1-9]?\d(\.\d+)?)|100|(\.\d+))%)\)$/i;
  if (ex.test(hsla)) {
    let sep = hsla.indexOf(",") > -1 ? "," : " ";
    hsla = hsla.substr(5).split(")")[0].split(sep);

    // strip the slash if using space-separated syntax
    if (hsla.indexOf("/") > -1)
      hsla.splice(3, 1);

    isPct = isPct === true;

    // must be fractions of 1
    let h = hsla[0],
      s = hsla[1].substr(0, hsla[1].length - 1) / 100,
      l = hsla[2].substr(0, hsla[2].length - 1) / 100,
      a = hsla[3];

    // strip label and convert to degrees (if necessary)
    if (h.indexOf("deg") > -1)
      h = h.substr(0, h.length - 3);
    else if (h.indexOf("rad") > -1)
      h = Math.round(h.substr(0, h.length - 3) / (2 * Math.PI) * 360);
    else if (h.indexOf("turn") > -1)
      h = Math.round(h.substr(0, h.length - 4) * 360);
    if (h >= 360)
      h %= 360;

    let c = (1 - Math.abs(2 * l - 1)) * s,
      x = c * (1 - Math.abs((h / 60) % 2 - 1)),
      m = l - c / 2,
      r = 0,
      g = 0,
      b = 0;

    if (0 <= h && h < 60) {
      r = c; g = x; b = 0;
    } else if (60 <= h && h < 120) {
      r = x; g = c; b = 0;
    } else if (120 <= h && h < 180) {
      r = 0; g = c; b = x;
    } else if (180 <= h && h < 240) {
      r = 0; g = x; b = c;
    } else if (240 <= h && h < 300) {
      r = x; g = 0; b = c;
    } else if (300 <= h && h < 360) {
      r = c; g = 0; b = x;
    }

    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    let pctFound = a.indexOf("%") > -1;

    if (isPct) {
      r = +(r / 255 * 100).toFixed(1);
      g = +(g / 255 * 100).toFixed(1);
      b = +(b / 255 * 100).toFixed(1);
      if (!pctFound) {
        a *= 100;
      } else {
        a = a.substr(0, a.length - 1);
      }

    } else if (pctFound) {
      a = a.substr(0, a.length - 1) / 100;
    }

    return "rgba(" + (isPct ? r + "%," + g + "%," + b + "%," + a + "%" : +r + "," + +g + "," + +b + "," + +a) + ")";

  } else {
    return "Invalid input color";
  }
}

/**
 * Convert a color
 *
 * @export
 * @param {*} H HEX Color
 * @return {*}  {*} HSL Color
 */
export function hexToHSL(H: any): any {
  let ex = /^#([\da-f]{3}){1,2}$/i;
  if (ex.test(H)) {
    // convert hex to RGB first
    let r = 0, g = 0, b = 0;
    if (H.length == 4) {
      r = "0x" + H[1] + H[1] as any;
      g = "0x" + H[2] + H[2] as any;
      b = "0x" + H[3] + H[3] as any;
    } else if (H.length == 7) {
      r = "0x" + H[1] + H[2] as any;
      g = "0x" + H[3] + H[4] as any;
      b = "0x" + H[5] + H[6] as any;
    }
    // then to HSL
    r /= 255;
    g /= 255;
    b /= 255;
    let cmin = Math.min(r, g, b),
      cmax = Math.max(r, g, b),
      delta = cmax - cmin,
      h = 0,
      s = 0,
      l = 0;

    if (delta == 0)
      h = 0;
    else if (cmax == r)
      h = ((g - b) / delta) % 6;
    else if (cmax == g)
      h = (b - r) / delta + 2;
    else
      h = (r - g) / delta + 4;

    h = Math.round(h * 60);

    if (h < 0)
      h += 360;

    l = (cmax + cmin) / 2;
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    return "hsl(" + h + "," + s + "%," + l + "%)";

  } else {
    return "Invalid input color";
  }
}

/**
 * Convert a color
 *
 * @export
 * @param {*} H Hex with transparence color
 * @return {*}  {*} HSLA Color
 */
export function hexAToHSLA(H: any): any {
  let ex = /^#([\da-f]{4}){1,2}$/i;
  if (ex.test(H)) {
    let r = 0, g = 0, b = 0, a = 1;
    // 4 digits
    if (H.length == 5) {
      r = "0x" + H[1] + H[1] as any;
      g = "0x" + H[2] + H[2] as any;
      b = "0x" + H[3] + H[3] as any;
      a = "0x" + H[4] + H[4] as any;
      // 8 digits
    } else if (H.length == 9) {
      r = "0x" + H[1] + H[2] as any;
      g = "0x" + H[3] + H[4] as any;
      b = "0x" + H[5] + H[6] as any;
      a = "0x" + H[7] + H[8] as any;
    }

    // normal conversion to HSLA
    r /= 255;
    g /= 255;
    b /= 255;
    let cmin = Math.min(r, g, b),
      cmax = Math.max(r, g, b),
      delta = cmax - cmin,
      h = 0,
      s = 0,
      l = 0;

    if (delta == 0)
      h = 0;
    else if (cmax == r)
      h = ((g - b) / delta) % 6;
    else if (cmax == g)
      h = (b - r) / delta + 2;
    else
      h = (r - g) / delta + 4;

    h = Math.round(h * 60);

    if (h < 0)
      h += 360;

    l = (cmax + cmin) / 2;
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    a = (a / 255).toFixed(3) as any;

    return "hsla(" + h + "," + s + "%," + l + "%," + a + ")";

  } else {
    return "Invalid input color";
  }
}

/**
 * Convert a color
 *
 * @export
 * @param {*} hsl HSL Color
 * @return {*}  {*} HEX Color
 */
export function HSLToHex(hsl: any): any {
  let ex = /^hsl\(((((([12]?[1-9]?\d)|[12]0\d|(3[0-5]\d))(\.\d+)?)|(\.\d+))(deg)?|(0|0?\.\d+)turn|(([0-6](\.\d+)?)|(\.\d+))rad)((,\s?(([1-9]?\d(\.\d+)?)|100|(\.\d+))%){2}|(\s(([1-9]?\d(\.\d+)?)|100|(\.\d+))%){2})\)$/i;
  if (ex.test(hsl)) {
    let sep = hsl.indexOf(",") > -1 ? "," : " ";
    hsl = hsl.substr(4).split(")")[0].split(sep);

    let h = hsl[0],
      s = hsl[1].substr(0, hsl[1].length - 1) / 100,
      l = hsl[2].substr(0, hsl[2].length - 1) / 100;

    // strip label and convert to degrees (if necessary)
    if (h.indexOf("deg") > -1)
      h = h.substr(0, h.length - 3);
    else if (h.indexOf("rad") > -1)
      h = Math.round(h.substr(0, h.length - 3) * (180 / Math.PI));
    else if (h.indexOf("turn") > -1)
      h = Math.round(h.substr(0, h.length - 4) * 360);
    if (h >= 360)
      h %= 360;

    let c = (1 - Math.abs(2 * l - 1)) * s,
      x = c * (1 - Math.abs((h / 60) % 2 - 1)),
      m = l - c / 2,
      r = 0,
      g = 0,
      b = 0;

    if (0 <= h && h < 60) {
      r = c; g = x; b = 0;
    } else if (60 <= h && h < 120) {
      r = x; g = c; b = 0;
    } else if (120 <= h && h < 180) {
      r = 0; g = c; b = x;
    } else if (180 <= h && h < 240) {
      r = 0; g = x; b = c;
    } else if (240 <= h && h < 300) {
      r = x; g = 0; b = c;
    } else if (300 <= h && h < 360) {
      r = c; g = 0; b = x;
    }
    // having obtained RGB, convert channels to hex
    r = Math.round((r + m) * 255).toString(16) as any;
    g = Math.round((g + m) * 255).toString(16) as any;
    b = Math.round((b + m) * 255).toString(16) as any;

    // prepend 0s if necessary
    if ((r as any).length == 1)
      r = "0" + r as any;
    if ((g as any).length == 1)
      g = "0" + g as any;
    if ((b as any).length == 1)
      b = "0" + b as any;

    return "#" + r + g + b;

  } else {
    return "Invalid input color";
  }
}

/**
 * Convert a color
 *
 * @export
 * @param {*} hsla HSLA Color
 * @return {*}  {*} HEX with transparence color
 */
export function HSLAToHexA(hsla: any): any {
  let ex = /^hsla\(((((([12]?[1-9]?\d)|[12]0\d|(3[0-5]\d))(\.\d+)?)|(\.\d+))(deg)?|(0|0?\.\d+)turn|(([0-6](\.\d+)?)|(\.\d+))rad)(((,\s?(([1-9]?\d(\.\d+)?)|100|(\.\d+))%){2},\s?)|((\s(([1-9]?\d(\.\d+)?)|100|(\.\d+))%){2}\s\/\s))((0?\.\d+)|[01]|(([1-9]?\d(\.\d+)?)|100|(\.\d+))%)\)$/i;
  if (ex.test(hsla)) {
    let sep = hsla.indexOf(",") > -1 ? "," : " ";
    hsla = hsla.substr(5).split(")")[0].split(sep);

    // strip the slash
    if (hsla.indexOf("/") > -1)
      hsla.splice(3, 1);

    let h = hsla[0],
      s = hsla[1].substr(0, hsla[1].length - 1) / 100,
      l = hsla[2].substr(0, hsla[2].length - 1) / 100,
      a = hsla[3];

    // strip label and convert to degrees (if necessary)
    if (h.indexOf("deg") > -1)
      h = h.substr(0, h.length - 3);
    else if (h.indexOf("rad") > -1)
      h = Math.round(h.substr(0, h.length - 3) * (180 / Math.PI));
    else if (h.indexOf("turn") > -1)
      h = Math.round(h.substr(0, h.length - 4) * 360);
    if (h >= 360)
      h %= 360;

    // strip % from alpha, make fraction of 1 (if necessary)
    if (a.indexOf("%") > -1)
      a = a.substr(0, a.length - 1) / 100;

    let c = (1 - Math.abs(2 * l - 1)) * s,
      x = c * (1 - Math.abs((h / 60) % 2 - 1)),
      m = l - c / 2,
      r = 0,
      g = 0,
      b = 0;

    if (0 <= h && h < 60) {
      r = c; g = x; b = 0;
    } else if (60 <= h && h < 120) {
      r = x; g = c; b = 0;
    } else if (120 <= h && h < 180) {
      r = 0; g = c; b = x;
    } else if (180 <= h && h < 240) {
      r = 0; g = x; b = c;
    } else if (240 <= h && h < 300) {
      r = x; g = 0; b = c;
    } else if (300 <= h && h < 360) {
      r = c; g = 0; b = x;
    }
    r = Math.round((r + m) * 255).toString(16) as any;
    g = Math.round((g + m) * 255).toString(16) as any;
    b = Math.round((b + m) * 255).toString(16) as any;
    a = Math.round(a * 255).toString(16);

    if ((r as any).length == 1)
      r = "0" + r as any;
    if ((g as any).length == 1)
      g = "0" + g as any;
    if ((b as any).length == 1)
      b = "0" + b as any;
    if (a.length == 1)
      a = "0" + a;

    return "#" + r + g + b + a;
  } else {
    return "Invalid input color";
  }
}

/**
 * Convert a color
 *
 * @export
 * @param {*} name Name of color
 * @return {*}  {*} RGB Color
 */
export function nameToRGB(name: any): any {
  // create fake div
  let fakeDiv = document.createElement("div");
  fakeDiv.style.color = name;
  document.body.appendChild(fakeDiv);

  // get color of div
  let cs = window.getComputedStyle(fakeDiv),
    pv = cs.getPropertyValue("color");

  // remove div after obtaining desired color value
  document.body.removeChild(fakeDiv);

  return pv;
}

/**
 * Convert a color
 *
 * @export
 * @param {*} name Name of color
 * @return {*}  {*} HEX Color
 */
export function nameToHex(name: any): any {
  // get RGB from named color in div
  let fakeDiv = document.createElement("div");
  fakeDiv.style.color = name;
  document.body.appendChild(fakeDiv);

  let cs = window.getComputedStyle(fakeDiv),
    pv = cs.getPropertyValue("color");

  document.body.removeChild(fakeDiv);

  // code ripped from RGBToHex() (except pv is substringed)
  let rgb = pv.substr(4).split(")")[0].split(","),
    r = (+rgb[0]).toString(16),
    g = (+rgb[1]).toString(16),
    b = (+rgb[2]).toString(16);

  if (r.length == 1)
    r = "0" + r;
  if (g.length == 1)
    g = "0" + g;
  if (b.length == 1)
    b = "0" + b;

  return "#" + r + g + b;
}

/**
 * Convert a color
 *
 * @export
 * @param {*} name Name of color
 * @return {*}  {*} HSl Color
 */
export function nameToHSL(name: any): any {
  let fakeDiv = document.createElement("div");
  fakeDiv.style.color = name;
  document.body.appendChild(fakeDiv);

  let cs = window.getComputedStyle(fakeDiv),
    pv = cs.getPropertyValue("color");

  document.body.removeChild(fakeDiv);

  // code ripped from RGBToHSL() (except pv is substringed)
  // @ts-ignore
  let rgb = pv.substr(4).split(")")[0].split(","),
    // @ts-ignore
    r = rgb[0] / 255,
    // @ts-ignore
    g = rgb[1] / 255,
    // @ts-ignore
    b = rgb[2] / 255,
    cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin,
    h = 0,
    s = 0,
    l = 0;

  if (delta == 0)
    h = 0;
  else if (cmax == r)
    h = ((g - b) / delta) % 6;
  else if (cmax == g)
    h = (b - r) / delta + 2;
  else
    h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  if (h < 0)
    h += 360;

  l = (cmax + cmin) / 2;
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return "hsl(" + h + "," + s + "%," + l + "%)";
}

/**
 * Return an color with the transparence source
 * 
 * @example
 * ```typescript
 * const color = getRGBA('red', .3);
 * 
 * // color will be equals to 'rgba(255, 0, 0, 0.3)'
 * ```
 *
 * @export
 * @param {string} source
 * @param {number} [opacity=1]
 * @return {*}  {string}
 */
export function getRGBA(source: string, opacity: number = 1): string {
  let sourceHex = '#FFF';
  let withOpacity = false;
  if (/^rgb\((((((((1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5]),\s?)){2}|((((1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5])\s)){2})((1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5]))|((((([1-9]?\d(\.\d+)?)|100|(\.\d+))%,\s?){2}|((([1-9]?\d(\.\d+)?)|100|(\.\d+))%\s){2})(([1-9]?\d(\.\d+)?)|100|(\.\d+))%))\)$/i.test(source)) {
    sourceHex = RGBToHex(source);
  } else if (/^rgba\((((((((1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5]),\s?)){3})|(((([1-9]?\d(\.\d+)?)|100|(\.\d+))%,\s?){3}))|(((((1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5])\s){3})|(((([1-9]?\d(\.\d+)?)|100|(\.\d+))%\s){3}))\/\s)((0?\.\d+)|[01]|(([1-9]?\d(\.\d+)?)|100|(\.\d+))%)\)$/i.test(source)) {
    sourceHex = RGBAToHexA(source);
    withOpacity = true;
  } else if (/^#([\da-f]{3}){1,2}$/i.test(source)) {
    sourceHex = source;
  } else if (/^#([\da-f]{4}){1,2}$/i.test(source)) {
    sourceHex = source;
    withOpacity = true;
  } else if (/^hsl\(((((([12]?[1-9]?\d)|[12]0\d|(3[0-5]\d))(\.\d+)?)|(\.\d+))(deg)?|(0|0?\.\d+)turn|(([0-6](\.\d+)?)|(\.\d+))rad)((,\s?(([1-9]?\d(\.\d+)?)|100|(\.\d+))%){2}|(\s(([1-9]?\d(\.\d+)?)|100|(\.\d+))%){2})\)$/i.test(source)) {
    sourceHex = HSLToHex(source);
  } else if (/^hsla\(((((([12]?[1-9]?\d)|[12]0\d|(3[0-5]\d))(\.\d+)?)|(\.\d+))(deg)?|(0|0?\.\d+)turn|(([0-6](\.\d+)?)|(\.\d+))rad)(((,\s?(([1-9]?\d(\.\d+)?)|100|(\.\d+))%){2},\s?)|((\s(([1-9]?\d(\.\d+)?)|100|(\.\d+))%){2}\s\/\s))((0?\.\d+)|[01]|(([1-9]?\d(\.\d+)?)|100|(\.\d+))%)\)$/i.test(source)) {
    sourceHex = HSLAToHexA(source);
    withOpacity = true;
  } else {
    sourceHex = nameToHex(source);
  }
  if (sourceHex) {
    let a = Math.round(+`${opacity}` * 255).toString(16);
    if (a.length === 1) {
      a = "0" + a;
    }
    return hexAToRGBA(`${sourceHex}${a}`, false);
  }
  return '#fff';
}

/**
 * Generates a pad in the string
 *
 * @export
 * @param {string} str
 * @param {number} [len]
 * @return {*}  {*}
 * 
 * @ignore
 */
export function padZero(str: string, len?: number): any {
  len = len || 2;
  var zeros = new Array(len).join('0');
  return (zeros + str).slice(-len);
}

/**
 * Invert a hex color
 *
 * @export
 * @param {string} hex HEX color
 * @param {boolean} [bw=false] Aprimore color inversion
 * @return {*}  {string} Inverted color
 */
export function invertColor(hex: string, bw: boolean = false): string {
  if (hex.indexOf('#') === 0) {
    hex = hex.slice(1);
  }
  // convert 3-digit hex to 6-digits.
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  if (hex.length !== 6) {
    throw new Error('Invalid HEX color.');
  }
  var r = parseInt(hex.slice(0, 2), 16),
    g = parseInt(hex.slice(2, 4), 16),
    b = parseInt(hex.slice(4, 6), 16);
  if (bw) {
    // http://stackoverflow.com/a/3943023/112731
    return (r * 0.299 + g * 0.587 + b * 0.114) > 186
      ? '#000000'
      : '#FFFFFF';
  }
  // invert color components
  r = (255 - r).toString(16) as any;
  g = (255 - g).toString(16) as any;
  b = (255 - b).toString(16) as any;
  // pad each with zeros and return
  return "#" + (padZero((r as any)) as any) + (padZero((g as any)) as any) + (padZero((b as any)) as any);
}

/**
 * Simple invert HEX color
 *
 * @export
 * @param {string} hex HEX color
 * @return {*}  {string} Simple inverted color
 */
export function invertHexSimple(hex: string): string {
  return (Number(`0x1${hex}`) ^ 0xFFFFFF).toString(16).substr(1).toUpperCase()
}

/**
 * Generate a color between a range o 0 and 100
 *
 * @export
 * @param {number} [percentage=0]
 * @return {*}  {string} HEX colors
 */
export function colorScale(percentage: number = 0): string {
  const b = 0;
  let r = 0;
  let g = 0;
  if (percentage < 50) {
    r = 255;
    g = Math.round(5.1 * percentage);
  } else {
    g = 255;
    r = Math.round(510 - 5.10 * percentage);
  }
  return '#' + ('000000' + (r * 0x10000 + g * 0x100 + b * 0x1).toString(16)).slice(-6);
}
