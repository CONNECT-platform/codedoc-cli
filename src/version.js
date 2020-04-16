const shell = require('shelljs');
const chalk = require('chalk');

const colors = require('./colors');


module.exports = {
  cues: ['version', '-v', '-V', 'v', 'V', '--version'],
  hint: 'displays the CLI version.',
  run: () => shell.echo(chalk`{${colors.success} #} {bold CODEDOC CLI} version: ${require('../package.json').version}`)
}
