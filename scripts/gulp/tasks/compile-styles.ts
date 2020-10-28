import * as fs from 'fs-extra';
import * as less from 'less';
import * as path from 'path';
import { buildConfig } from '../../build-config';

const LessPluginCleanCSS = require('less-plugin-clean-css');
const NpmImportPlugin = require('less-plugin-npm-import');

async function compileLess(content: string, savePath: string, min: boolean, sub?: boolean, rootPath?: string): Promise<void> {
  // tslint:disable-next-line:no-any
  const plugins: any[] = [];
  const lessOptions: Less.Options = { plugins: plugins, javascriptEnabled: true };

  if (min) {
    plugins.push(new LessPluginCleanCSS({ advanced: true }));
  }

  if (sub) {
    lessOptions.paths = [path.dirname(rootPath as string)];
    lessOptions.filename = rootPath;
    plugins.push(
      new NpmImportPlugin({
        prefix: '~'
      })
    );
  }

  return less
    .render(content, lessOptions)
    .then(({ css }) => {
      return fs.writeFile(savePath, css);
    })
    .catch(err => Promise.reject(err));
}

const sourcePath = buildConfig.componentsDir;
const targetPath = buildConfig.publishDir;

export async function compile(): Promise<void | void[]> {
  const componentFolders = fs.readdirSync(targetPath);
  const promiseList = [];

  for (const dir of componentFolders) {
    if (await fs.pathExists(`${sourcePath}/${dir}/styles/index.less`)) {
      await fs.copy(`${sourcePath}/${dir}/styles`, `${targetPath}/${dir}/styles`);

      const buildFilePath = `${sourcePath}/${dir}/styles/index.less`;
      const componentLess = await fs.readFile(buildFilePath, { encoding: 'utf8' });
      if (await fs.pathExists(buildFilePath)) {
        promiseList.push(compileLess(componentLess, path.join(targetPath, dir, 'styles', `index.css`), false, true, buildFilePath));
        promiseList.push(compileLess(componentLess, path.join(targetPath, dir, 'styles', `index.min.css`), true, true, buildFilePath));
      }
    }
  }

  await fs.copy(path.resolve(sourcePath, 'styles'), path.resolve(targetPath, 'styles'));
  await fs.writeFile(`${targetPath}/components.less`, await fs.readFile(`${sourcePath}/components.less`));
  await fs.writeFile(`${targetPath}/yue-ui.less`, await fs.readFile(`${sourcePath}/yue-ui.less`));

  const lessContent = `@import "${path.posix.join(targetPath, 'yue-ui.less')}";`;
  promiseList.push(compileLess(lessContent, path.join(targetPath, 'yue-ui.css'), false));
  promiseList.push(compileLess(lessContent, path.join(targetPath, 'yue-ui.min.css'), true));

  const cssIndexPath = path.join(sourcePath, 'styles', 'index.less');
  const cssIndex = await fs.readFile(cssIndexPath, { encoding: 'utf8' });
  promiseList.push(compileLess(cssIndex, path.join(targetPath, 'styles', 'index.css'), false, true, cssIndexPath));
  promiseList.push(compileLess(cssIndex, path.join(targetPath, 'styles', 'index.min.css'), true, true, cssIndexPath));
  return Promise.all(promiseList).catch(e => console.log(e));
}
