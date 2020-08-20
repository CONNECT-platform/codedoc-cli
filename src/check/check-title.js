const shell = require('shelljs');
const chalk = require('chalk');

const colors = require('../colors');


const getTitleConfig = async config => config.then(C => {
  return C.page.title;
});


module.exports = async (config, callback) => {
  shell.echo();
  shell.echo(chalk`{${colors.hint} # Checking Title configuration ...}`);
  const title = await getTitleConfig(config);
  if (title.base.endsWith('[PLACEHOLDER]')) {
    callback();
    shell.echo(chalk`{${colors.warning} #}`);
    shell.echo(chalk`{${colors.warning} # WARNING:: }`);
    shell.echo(chalk`{${colors.warning} #} Your project's title is set to a placeholder.`);
    shell.echo(chalk`{${colors.warning} #} You can fix this by modifying {${colors.link} .codedoc/config.ts}`);
    shell.echo(chalk`{${colors.warning} #}`);
    shell.echo(chalk`{${colors.warning} #} Read {${colors.link}.underline https://codedoc.cc/docs/config/page#page-title} for more information.`);
    shell.echo(chalk`{${colors.warning} #}`);
  }
}
