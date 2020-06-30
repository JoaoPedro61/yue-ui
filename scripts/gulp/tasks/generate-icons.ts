import { task } from 'gulp';
import { buildConfig } from '../../build-config';
import { join } from 'path';

import * as chalk from 'chalk';

import * as fs from 'fs';

import * as parser from 'xml2json';

const model = (name: string, name_svg: string, svg: string): string => {
  return `
import { YueUiIcon } from './../utils/type';



export const ${name}: YueUiIcon = {
  name: \`${name_svg}\`,
  icon: \`${svg}\`
};
`;
};

const pascal = (s: string): string => s.charAt(0).toUpperCase() + s.slice(1).replace(/-[a-z]|-[0-9]/g, m => m.slice(1).toString().toUpperCase());

const getExcluding = (target: Partial<any>, exclude: string[]): Partial<any> => {
  const n: Partial<any> = {};
  for (const key in target) {
    if (target.hasOwnProperty(key)) {
      if (exclude.indexOf(key) === -1) {
        n[key] = target[key];
      }
    }
  }
  return n;
};

/*
 * Model of icon
 */
/*
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M9 13H15V17H9V13Z" fill="currentColor" fill-opacity="0.5" />
    <path d="M6 7H18V11H6V7Z" fill="currentColor" />
  </svg>
*/

task('generate:icons', (done: (arr?: string) => any) => {
  const iconsFile = join(buildConfig.projectDir, `all.svg`);
  const iconsFileDir = join(buildConfig.componentsDir, `icon/icons`);
  console.log(chalk.bgGreen.blue('Reading icons dir...'));
  fs.readdir(iconsFileDir, (err_read: any, files) => {
    if (err_read) {
      done(err_read);
      return void 0;
    }
    for (const file of files) {
      console.log(chalk.bgBlue.greenBright(`Removing file: "${join(iconsFileDir, file)}"...`));
      fs.unlink(join(iconsFileDir, file), (err_remv: any) => {
        if (err_remv) {
          done(err_remv);
          return void 0;
        }
        console.log(chalk.bgBlue.greenBright(`File removed successfully`));
      });
    }
    console.log(chalk.bgGreen.blue('Creating icons font...'));
    fs.readFile(iconsFile, { encoding: `utf-8` }, (err_read_i: any, data) => {
      if (err_read_i) {
        done(err_read_i);
        return void 0;
      }
      const parsed = JSON.parse(parser.toJson(data, { }));
      const icons = [];
      for (let i = 0, l = parsed.svg.symbol.length; i < l; i++) {
        const icon = {
          svg: {
            ...getExcluding(parsed.svg, ['symbol']),
            ...getExcluding(parsed.svg.symbol[i], ['path']),
            ...getExcluding(parsed.svg.symbol[i], ['id', 'width', 'height', 'viewBox', 'fill'])
          }
        };
        icon.svg['data-svg-css-gg-id'] = icon.svg.id;
        icon.svg.id = `yue-ui-${icon.svg.id}`;
        icon.svg['data-provide-name'] = pascal(icon.svg.id);
        icon.svg.width = `1em`;
        icon.svg.height = `1em`;
        icons.push(icon);
        console.log(chalk.bgGreen.blue(`[ICON]: Normalized icon: "${icon.svg['data-provide-name']}"`));
      }
      for (let i = 0, l = icons.length; i < l; i++) {
        console.log(chalk.bgGreen.blue(`[ICON]: Trying create icon file: "${icons[i].svg['data-provide-name']}"`));
        const icon: string = parser.toXml(icons[i]);
        const fileIconName = icons[i].svg.id;
        const iconProvideName = icons[i].svg['data-provide-name'];
        const exportIcon = `export { ${iconProvideName} } from './${fileIconName}';\n`;
        const parsedToModel = model(iconProvideName, fileIconName, icon);

        fs.writeFile(join(iconsFileDir, `${fileIconName}.ts`), parsedToModel, (file_write: any) => {
          if (file_write) {
            done(file_write);
            return void 0;
          }
          fs.appendFile(join(iconsFileDir, 'index.ts'), exportIcon, { encoding: 'utf-8' }, (err_export: any) => {
            if (err_export) {
              done(err_export);
              return void 0;
            }
            if (i === icons.length - 1) {
              done();
            }
          });
        });
      }
    });
  });
});

