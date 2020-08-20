const shell = require('shelljs');
const chalk = require('chalk');

const colors = require('../colors');
const checkInit = require('../check-init');

const readConfig = require('./read-config');
const checkGitHubMatch = require('./check-gh');
const checkTitle = require('./check-title');


module.exports = {
  cues: ['check', 'c', 'C', '-c', '--check'],
  hint: 'check your CODEDOC configuration.',
  run: async() => {
    let warnings = 0;
    shell.echo(chalk`{${colors.success} #} Checking CODEDOC configuration ...`);
    await checkInit();
    const config = readConfig();
    await checkTitle(config, () => warnings++);
    await checkGitHubMatch(config, () => warnings++);

    shell.echo();
    if (warnings > 0) {
      shell.echo(
        chalk`{${colors.warning} # Check finished with ${warnings} ${warnings === 1 ? 'warning' : 'warnings'}.}`
      );
    } else {
      shell.echo(chalk`{${colors.success} #} No issues detected.`);
    }
  }
}