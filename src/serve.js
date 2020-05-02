const shell = require('shelljs');
const chalk = require('chalk');

const colors = require('./colors');
const checkInit = require('./check-init');
const checkInstall = require('./check-install');
const exec = require('./exec');


module.exports = {
  cues: ['serve', 's', '-s', '--serve', 'watch', 'w', '--watch'],
  hint: 'serve your docs on localhost for development.',
  run: async () => {
    await checkInstall();
    shell.echo(chalk`{${colors.success} #} Serving ...`);
    shell.echo(chalk`{${colors.success} #} Fetching project configuration ...`);
    await exec('ts-node', '-T --project .codedoc/tsconfig.json .codedoc/watch');
  }
}
