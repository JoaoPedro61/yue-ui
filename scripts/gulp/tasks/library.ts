import { dest, series, src, task } from 'gulp';
import { join } from 'path';
import { buildConfig } from '../../build-config';
import { execNodeTask } from '../util/task-helpers';

/** Run `ng build yue-ui --prod` */
task('library:build-yue-ui', execNodeTask('@angular/cli', 'ng', ['build', 'yue-ui', '--prod']));

/** Run `ng build yue-ui` */
task('library:ivy-prebuild', execNodeTask('@angular/cli', 'ng', ['build', 'yue-ui']));

// Copies README.md file to the public directory.
task('library:copy-resources', () => {
  return src([
    join(buildConfig.projectDir, 'README.md'),
    join(buildConfig.componentsDir),
    join(`${buildConfig.componentsDir}/styles.less`)
  ]).pipe(dest(join(buildConfig.publishDir)));
});

// Copies files without ngcc to lib folder.
task('library:copy-libs', () => {
  return src([
    join(buildConfig.publishDir, '**/*')
  ]).pipe(dest(join(buildConfig.libDir)));
});

task(
  'build:library',
  series(
    'library:build-yue-ui',
    'library:copy-resources',
    'library:copy-libs'
  )
);
