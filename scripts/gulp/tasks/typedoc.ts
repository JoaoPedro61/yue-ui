const typedoc = require('gulp-typedoc');
import { task, src } from 'gulp';
import { join } from 'path';
import { buildConfig } from '../../build-config';



task("typedoc", () => {
  return src([`${buildConfig.componentsDir}/**/*.ts`])
    .pipe(typedoc({
      module: `commonjs`,
      target: `es5`,
      out: `${buildConfig.outputTypeDocDir}`,
      tsconfig: `${join(buildConfig.componentsDir, '/tsconfig.json')}`,
      exclude: "**/*+(index|.spec|.e2e).ts",
      name: buildConfig.name,
    }));
});
