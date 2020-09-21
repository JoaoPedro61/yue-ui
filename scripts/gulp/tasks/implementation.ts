import * as fs from 'fs-extra';
import { task } from 'gulp';
import { join } from 'path';
import { buildConfig } from '../../build-config';
import { execNodeTask } from '../util/task-helpers';

const detectPort = require('detect-port');

const tsconfigFile = join(buildConfig.projectDir, 'implementation/tsconfig.app.json');


task('implementation:replace-path', () => {
  let tsconfig: any = fs.readJSONSync(tsconfigFile);
  if (!tsconfig) {
    tsconfig = {};
  }
  if (!tsconfig.compilerOptions) {
    tsconfig.compilerOptions = {};
  }
  if (!tsconfig.compilerOptions.paths) {
    tsconfig.compilerOptions.paths = {};
  }
  tsconfig.compilerOptions.paths['@joaopedro61/yue-ui'] = ['../publish'];
  tsconfig.compilerOptions.paths['@joaopedro61/yue-ui/*'] = ['../publish/*'];
  return fs.writeJSON(tsconfigFile, tsconfig);
});

task('implementation:dev:replace-path', () => {
  let tsconfig: any = fs.readJSONSync(tsconfigFile);
  if (!tsconfig) {
    tsconfig = {};
  }
  if (!tsconfig.compilerOptions) {
    tsconfig.compilerOptions = {};
  }
  if (!tsconfig.compilerOptions.paths) {
    tsconfig.compilerOptions.paths = {};
  }
  tsconfig.compilerOptions.paths['@joaopedro61/yue-ui'] = ['../components'];
  tsconfig.compilerOptions.paths['@joaopedro61/yue-ui/*'] = ['../components/*'];
  return fs.writeJSON(tsconfigFile, tsconfig);
});

task('build:implementation', execNodeTask('@angular/cli', 'ng', ['build', '--project=implementation', '--prod']));

task('start:implementation', done => {
  detectPort(buildConfig.implementationPort).then((port: number) => {
    execNodeTask('@angular/cli', 'ng', ['serve', '--host', '0.0.0.0' ,'--port', port === buildConfig.implementationPort ? `${buildConfig.implementationPort}` : '0'])(done);
  });
});
