const shell = require('shelljs');
const chalk = require('chalk');

const colors = require('../colors');
const checkInit = require('../check-init');

const checkGitHubMatch = require('./check-gh');


module.exports = {
  cues: ['check', 'c', 'C', '-c', '--check'],
  hint: 'check your CODEDOC configuration.',
  run: async() => {
    let warnings = 0;
    shell.echo(chalk`{${colors.success} #} Checking CODEDOC configuration ...`);
    await checkInit();
    await checkGitHubMatch(() => warnings++);

    if (warnings > 0) {
      shell.echo(chalk`{${colors.warning} #}`);
      shell.echo(
        chalk`{${colors.warning} # Check finished with ${warnings} ${warnings === 1 ? 'warning' : 'warnings'}.}`
      );
      shell.echo(chalk`{${colors.warning} #}`);
    } else {
      shell.echo(chalk`${colors.success} # No issues detected.`);
    }
  }
}