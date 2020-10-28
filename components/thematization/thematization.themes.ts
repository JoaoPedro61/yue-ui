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

    background: `var(--colors-background-light)`,
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
      //     background: `var(--colors-background-light)`,
      //     color: `var(--colors-dark)`,
      //   },
      //   collapse: {
      //     background: `var(--colors-background-light)`,
      //     color: `var(--colors-dark)`,
      //   },
      //   item: {
      //     background: `var(--components-navigation-menu-sider-background)`,
      //     color: `var(--colors-dark)`,
      //     selected: {
      //       background: `var(--colors-background-light)`,
      //       color: `var(--colors-dark)`,
      //       indicator: `var(--colors-primary)`,

      //       sub: {
      //         background: `var(--colors-background-light)`,
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
      
      
      
      
      
      /**
       *  Button colors is relative
       * 
       * \\ OK
       */
      button: {
        default: {
          color: 'var(--color)',
          background: 'transparent',
          hover: {
            color: 'var(--colors-dark-hover)',
            background: 'rgba(0, 0, 0, .034)'
          },
          disabled: {
            color: 'var(--colors-muted)',
            background: 'var(--colors-transparent-dark-10)'
          }
        },
        primary: {
          color: 'var(--colors-light)',
          background: 'var(--colors-primary)',
          hover: {
            color: 'var(--colors-light-hover)',
            background: 'var(--colors-primary-hover)'
          },
          disabled: {
            color: 'var(--colors-muted)',
            background: 'var(--colors-transparent-dark-10)'
          }
        },
        secondary: {
          color: 'var(--colors-light)',
          background: 'var(--colors-secondary)',
          hover: {
            color: 'var(--colors-light-hover)',
            background: 'var(--colors-secondary-hover)'
          },
          disabled: {
            color: 'var(--colors-muted)',
            background: 'var(--colors-transparent-dark-10)'
          }
        },
        success: {
          color: 'var(--colors-light)',
          background: 'var(--colors-success)',
          hover: {
            color: 'var(--colors-light-hover)',
            background: 'var(--colors-success-hover)'
          },
          disabled: {
            color: 'var(--colors-muted)',
            background: 'var(--colors-transparent-dark-10)'
          }
        },
        error: {
          color: 'var(--colors-light)',
          background: 'var(--colors-error)',
          hover: {
            color: 'var(--colors-light-hover)',
            background: 'var(--colors-error-hover)'
          },
          disabled: {
            color: 'var(--colors-muted)',
            background: 'var(--colors-transparent-dark-10)'
          }
        },
        warning: {
          color: 'var(--colors-light)',
          background: 'var(--colors-warning)',
          hover: {
            color: 'var(--colors-light-hover)',
            background: 'var(--colors-warning-hover)'
          },
          disabled: {
            color: 'var(--colors-muted)',
            background: 'var(--colors-transparent-dark-10)'
          }
        },
        info: {
          color: 'var(--colors-light)',
          background: 'var(--colors-info)',
          hover: {
            color: 'var(--colors-light-hover)',
            background: 'var(--colors-info-hover)'
          },
          disabled: {
            color: 'var(--colors-muted)',
            background: 'var(--colors-transparent-dark-10)'
          }
        },
        light: {
          color: 'var(--color)',
          background: 'var(--colors-light)',
          hover: {
            color: 'var(--colors-dark-hover)',
            background: 'var(--colors-light-hover)'
          },
          disabled: {
            color: 'var(--colors-muted)',
            background: 'var(--colors-transparent-dark-10)'
          }
        },
        dark: {
          color: 'var(--colors-light)',
          background: 'var(--color)',
          hover: {
            color: 'var(--colors-light-hover)',
            background: 'var(--colors-dark-hover)'
          },
          disabled: {
            color: 'var(--colors-muted)',
            background: 'var(--colors-transparent-dark-10)'
          }
        },
      },

      /**
       *  HTTP colors is relative
       * 
       * \\ OK
       */
      http: {
        color: `var(--colors-primary)`
      },

      /**
       *  Tooltip colors is relative
       * 
       * \\ OK
       */
      tooltip: {
        background: `var(--colors-transparent-dark-75)`,
        color: `var(--colors-light)`
      },

      /**
      *  Popover colors is relative
      * 
      * \\ OK
      */
      popover: {
        background: `var(--colors-background-light)`,
        content: {
          color: `var(--color)`,
        },
        title: {
          color: `var(--color)`,
        }
      },

      /**
       *  Divider colors is relative
       * 
       * \\ OK
       */
      divider: {
        color: `var(--colors-transparent-dark-10)`,
      },

      /**
       *  Modal colors is relative
       * 
       * \\ OK
       */
      modal: {
        background: `var(--colors-background-light)`,
        color: `var(--color)`,
      },

      /**
       * Pagination colors is relative
       * 
       * \\ OK
       */
      pagination: {
        selected: {
          color: 'var(--colors-primary)',
          border: {
            color: 'var(--colors-primary)'
          }
        },
        color: 'var(--colors-muted)',
        border: {
          color: 'var(--components-formulary-border-color)'
        },
        hover: {
          color: 'var(--colors-primary)',
          border: {
            color: 'var(--colors-primary)'
          }
        }
      },

      /**
       * Notification colors is relative
       * 
       * \\ OK
       */
      notification: {
        background: 'var(--components-popover-background)',
        color: 'var(--components-popover-content-color)',
        shadow: {
          color: 'var(--colors-transparent-dark-20)'
        },
        success: {
          color: 'var(--colors-success)',
        },
        info: {
          color: 'var(--colors-info)',
        },
        warning: {
          color: 'var(--colors-warning)',
        },
        error: {
          color: 'var(--colors-error)',
        },
        blank: {
          color: 'var(--color)',
        },
      }
    }
  }
};

export const DEFAULT_DARK_THEME: YueUiThemeConfig = {
  name: 'dark',
  theme: {}
};
