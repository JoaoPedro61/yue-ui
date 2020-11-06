import { YueUiThemeConfig } from './../thematization.interfaces';

import { yueUiThemeGenerator } from './../generator';



export const LIGHT_THEME: YueUiThemeConfig = yueUiThemeGenerator('light', 'white', {
  primary: {
    name: 'pink',
    weight: '900',
  },
  secondary: {
    name: 'gray',
    weight: '900',
  },
});
