import { task } from 'gulp';
import { buildConfig } from '../../build-config';
import { cleanTask } from '../util/task-helpers';


task('clean', cleanTask([
  buildConfig.publishDir,
  buildConfig.outputTypeDocDir,
  buildConfig.outputCompDocDir,
]));

