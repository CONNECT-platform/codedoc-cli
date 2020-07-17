const chalk = require('chalk');
const shell = require('shelljs');

const exec = require('../exec');
const colors = require('../colors');


module.exports = async (...args) => {
  if (!args || !args.includes('--local')) {
    shell.echo(chalk`{${colors.success} #} Updating CLI ...`);
    await exec('npm', 'update -g @codedoc/cli');
  }
  
  if (shell.test('-d', '.codedoc')) {
    shell.echo(chalk`{${colors.success} #} Updating local codedoc installation ...`);
    shell.cd('.codedoc');
    await exec('npm', 'update @codedoc/core');
  }
}
