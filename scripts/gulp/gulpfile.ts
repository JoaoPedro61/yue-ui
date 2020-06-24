// tslint:disable:no-import-side-effect
import { series, task } from 'gulp';
import './tasks/clean';
import './tasks/default';
import './tasks/unit-test';
import './tasks/universal';

import './tasks/submodules';
import './tasks/library';
import './tasks/site';



task('build', series(
  'clean',
  'build:library',
  'build:site'
));

task('sync:submodules', series('sync:all:git:submodules'));

task('build:library', series(
  'clean',
  'build:library',
));

task('build:site', series(
  'clean',
  'build:site',
));

task('start:dev', series(
  'clean',
  'start:site'
));

