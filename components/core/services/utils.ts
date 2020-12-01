import { Breakpoints } from '@angular/cdk/layout';



export enum YueUiBreakpointEnum {
  xxl = 'xxl',
  xl = 'xl',
  lg = 'lg',
  md = 'md',
  sm = 'sm',
  xs = 'xs'
}

export type BreakpointMap = { [key in YueUiBreakpointEnum]: string };

export type BreakpointBooleanMap = { [key in YueUiBreakpointEnum]: boolean };

export type YueUiBreakpointKey = keyof typeof YueUiBreakpointEnum;

export const gridResponsiveMap: BreakpointMap = {
  xs: '(max-width: 575px)',
  sm: '(min-width: 576px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 992px)',
  xl: '(min-width: 1200px)',
  xxl: '(min-width: 1600px)'
};

export const siderResponsiveMap: BreakpointMap = {
  xs: '(max-width: 479.98px)',
  sm: '(max-width: 575.98px)',
  md: '(max-width: 767.98px)',
  lg: '(max-width: 991.98px)',
  xl: '(max-width: 1199.98px)',
  xxl: '(max-width: 1599.98px)'
};

export const YUE_UI_SMALL_LAYOUT_BREAKPOINTS = [
  Breakpoints.Small,
  Breakpoints.Tablet,
  Breakpoints.XSmall
];
