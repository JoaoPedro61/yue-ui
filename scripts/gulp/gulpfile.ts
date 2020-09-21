// tslint:disable:no-import-side-effect
import { series, task } from 'gulp';
import './tasks/clean';

import './tasks/generate-icons';
import './tasks/library';
import './tasks/implementation';

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
  'build:implementation',
  'build:docs'
));

task('build:library', series(
  'clean',
  'build:library',
));

task('build:implementation', series(
  'clean',
  'build:implementation',
));


task('start:dev', series(
  'clean',
  'start:implementation',
));
