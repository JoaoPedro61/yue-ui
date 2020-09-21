import { task } from 'gulp';
// import { join } from 'path';
import { buildConfig } from '../../build-config';
import { execNodeTask } from '../util/task-helpers';


task('compodoc', execNodeTask('@compodoc/compodoc', 'compodoc', [
  `-p=${'../components/tsconfig.json'}`,
  `-n=${buildConfig.name}`,
  `-d=${buildConfig.outputCompDocDir}`
]));
