const shell = require('shelljs');
const chalk = require('chalk');

const colors = require('./colors');


module.exports = () => {
  if (!shell.test('-d', '.codedoc')) {
    shell.echo(chalk`{${colors.error} # Error:} you should run this command in a codedoc project.`);
    shell.echo(chalk`{${colors.error} #}`);
    shell.echo(chalk`{${colors.error} #} A codedoc project is a folder that has a {${colors.highlight} {italic .codedoc/}} folder in it.`);
    shell.echo(chalk`{${colors.error} #} - You might be in the wrong directory.`);
    shell.echo(chalk`{${colors.error} #} - You might need to initialize a codedoc project using {${colors.highlight} {bold codedoc} init}`);
    shell.echo();
    process.exit(1);
  }
}
