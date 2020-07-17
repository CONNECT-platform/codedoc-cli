const chalk = require('chalk');
const shell = require('shelljs');

const exec = require('../exec');
const colors = require('../colors');


module.exports = async (...args) => {
  if (shell.test('-d', '.codedoc')) {
    shell.echo(chalk`{${colors.success} #} Updating plugins ...`);
    shell.cd('.codedoc');
    await exec('npm', `update ${args.join(' ')}`);
  }
}
