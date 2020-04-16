const shell = require('shelljs');
const chalk = require('chalk');

const colors = require('./colors');
const checkInit = require('./check-init');
const exec = require('./exec');


module.exports = {
  cues: ['serve', 's', '-s', '--serve', 'watch', 'w', '--watch'],
  hint: 'serve your docs on localhost for development.',
  run: () => {
    checkInit();
    shell.echo(chalk`{${colors.success} #} Serving ...`);
    shell.echo(chalk`{${colors.success} #} Fetching project configuration ...`);
    exec('ts-node', '-T --project .codedoc/tsconfig.json .codedoc/watch');
  }
}
