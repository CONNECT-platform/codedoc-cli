const shell = require('shelljs');
const path = require('path');
const chalk = require('chalk');

const colors = require('./colors');
const checkInstall = require('./check-install');
const exec = require('./exec');


module.exports = {
  cues: ['serve', 's', '-s', '--serve', 'watch', 'w', '--watch'],
  hint: 'serve your docs on localhost for development.',
  run: async () => {
    await checkInstall();
    shell.echo(chalk`{${colors.success} #} Serving ...`);
    shell.echo(chalk`{${colors.success} #} Fetching project configuration ...`);
    const core_installed = require(path.resolve('.codedoc/package-lock.json'))
                          .dependencies['@codedoc/core'].version.split('.');
    if (core_installed[0] < 1 && core_installed[1] < 2) {
      await exec('ts-node', '-T --project .codedoc/tsconfig.json .codedoc/watch');
    } else {
      await exec('ts-node-dev', '-T --project .codedoc/tsconfig.json .codedoc/serve');
    }
  }
}
