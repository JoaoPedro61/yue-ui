import { YueUiThemeConfig } from './../thematization.interfaces';

import { yueUiThemeGenerator } from './../generator';

const T = yueUiThemeGenerator('light', 'white', {
  primary: {
    name: 'indigo',
    weight: '900',
  },
  secondary: {
    name: 'gray',
    weight: '900',
  },
});



console.log(T);



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
