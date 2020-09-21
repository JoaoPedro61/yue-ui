// tslint:disable:no-import-side-effect
import { series, task } from 'gulp';
import './tasks/clean';

import './tasks/generate-icons';
import './tasks/library';
import './tasks/site';

import './tasks/compodoc';
import './tasks/typedoc';


task('build:docs', series(
  'clean',
  'typedoc',
  // TODO: Enable this
  // 'compodoc',
));

task('build', series(
  'clean',
  'build:library',
  'build:site',
  'build:docs'
));

task('build:library', series(
  'clean',
  'build:library',
));

task('build:site', series(
  'clean',
  'build:site',
));

