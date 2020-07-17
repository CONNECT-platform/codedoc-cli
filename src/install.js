const chalk = require('chalk');
const shell = require('shelljs');

const exec = require('./exec');
const colors = require('./colors');
const checkInit = require('./check-init');


module.exports = {
  cues: ['install', '--install'],
  hint: 'installs required local packages as specified in .codedoc',
  run: async(...args) => {
    await checkInit();
    let target = args || [];
    if (target[0] === 'plugin') target = target.slice(1);
    if (target.length > 0) {
      shell.echo(chalk`{${colors.success} #} Installing plugins ...`);
    } else {
      shell.echo(chalk`{${colors.success} #} Installing local packages required by codedoc ...`);
    }
    shell.cd('.codedoc');
    await exec('npm', `install ${target.join(' ')}`);
  }
}
