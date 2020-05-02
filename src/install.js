const chalk = require('chalk');
const shell = require('shelljs');

const exec = require('./exec');
const colors = require('./colors');
const checkInit = require('./check-init');


module.exports = {
  cues: ['install', '--install'],
  hint: 'Installs required local packages as specified in .codedoc',
  run: async() => {
    await checkInit();
    shell.echo(chalk`{${colors.success} #} Installing local packages required by codedoc ...`);
    shell.cd('.codedoc');
    await exec('npm', 'install');
  }
}