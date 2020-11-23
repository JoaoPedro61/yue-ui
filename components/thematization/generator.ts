import { getContrastYIQ, getRGBA } from '@joaopedro61/yue-ui/core/utils';

import { YueUiThemeConfig } from './thematization.interfaces'

import { COLOR_PALETTE } from './palette';
import { generateDarkTransparent, generateLightTransparent } from './transparent';


export function yueUiThemeGetPaletteColor(name: string, weight: string): string {
  if (name in COLOR_PALETTE) {
    const palette = (COLOR_PALETTE as any)[name];
    if (weight in palette) {
      return (COLOR_PALETTE as any)[name][weight];
    }
    return palette[Object.keys(palette).pop() || ''] || '#000000';
  }
  return '#000000';
}

export function yueUiThemeGetMinimalHoverableDifference(name: string, weight: string): string {
  let isAboveOn900 = /^A/gm.test(weight);
  let nextWeight = '50';
  if (isAboveOn900) {
    let int = +weight.replace('A', '');
    int *= 2;
    if (int > 700) {
      int = 700;
    }
    nextWeight = `A${int}`;
  } else {
    let int = +weight.replace('A', '');
    if (int === 900) {
      int = 700;
      nextWeight = `A${int}`;
    } else {
      if (int > 50) {
        int += 100;
        nextWeight = `${int}`;
      } else {
        int += int;
        nextWeight = `${int}`;
      }
    }
  }
  return yueUiThemeGetPaletteColor(name, nextWeight);
}

export function yueUiThemeGetContrastantColor(name: string, weight?: string): string {
  if (weight) {
    const color = yueUiThemeGetPaletteColor(name, weight);
    return getContrastYIQ(color);
  } else {
    return getContrastYIQ(name);
  }
}

export function yueUiThemeGenerateBoxShadow(v1: string, v2: string, v3: string, variant: 'white' | 'black' = 'black'): string {
  return `0 3px 6px -4px var(--transparent-${variant}-${v1}), 0 6px 16px 0 var(--transparent-${variant}-${v2}), 0 9px 28px 8px var(--transparent-${variant}-${v3});`;
}



export function yueUiThemeGenerator(
  name: string,
  variant: 'white' | 'black',
  colors: {
    primary: {
      name: string;
      weight: string;
    },
    secondary: {
      name: string;
      weight: string;
    },
  }
): YueUiThemeConfig {

  const INVERSE_VARIANT = variant === 'white' ? 'black' : 'white';

  const BASE_SHADOW: string = yueUiThemeGenerateBoxShadow('48', '32', '5');


  return {
    name,
    theme: {

      palette: {
        ...COLOR_PALETTE,
      },

      color: variant === 'white' ? COLOR_PALETTE.black : COLOR_PALETTE.white,
      background: variant === 'white' ? COLOR_PALETTE.white : COLOR_PALETTE.gray[900],

      'transparent-black': generateDarkTransparent(),

      'transparent-white': generateLightTransparent(),

      primary: yueUiThemeGetPaletteColor(colors.primary.name, colors.primary.weight),
      'primary-hover': yueUiThemeGetMinimalHoverableDifference(colors.primary.name, colors.primary.weight),

      secondary: yueUiThemeGetPaletteColor(colors.secondary.name, colors.secondary.weight),
      'secondary-hover': yueUiThemeGetMinimalHoverableDifference(colors.secondary.name, colors.secondary.weight),

      success: COLOR_PALETTE.green['700'],
      'success-hover': COLOR_PALETTE.green['800'],

      error: COLOR_PALETTE.red['800'],
      'error-hover': COLOR_PALETTE.red['900'],

      warning: COLOR_PALETTE.yellow['800'],
      'warning-hover': COLOR_PALETTE.yellow['900'],

      info: COLOR_PALETTE['light-blue']['800'],
      'info-hover': COLOR_PALETTE['light-blue']['900'],

      light: COLOR_PALETTE.gray['100'],
      'light-hover': COLOR_PALETTE.gray['200'],

      dark: COLOR_PALETTE.gray['800'],
      'dark-hover': COLOR_PALETTE.gray['900'],

      link: COLOR_PALETTE.blue['500'],
      'link-hover': COLOR_PALETTE.blue['600'],

      muted: getRGBA(variant === 'white' ? COLOR_PALETTE.black : COLOR_PALETTE.white, variant === 'white' ? .7 : .32),
      'muted-hover': getRGBA(variant === 'white' ? COLOR_PALETTE.black : COLOR_PALETTE.white, .5),

      'scrollbar-thumb': {
        background: COLOR_PALETTE['blue-gray'][variant === 'white' ? '50' : '900'],
        border: COLOR_PALETTE.gray[variant === 'white' ? '300' : '900'],
      },
      'scrollbar-track-background': COLOR_PALETTE.gray[variant === 'white' ? '300' : '900'],

      divider: getRGBA(variant === 'white' ? COLOR_PALETTE.black : COLOR_PALETTE.white, .14),

      backdrop: getRGBA(COLOR_PALETTE.black, .31),

      /**
       * This is a scheme to stylize the yueUi components
       */
      components: {

        card: {
          background: `var(--background)`,
          color: `var(--color)`,
          divider: `var(--divider)`,

          hover: {
            'box-shadow': BASE_SHADOW,
          }
        },

        menu: {
          
          ink: `var(--primary)`,
          divider: `var(--divider)`,

          color: 'inherit',
          background: `transparent`,

          group: {
            color: 'var(--muted)',
            background: `transparent`,
          },

          selected: {
            color: 'var(--primary)',
            background: getRGBA(yueUiThemeGetPaletteColor(colors.primary.name, colors.primary.weight), .05),
          },
          disabled: {
            color: 'var(--muted)',
            background: `transparent`,
          },
          hover: {
            color: 'var(--primary)',
            background: `transparent`,
          }
        },

        table: {
          header: {
            background: `var(--transparent-${INVERSE_VARIANT}-3)`,
            color: COLOR_PALETTE['blue-gray'][variant === 'white' ? '900' : '50'],

            sortable: {
              hover: {
                background: `var(--transparent-${INVERSE_VARIANT}-6)`,
                color: COLOR_PALETTE['blue-gray'][variant === 'white' ? '900' : '50'],
              },
              active: `var(--primary)`,
              unactive: variant === `white` ? `${COLOR_PALETTE.gray[400]}` : `${COLOR_PALETTE.gray[700]}`
            }
          },
          row: {
            background: `var(--transparent-${INVERSE_VARIANT}-1)`,
            color: COLOR_PALETTE['blue-gray'][variant === 'white' ? '900' : '50'],
            hover: {
              background: `var(--transparent-${INVERSE_VARIANT}-3)`,
              color: COLOR_PALETTE['blue-gray'][variant === 'white' ? '900' : '50'],
            }
          }
        },

        formulary: {
          descriptor: {
            description: {
              color: `var(--muted)`,
              invalid: {
                color: `var(--error)`
              }
            },
          },

          active: `var(--primary)`,

          unactive: variant === `white` ? `${COLOR_PALETTE[`blue-gray`][400]}` : `${COLOR_PALETTE[`blue-gray`][700]}`,
          indeterminate: variant === `white` ? `${COLOR_PALETTE.gray[400]}` : `${COLOR_PALETTE.gray[700]}`,
          contrast: yueUiThemeGetContrastantColor(colors.primary.name, colors.primary.weight),

          color: `var(--color)`,
          background: `${COLOR_PALETTE.gray[variant === `black` ? 900 : 50]}`,
          placeholder: `var(--muted)`,
          border: {
            color: `${COLOR_PALETTE['blue-gray'][variant === `black` ? 900 : 200]}`,
          },
          label: {
            color: `${variant === `black` ? COLOR_PALETTE.gray[200] : COLOR_PALETTE.gray[900]}`,
          },
          invalid: {
            color: yueUiThemeGetContrastantColor(`red`, `800`),
            background: getRGBA(COLOR_PALETTE.red['800'], .07),
            border: {
              color: `var(--error)`,
            },
            label: {
              color: `var(--error)`,
            },
          },
          focus: {
            color: getContrastYIQ(`${variant === `black` ? COLOR_PALETTE.black : COLOR_PALETTE.white}`),
            background: `${variant === `black` ? getRGBA(COLOR_PALETTE.black, .06) : COLOR_PALETTE.white}`,
            border: {
              color: `var(--primary)`,
            },
          },
          disabled: {
            color: getRGBA(getContrastYIQ(`${variant === `white` ? COLOR_PALETTE.white : COLOR_PALETTE.black}`), .5),
            background: `${variant === `black` ? getRGBA(COLOR_PALETTE.black, .1) : COLOR_PALETTE.white}`,
            border: {
              color: `${variant === `black` ? COLOR_PALETTE.gray[800] : COLOR_PALETTE.gray[300]}`,
            },
          },
          hover: {
            color: getRGBA(getContrastYIQ(`${variant === `white` ? COLOR_PALETTE.white : COLOR_PALETTE.black}`), .5),
            background: `${variant === `black` ? getRGBA(COLOR_PALETTE.black, .1) : COLOR_PALETTE.white}`,
            border: {
              color: `${variant === `black` ? COLOR_PALETTE.gray[800] : COLOR_PALETTE.gray[300]}`,
            },
          },
        },

        navigation: {
          menu: {
            background: yueUiThemeGetPaletteColor(colors.primary.name, colors.primary.weight),
            color: yueUiThemeGetContrastantColor(colors.primary.name, colors.primary.weight),
            'out-shadow': `0px 0px 5px var(--transparent-black-20)`,
            'inner-shadow': `-2px 0 5px var(--transparent-black-15)`,
            hover: {
              'out-shadow': `0px 0px 15px var(--transparent-black-30)`,
            },
            sider: {
              background: 'var(--background)',
              color: 'var(--color)'
            }
          }
        },

        button: {
          default: {
            color: 'var(--color)',
            background: 'transparent',
            hover: {
              color: variant === 'white' ? 'var(--dark-hover)' : 'var(--light-hover)',
              background: `var(--transparent-${INVERSE_VARIANT}-10)`
            },
            disabled: {
              color: 'var(--muted)',
              background: `var(--transparent-${INVERSE_VARIANT}-10)`
            }
          },
          primary: {
            color: 'var(--light)',
            background: 'var(--primary)',
            hover: {
              color: 'var(--light-hover)',
              background: 'var(--primary-hover)'
            },
            disabled: {
              color: 'var(--muted)',
              background: `var(--transparent-${INVERSE_VARIANT}-10)`
            }
          },
          secondary: {
            color: 'var(--light)',
            background: 'var(--secondary)',
            hover: {
              color: 'var(--light-hover)',
              background: 'var(--secondary-hover)'
            },
            disabled: {
              color: 'var(--muted)',
              background: `var(--transparent-${INVERSE_VARIANT}-10)`
            }
          },
          success: {
            color: 'var(--light)',
            background: 'var(--success)',
            hover: {
              color: 'var(--light-hover)',
              background: 'var(--success-hover)'
            },
            disabled: {
              color: 'var(--muted)',
              background: `var(--transparent-${INVERSE_VARIANT}-10)`
            }
          },
          error: {
            color: 'var(--light)',
            background: 'var(--error)',
            hover: {
              color: 'var(--light-hover)',
              background: 'var(--error-hover)'
            },
            disabled: {
              color: 'var(--muted)',
              background: `var(--transparent-${INVERSE_VARIANT}-10)`
            }
          },
          danger: {
            color: 'var(--light)',
            background: 'var(--error)',
            hover: {
              color: 'var(--light-hover)',
              background: 'var(--error-hover)'
            },
            disabled: {
              color: 'var(--muted)',
              background: `var(--transparent-${INVERSE_VARIANT}-10)`
            }
          },
          warning: {
            color: 'var(--light)',
            background: 'var(--warning)',
            hover: {
              color: 'var(--light-hover)',
              background: 'var(--warning-hover)'
            },
            disabled: {
              color: 'var(--muted)',
              background: `var(--transparent-${INVERSE_VARIANT}-10)`
            }
          },
          info: {
            color: 'var(--light)',
            background: 'var(--info)',
            hover: {
              color: 'var(--light-hover)',
              background: 'var(--info-hover)'
            },
            disabled: {
              color: 'var(--muted)',
              background: `var(--transparent-${INVERSE_VARIANT}-10)`
            }
          },
          light: {
            color: 'var(--color)',
            background: 'var(--light)',
            hover: {
              color: 'var(--dark-hover)',
              background: 'var(--light-hover)'
            },
            disabled: {
              color: 'var(--muted)',
              background: `var(--transparent-${INVERSE_VARIANT}-10)`
            }
          },
          dark: {
            color: 'var(--light)',
            background: 'var(--color)',
            hover: {
              color: 'var(--light-hover)',
              background: 'var(--dark-hover)'
            },
            disabled: {
              color: 'var(--muted)',
              background: `var(--transparent-${INVERSE_VARIANT}-10)`
            }
          },
        },

        collapse: {
          hover: {
            header: {
              background: `var(--transparent-${INVERSE_VARIANT}-1)`,
            }
          },
          diasbled: {
            content: {
              background: `var(--transparent-${INVERSE_VARIANT}-1)`,
              color: 'var(--muted)',
            },
            header: {
              background: `var(--transparent-${INVERSE_VARIANT}-1)`,
              color: 'var(--muted)',
            }
          },
          opened: {
            content: {
              background: `var(--transparent-${INVERSE_VARIANT}-1)`,
            },
            header: {
              background: `var(--transparent-${INVERSE_VARIANT}-3)`,
            }
          }
        },

        http: {
          color: `var(--primary)`
        },

        tooltip: {
          background: `var(--transparent-black-75)`,
          color: `var(--light)`,
          shadow: BASE_SHADOW,
        },

        pagination: {
          selected: {
            color: 'var(--primary)',
            border: {
              color: 'var(--primary)'
            }
          },
          color: 'var(--muted)',
          border: {
            color: 'var(--muted)'
          },
          hover: {
            color: 'var(--primary)',
            border: {
              color: 'var(--primary)'
            }
          }
        },

        modal: {
          background: `var(--background)`,
          color: `var(--color)`,
          shadow: BASE_SHADOW,
        },

        popover: {
          background: `var(--background)`,
          shadow: BASE_SHADOW,
          content: {
            color: `var(--color)`,
          },
          title: {
            color: `var(--color)`,
          }
        },

        notification: {
          background: 'var(--components-popover-background)',
          color: 'var(--components-popover-content-color)',
          shadow: `var(--components-popover-shadow)`,
          success: {
            color: 'var(--success)',
          },
          info: {
            color: 'var(--info)',
          },
          warning: {
            color: 'var(--warning)',
          },
          error: {
            color: 'var(--error)',
          },
          blank: {
            color: 'var(--color)',
          },
        }
      }
    }
  };

}
