import { YueUiThemeConfig } from './thematization.interfaces';


export function generateDarkTransparent(): {[index: string]: string} {
  const result: any = {};
  for (let i = 0, l = 100; i <= l; i++) {
    result[`${i}`] = `rgba(0, 0, 0, ${i / 100})`;
  }
  return result;
}

export function generateLightTransparent(): {[index: string]: string} {
  const result: any = {};
  for (let i = 0, l = 100; i <= l; i++) {
    result[`${i}`] = `rgba(255, 255, 255, ${i / 100})`;
  }
  return result;
}


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
      },
      transparent: {
        dark: generateDarkTransparent(),
        light: generateLightTransparent(),
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
          background: 'var(--color-transparent-dark-30)'
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
      },
      button: {
        default: {
          color: 'var(--color-dark)',
          background: 'transparent',
          hover: {
            color: 'var(--color-dark-hover)',
            background: 'rgba(0, 0, 0, .034)'
          },
          disabled: {
            color: 'var(--color-muted)',
            background: 'var(--color-transparent-dark-10)'
          }
        },
        primary: {
          color: 'var(--color-light)',
          background: 'var(--color-primary)',
          hover: {
            color: 'var(--color-light-hover)',
            background: 'var(--color-primary-hover)'
          },
          disabled: {
            color: 'var(--color-muted)',
            background: 'var(--color-transparent-dark-10)'
          }
        },
        secondary: {
          color: 'var(--color-light)',
          background: 'var(--color-secondary)',
          hover: {
            color: 'var(--color-light-hover)',
            background: 'var(--color-secondary-hover)'
          },
          disabled: {
            color: 'var(--color-muted)',
            background: 'var(--color-transparent-dark-10)'
          }
        },
        success: {
          color: 'var(--color-light)',
          background: 'var(--color-success)',
          hover: {
            color: 'var(--color-light-hover)',
            background: 'var(--color-success-hover)'
          },
          disabled: {
            color: 'var(--color-muted)',
            background: 'var(--color-transparent-dark-10)'
          }
        },
        danger: {
          color: 'var(--color-light)',
          background: 'var(--color-danger)',
          hover: {
            color: 'var(--color-light-hover)',
            background: 'var(--color-danger-hover)'
          },
          disabled: {
            color: 'var(--color-muted)',
            background: 'var(--color-transparent-dark-10)'
          }
        },
        warning: {
          color: 'var(--color-light)',
          background: 'var(--color-warning)',
          hover: {
            color: 'var(--color-light-hover)',
            background: 'var(--color-warning-hover)'
          },
          disabled: {
            color: 'var(--color-muted)',
            background: 'var(--color-transparent-dark-10)'
          }
        },
        info: {
          color: 'var(--color-light)',
          background: 'var(--color-info)',
          hover: {
            color: 'var(--color-light-hover)',
            background: 'var(--color-info-hover)'
          },
          disabled: {
            color: 'var(--color-muted)',
            background: 'var(--color-transparent-dark-10)'
          }
        },
        light: {
          color: 'var(--color-dark)',
          background: 'var(--color-light)',
          hover: {
            color: 'var(--color-dark-hover)',
            background: 'var(--color-light-hover)'
          },
          disabled: {
            color: 'var(--color-muted)',
            background: 'var(--color-transparent-dark-10)'
          }
        },
        dark: {
          color: 'var(--color-light)',
          background: 'var(--color-dark)',
          hover: {
            color: 'var(--color-light-hover)',
            background: 'var(--color-dark-hover)'
          },
          disabled: {
            color: 'var(--color-muted)',
            background: 'var(--color-transparent-dark-10)'
          }
        },
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
      tooltip: {
        background: `var(--color-transparent-dark-75)`,
        color: `var(--color-light)`
      },
      popover: {
        background: `var(--color-background-light)`,
        content: {
          color: `var(--color-dark)`,
        },
        title: {
          color: `var(--color-dark)`,
        }
      },
      formulary: {
        label: {
          color: `#5e6c84`,
          invalid: {
            color: `#c62828`,
          },
        },
        descriptor: {
          description: {
            color: `rgb(94 108 132 / 65%)`,
            invalid: {
              color: `var(--components-formulary-label-invalid-color)`
            }
          },
        },

        input: {
          color: '#172b4d',
          background: '#f4f5f7',
          border: {
            color: '#dfe1e6',
          },
          focus: {
            border: {
              color: '#4c9aff',
            },
            background: '#fff',
          },
          hover: {
            background: '#ebecf0',
          },
          switch: {
            active: {
              background: 'var(--components-formulary-input-focus-border-color)',
              'handler-background': 'var(--components-formulary-input-focus-border-color)',
            },
            unactive: {
              'handler-background': '#ff5722',
            },
            indeterminate: {
              handler: {
                'dot-background': '#ccc',
                background: 'blue',
              },
            },
          },
          select: {
            popup: {
              background: '#fff',
              color: 'var(--color-dark)',
              'shadow-color': 'rgba(0, 0, 0, 0.3)',
            },
            option: {
              hover: {
                'background-color': 'rgba(0, 0, 0, 0.03)',
                color: '#2f2f2f',
              }
            }
          },
        },
      },
      modal: {
        background: `var(--color-background-light)`,
        color: `var(--color-dark)`,
        divider: `var(--color-transparent-dark-10)`
      },
      menu: {
        dropdown: {
          background: `var(--color-background-light)`,
          color: `var(--color-dark)`,
        },
        collapse: {
          background: `var(--color-background-light)`,
          color: `var(--color-dark)`,
        },
        item: {
          background: `var(--color-background-light)`,
          color: `var(--color-dark)`,
          selected: {
            background: `var(--color-background-light)`,
            color: `var(--color-dark)`,
            indicator: `red`,
          },
          disabled: {
            background: `var(--color-transparent-dark-4)`,
            color: `var(--color-muted)`,
          },
          hover: {
            background: `var(--color-transparent-dark-5)`,
            color: `var(--color-dark)`,
          }
        },
      }
    }
  }
};

export const DEFAULT_DARK_THEME: YueUiThemeConfig = {
  name: 'dark',
  theme: {}
};
