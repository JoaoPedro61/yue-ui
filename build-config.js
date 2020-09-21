const { join } = require('path');

const packageJson = require(`${__dirname}/components/package.json`);

const buildVersion = packageJson.version;

module.exports = {
  projectVersion: buildVersion,
  projectDir: __dirname,

  componentsDir: join(__dirname, 'components'),
  scriptsDir: join(__dirname, 'scripts'),

  outputTypeDocDir: join(__dirname, 'dist-documentation'),
  outputCompDocDir: join(__dirname, 'dist-documentation'),
  
  publishDir: join(__dirname, 'publish'),
  implementationPort: 4200,

  name: `Yue Ui`,
};
