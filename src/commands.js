const shell = require('shelljs');
const chalk = require('chalk');

const colors = require('./colors');


const divider = '.....................';

const help = {
  cues: ['help', '-h', 'h', 'H', '-H', '--help'],
  hint: 'tells you how to use the CLI.',
  run: () => {
    shell.echo(chalk`{${colors.hint} #} Usage: {bold {${colors.highlight} codedoc {italic <command>}}}`);
    shell.echo(chalk`{${colors.hint} #} Possible commands:`);
    shell.echo(chalk`{${colors.hint} #}`);
    commands.forEach(command => {
      shell.echo(
        chalk`{${colors.hint} #}    {${colors.highlight} ${command.cues[0]}}`
        + chalk` {${colors.faded} ${divider.substr(command.cues[0].length)}}`
        + ` ${command.hint}`
      )
    });
    shell.echo();
  }
}

const commands = [
  require('./init'),
  require('./serve'),
  require('./build'),
  require('./version'),
  help,
]


module.exports = commands;
module.exports.help = help;
