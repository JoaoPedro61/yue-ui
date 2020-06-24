import { task } from 'gulp';
import { buildConfig } from '../../build-config';
import { cleanTask } from '../util/task-helpers';

task('clean', cleanTask([buildConfig.outputDir, buildConfig.publishDir, buildConfig.libDir, buildConfig.publishDocDir]));

