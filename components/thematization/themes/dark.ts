import { YueUiThemeConfig } from './../thematization.interfaces';
import { yueUiThemeGenerator } from '../generator';



export const DARK_THEME: YueUiThemeConfig = yueUiThemeGenerator('dark', 'black', {
  primary: {
    name: 'indigo',
    weight: '900',
  },
  secondary: {
    name: 'deep-orange',
    weight: '900',
  }
});
