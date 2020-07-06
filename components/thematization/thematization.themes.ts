import { YueUiThemeConfig } from './thematization.interfaces';



/**
 * Default light build-in theme configuration
 *
 * @exports
 * @type {YueUiThemeConfig}
 */
export const DEFAULT_LIGHT_THEME: YueUiThemeConfig = {
  name: 'light',
  theme: {
    color: {
      primary: '#007bff',
      'primary-hover': '#007bff',
      secondary: '#6c757d',
      'secondary-hover': '#6c757d',
      success: '#28a745',
      'success-hover': '#28a745',
      danger: '#dc3545',
      'danger-hover': '#dc3545',
      warning: '#ffc107',
      'warning-hover': '#ffc107',
      info: '#17a2b8',
      'info-hover': '#17a2b8',
      light: '#f8f9fa',
      'light-hover': '#f8f9fa',
      dark: '#172b4d',
      'dark-hover': '#343a40',
      link: '#0052cc',
      'link-hover': '#3b73af',
      muted: '#6c757d',
      'muted-hover': '#6c757d',
      background: {
        light: '#f2f2f2',
        dark: '#232323'
      }
    },
    body: {
      background: 'var(--color-background-light)',
      color: 'var(--color-dark)',
      scrollbar: {
        thumb: {
          background: '#9c9c9c'
        },
        track: {
          background: 'rgba(0, 0, 0, 0.3)'
        }
      }
    },
    components: {
      navigation: {
        menu: {
          background: '#125E8A',
          color: '#ffffff',
          'out-shadow': 'rgba(0, 0, 0, 0.1)',
          'inner-shadow': 'rgba(0, 0, 0, 0.15)',
          hover: {
            'out-shadow': 'rgba(0, 0, 0, 0.21)'
          },
          sider: {
            background: '#EFF1ED',
            color: 'var(--color-dark)'
          }
        }
      }
    }
  }
};


/**
 * Default dark build-in theme configuration
 *
 * @exports
 * @type {YueThemeConfig}
 */
export const DEFAULT_DARK_THEME: YueUiThemeConfig = {
  name: 'dark',
  theme: {}
};
