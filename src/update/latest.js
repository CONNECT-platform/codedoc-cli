const chalk = require('chalk');
const shell = require('shelljs');

const exec = require('../exec');
const colors = require('../colors');


module.exports = async (...args) => {
  if (!args.includes('--local')) {
    shell.echo(chalk`{${colors.success} #} Updating CLI to latest version ...`);
    await exec('npm', 'install -g @codedoc/cli@latest');
  }

  if (shell.test('-d', '.codedoc')) {
    shell.echo(chalk`{${colors.success} #} Updating local codedoc installation to latest version ...`);
    shell.cd('.codedoc');
    await exec('npm', 'install @codedoc/core@latest');
  }
}
