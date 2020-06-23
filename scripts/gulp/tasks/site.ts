import * as fs from 'fs-extra';
import { task } from 'gulp';
import { join } from 'path';
import { buildConfig } from '../../build-config';
import { execNodeTask } from '../util/task-helpers';

const detectPort = require('detect-port');

const tsconfigFile = join(buildConfig.projectDir, 'doc/tsconfig.app.json');


task('site:replace-path', () => {
  let tsconfig: any = fs.readJSONSync(tsconfigFile);
  if (!tsconfig) tsconfig = {};
  if (!tsconfig.compilerOptions) tsconfig.compilerOptions = {};
  if (!tsconfig.compilerOptions.paths) tsconfig.compilerOptions.paths = {};
  tsconfig.compilerOptions.paths['yue-ui'] = ['../publish'];
  tsconfig.compilerOptions.paths['yue-ui/*'] = ['../publish/*'];
  return fs.writeJSON(tsconfigFile, tsconfig);
});

task('build:site', execNodeTask('@angular/cli', 'ng', ['build', '--project=yue-ui-doc', '--prod']));

task('start:site', done => {
  detectPort(buildConfig.siteDocPort).then((port: number) => {
    execNodeTask('@angular/cli', 'ng', ['serve', '--port', port === buildConfig.siteDocPort ? `${buildConfig.siteDocPort}` : '0'])(done);
  });
});
