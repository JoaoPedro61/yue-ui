/**
 * Properties available in the elementDimentions function return
 *
 * @export
 * @interface ElementDimentions
 */
export interface ElementDimentions {

  /**
   * Full with with all margins and all paddings and ther border widths
   *
   * @type {number}
   * @memberof ElementDimentions
   */
  FULL_WIDTH: number;

  /**
   * Full with height all margins and all paddings and ther border widths
   *
   * @type {number}
   * @memberof ElementDimentions
   */
  FULL_HEIGHT: number;

  /**
   * Just only with without margins and paddings
   *
   * @type {number}
   * @memberof ElementDimentions
   */
  WIDTH: number;

  /**
   * Margin right
   *
   * @type {number}
   * @memberof ElementDimentions
   */
  MARGIN_RIGHT: number;

  /**
   * Margin left
   *
   * @type {number}
   * @memberof ElementDimentions
   */
  MARGIN_LEFT: number;

  /**
   * Padding right
   *
   * @type {number}
   * @memberof ElementDimentions
   */
  PADDING_RIGHT: number;

  /**
   * Padding left
   *
   * @type {number}
   * @memberof ElementDimentions
   */
  PADDING_LEFT: number;

  /**
   * Border right width
   *
   * @type {number}
   * @memberof ElementDimentions
   */
  BORDER_RIGHT: number;

  /**
   * Border left width
   *
   * @type {number}
   * @memberof ElementDimentions
   */
  BORDER_LEFT: number;

  /**
   * Just only height
   *
   * @type {number}
   * @memberof ElementDimentions
   */
  HEIGHT: number;

  /**
   * Margin top
   *
   * @type {number}
   * @memberof ElementDimentions
   */
  MARGIN_TOP: number;

  /**
   * Margin bottom
   *
   * @type {number}
   * @memberof ElementDimentions
   */
  MARGIN_BOTTOM: number;

  /**
   * Padding top
   *
   * @type {number}
   * @memberof ElementDimentions
   */
  PADDING_TOP: number;

  /**
   * Padding bottom
   *
   * @type {number}
   * @memberof ElementDimentions
   */
  PADDING_BOTTOM: number;

  /**
   * Border top width
   *
   * @type {number}
   * @memberof ElementDimentions
   */
  BORDER_TOP: number;

  /**
   * Border bottom width
   *
   * @type {number}
   * @memberof ElementDimentions
   */
  BORDER_BOTTOM: number;
}

/**
 * Get the dimentions of an HTML element including the paddings and margins
 *
 * @export
 * @param {HTMLElement} element Element target
 * @returns {ElementDimentions}
 */
export function elementDimentions(element: HTMLElement): ElementDimentions {
  const STYLE = (element as any).currentStyle || window.getComputedStyle(element);

  const WIDTH = element.offsetWidth;

  const MARGIN_RIGHT = parseFloat(STYLE.marginRight);
  const MARGIN_LEFT = parseFloat(STYLE.marginLeft);
  const PADDING_RIGHT = parseFloat(STYLE.paddingRight);
  const PADDING_LEFT = parseFloat(STYLE.paddingLeft);
  const BORDER_RIGHT = parseFloat(STYLE.borderRightWidth);
  const BORDER_LEFT = parseFloat(STYLE.borderLeftWidth);

  const HEIGHT = element.offsetHeight;

  const MARGIN_TOP = parseFloat(STYLE.marginTop);
  const MARGIN_BOTTOM = parseFloat(STYLE.marginBottom);
  const PADDING_TOP = parseFloat(STYLE.paddingTop);
  const PADDING_BOTTOM = parseFloat(STYLE.paddingBottom);
  const BORDER_TOP = parseFloat(STYLE.borderTopWidth);
  const BORDER_BOTTOM = parseFloat(STYLE.borderBottomWidth);

  const FULL_WIDTH = WIDTH + MARGIN_RIGHT + MARGIN_LEFT + PADDING_RIGHT + PADDING_LEFT + BORDER_RIGHT + BORDER_LEFT;

  const FULL_HEIGHT = HEIGHT + MARGIN_TOP + MARGIN_BOTTOM + PADDING_TOP + PADDING_BOTTOM + BORDER_TOP + BORDER_BOTTOM;

  return {
    FULL_WIDTH,
    FULL_HEIGHT,
    WIDTH,
    MARGIN_RIGHT,
    MARGIN_LEFT,
    PADDING_RIGHT,
    PADDING_LEFT,
    BORDER_RIGHT,
    BORDER_LEFT,
    HEIGHT,
    MARGIN_TOP,
    MARGIN_BOTTOM,
    PADDING_TOP,
    PADDING_BOTTOM,
    BORDER_TOP,
    BORDER_BOTTOM,
  };

}
