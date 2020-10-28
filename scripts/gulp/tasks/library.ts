import { dest, series, src, task } from 'gulp';
import * as path from 'path';
import { buildConfig } from '../../build-config';
import { execNodeTask } from '../util/task-helpers';
import * as fs from 'fs-extra';
import { compile as compileLess } from './compile-styles';


const chalk = require('chalk');

const sourcePath = buildConfig.publishDir;
const targetPath = path.join(buildConfig.publishDir, `src`);


task('bump:version', (done: any) => {
  const packageJsonPath = path.join(buildConfig.componentsDir, 'package.json');
  const packageJson = fs.readJsonSync(packageJsonPath);
  const versionPath = path.join(buildConfig.componentsDir, 'version', 'version.ts');
  const absVersionPath = path.join(buildConfig.projectDir, 'version');
  const absVersion = fs.readFileSync(absVersionPath, 'utf-8');
  const absGitVersionPath = path.join(buildConfig.projectDir, 'git-version-workflow');
  const absGitVersion = fs.readFileSync(absGitVersionPath, 'utf-8');
  const version = packageJson.version;

  if (absGitVersion === version) {
    done(chalk.red('[VERSION]: Old versions are equal to new version. Please change the new version.'));
  } else {
    if (absVersion.length) {
      if (version.length) {
        const old: number[] = absGitVersion.split('.').map((i: string) => parseInt(i, 10));
        const fea: number[] = version.split('.').map((i: string) => parseInt(i, 10));
        if (old[0] > fea[0]) {
          done(chalk.red('[VERSION]: The old MAJOR version is larger than the new MAJOR.'));
        }
        if (old[1] > fea[1]) {
          done(chalk.red('[VERSION]: The old MINOR version is bigger than the new MINOR.'));
        }
        if (old[2] > fea[2]) {
          done(chalk.red('[VERSION]: The old PATCH version is larger than the new PATCH.'));
        }
      }
    }
  }

  fs.writeJsonSync(packageJsonPath, { ...packageJson, version }, { spaces: 2 });
  fs.writeFileSync(versionPath, fs.readFileSync(versionPath, 'utf-8').replace(/Version\('.+'\);/g, `Version('${version}');`));
  fs.writeFileSync(absVersionPath, version, { });
  done();
});


task('library:build-yue-ui', execNodeTask('@angular/cli', 'ng', ['build', 'yue-ui', '--prod']));

task('library:compile-less', done => {
  compileLess().then(() => {
    fs.mkdirsSync(targetPath);
    fs.copySync(path.resolve(sourcePath, `styles`), path.resolve(targetPath, `styles`));
    fs.copySync(path.resolve(sourcePath, `yue-ui.css`), path.resolve(targetPath, `yue-ui.css`));
    fs.copySync(path.resolve(sourcePath, `yue-ui.min.css`), path.resolve(targetPath, `yue-ui.min.css`));
    fs.outputFileSync(path.resolve(targetPath, `yue-ui.less`), `@import "../styles/index.less";
@import "../components.less";`);
    done();
  });
});


task('library:copy-resources', () => {
  return src([
    path.join(buildConfig.projectDir, 'README.md'),
  ], { base: buildConfig.componentsDir }).pipe(dest(path.join(buildConfig.publishDir)));
});

task(
  'build:library',
  series(
    'bump:version',
    'library:build-yue-ui',
    'library:copy-resources',
    'library:compile-less',
  )
);
