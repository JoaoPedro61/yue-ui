import { YueUiThemeConfig } from './thematization.interfaces';
import { generateDarkTransparent, generateLightTransparent } from './transparent';





export const DEFAULT_LIGHT_THEME: YueUiThemeConfig = {
  name: 'light',
  theme: {
    colors: {
      primary: '#007bff',
      'primary-hover': '#007bff',

      secondary: '#6c757d',
      'secondary-hover': '#6c757d',

      success: '#28a745',
      'success-hover': '#28a745',

      error: '#dc3545',
      'error-hover': '#dc3545',

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
      },

      transparent: {
        dark: generateDarkTransparent(),
        light: generateLightTransparent(),
      }
    },

    transparent: {
      dark: generateDarkTransparent(),
      light: generateLightTransparent(),
    },

    background: `var(--color-background)`,
    color: `var(--colors-dark)`,

    body: {
      background: 'var(--background)',
      color: 'var(--color)',
      scrollbar: {
        thumb: {
          background: '#9c9c9c'
        },
        track: {
          background: 'var(--colors-transparent-dark-30)'
        }
      }
    },
    components: {
      navigation: {
        menu: {
          background: '#125E8A',
          color: '#ffffff',
          'out-shadow': 'var(--colors-transparent-dark-10)',
          'inner-shadow': 'var(--colors-transparent-dark-15)',
          hover: {
            'out-shadow': 'var(--colors-transparent-dark-21)'
          },
          sider: {
            background: 'var(--background)',
            color: 'var(--color)'
          }
        }
      },
      collapse: {
        hover: {
          header: {
            background: 'rgba(0, 0, 0, .02)',
            color: 'rgba(0, 0, 0, .7)'
          }
        },
        diasbled: {
          content: {
            color: 'pink',
            background: '#DDD',
          },
          header: {
            background: 'blue',
            color: 'pink',
          }
        },
        opened: {
          content: {
            color: 'pink',
            background: 'purple',
          },
          header: {
            background: 'red',
            color: 'pink',
          }
        }
      },



      formulary: {
        descriptor: {
          description: {
            color: `rgb(94 108 132 / 65%)`,
            invalid: {
              color: `var(--components-formulary-label-invalid-color)`
            }
          },
        },

        active: `#007bff`,
        unactive: `#6c757d`,
        indeterminate: `rgba(0, 0, 0, 0.2)`,
        contrast: '#ffffff',

        color: `#172b4d`,
        background: `#f4f5f7`,
        placeholder: `rgba(14, 14, 14, .38)`,
        border: {
          color: `#dfe1e6`,
        },
        label: {
          color: `#172b4d`,
        },
        invalid: {
          color: `#172b4d`,
          background: `rgb(255, 0, 0, .07)`,
          border: {
            color: `#c62828`,
          },
          label: {
            color: `#e91e63`,
          },
        },
        focus: {
          color: `#172b4d`,
          background: `#ffffff`,
          border: {
            color: `#4c9aff`,
          },
        },
        disabled: {
          color: `#172b4d`,
          background: `#ebecf0`,
          border: {
            color: `#dfe1e6`,
          },
        },
        hover: {
          color: `#172b4d`,
          background: `#ebecf0`,
          border: {
            color: `#dfe1e6`,
          },
        },
      },



      

      // menu: {
      //   dropdown: {
      //     background: `var(--color-background)`,
      //     color: `var(--colors-dark)`,
      //   },
      //   collapse: {
      //     background: `var(--color-background)`,
      //     color: `var(--colors-dark)`,
      //   },
      //   item: {
      //     background: `var(--components-navigation-menu-sider-background)`,
      //     color: `var(--colors-dark)`,
      //     selected: {
      //       background: `var(--color-background)`,
      //       color: `var(--colors-dark)`,
      //       indicator: `var(--colors-primary)`,

      //       sub: {
      //         background: `var(--color-background)`,
      //         color: `var(--colors-dark)`,
      //         indicator: `var(--colors-primary)`,
      //       }
      //     },
      //     disabled: {
      //       background: `var(--colors-transparent-dark-4)`,
      //       color: `var(--colors-muted)`,
      //     },
      //     hover: {
      //       background: `var(--colors-transparent-dark-5)`,
      //       color: `var(--colors-dark)`,
      //     }
      //   },
      //   divider: {
      //     color: `var(--colors-muted)`,
      //   }
      // },

    }
  }
};

export const DEFAULT_DARK_THEME: YueUiThemeConfig = {
  name: 'dark',
  theme: {}
};
