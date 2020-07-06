import { trigger, state, style, transition, animate } from '@angular/animations';





export const ASSERT_SPACER = trigger('ASSERT_SPACER', [
  state('true', style({
    paddingTop: `{{spacer}}`,
    paddingBottom: `{{spacer}}`,
  }), { params: { spacer: `0px`, animation: `300ms ease-in-out` } }),
  state('false', style({
    paddingTop: `0px`,
    paddingBottom: `0px`,
  })),
  transition('false <=> true', [
    animate(`{{animation}}`)
  ])
]);


export const COLLAPSE_MOTION = trigger('COLLAPSE_MOTION', [
  state('true', style({
    height: '*',
  })),
  state('false', style({
    height: '0px',
    overflow: `hidden`,
  })),
  transition('false <=> true', [
    animate(`150ms ease-in-out`)
  ])
]);


export const ASSERT_HEIGHT = trigger('ASSERT_HEIGHT', [
  state('true', style({
    height: '*'
  })),
  state('false', style({
    height: '0px',
    overflow: `hidden`
  })),
  transition('false <=> true', [
    animate(`300ms ease-in-out`)
  ])
]);
