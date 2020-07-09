export interface ElementDimentions {
  FULL_WIDTH: number;
  FULL_HEIGHT: number;
  WIDTH: number;
  MARGIN_RIGHT: number;
  MARGIN_LEFT: number;
  PADDING_RIGHT: number;
  PADDING_LEFT: number;
  BORDER_RIGHT: number;
  BORDER_LEFT: number;
  HEIGHT: number;
  MARGIN_TOP: number;
  MARGIN_BOTTOM: number;
  PADDING_TOP: number;
  PADDING_BOTTOM: number;
  BORDER_TOP: number;
  BORDER_BOTTOM: number;
}

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
