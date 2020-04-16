const shell = require('shelljs');
const chalk = require('chalk');

const colors = require('./colors');
const exec = require('./exec');
const checkInit = require('./check-init');


module.exports = {
  cues: ['build', 'b', 'B', '-b', '-B', '--build'],
  hint: 'build your docs for deployment.',
  run: async () => {
    checkInit();
    shell.echo(chalk`{${colors.success} #} Building ...`);
    shell.echo(chalk`{${colors.success} #} Fetching project configuration ...`);
    try {
      await exec('ts-node', '--project .codedoc/tsconfig.json .codedoc/build');
    } catch (err) {
      shell.echo(chalk`{${colors.error} # Build Failed.}`);
      shell.echo();
      process.exit(1);
    }

    shell.echo(chalk`{${colors.success} # Build Successful.}`);
    shell.echo();
  }
}
