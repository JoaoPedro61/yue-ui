import * as fs from 'fs-extra';
import { parallel, series, task } from 'gulp';
import { join } from 'path';
import { buildConfig } from '../../build-config';
import { execNodeTask } from '../util/task-helpers';

const detectPort = require('detect-port');

const tsconfigFile = join(buildConfig.projectDir, 'doc/tsconfig.app.json');

const CI = process.env.CI;

task('serve:site', done => {
  detectPort(buildConfig.siteDocPort).then((port: number) => {
    execNodeTask('@angular/cli', 'ng', ['serve', '--port', port === buildConfig.siteDocPort ? `${buildConfig.siteDocPort}` : '0'])(done);
  });
});

task('build:site-doc', execNodeTask('@angular/cli', 'ng', ['build', '--project=yue-ui-doc', '--prod', CI ? '--configuration=pre-production' : '']));

task('site:replace-path', () => {
  let tsconfig: any = fs.readJSONSync(tsconfigFile);
  if (!tsconfig) tsconfig = {};
  if (!tsconfig.compilerOptions) tsconfig.compilerOptions = {};
  if (!tsconfig.compilerOptions.paths) tsconfig.compilerOptions.paths = {};
  tsconfig.compilerOptions.paths['yue-ui'] = ['../publish'];
  tsconfig.compilerOptions.paths['yue-ui/*'] = ['../publish/*'];
  return fs.writeJSON(tsconfigFile, tsconfig);
});

task('build:site', series('build:site-doc'));

task('start:site', series(parallel('serve:site')));

task('build:release-site', series('site:replace-path', 'build:site'));
