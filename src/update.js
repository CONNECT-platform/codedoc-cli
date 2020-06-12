const chalk = require('chalk');
const shell = require('shelljs');

const exec = require('./exec');
const colors = require('./colors');


module.exports = {
  cues: ['update', 'upgrade', 'u', 'U', '-u', '--update', '--upgrade'],
  hint: 
chalk`updates codedoc CLI and local installation. 
{gray #}                           use {${colors.highlight} update latest} to force update to latest verison.`,
  run: async (...args) => {
    if (args && args[0] === 'latest') {
      if (!args.includes('--local')) {
        shell.echo(chalk`{${colors.success} #} Updating CLI to latest version ...`);
        await exec('npm', 'install -g @codedoc/cli@latest');
      }

      if (shell.test('-d', '.codedoc')) {
        shell.echo(chalk`{${colors.success} #} Updating local codedoc installation to latest version ...`);
        shell.cd('.codedoc');
        await exec('npm', 'install @codedoc/core@latest');
      }
    } else {
      if (!args || !args.includes('--local')) {
        shell.echo(chalk`{${colors.success} #} Updating CLI ...`);
        await exec('npm', 'update -g @codedoc/cli');
      }
  
      if (shell.test('-d', '.codedoc')) {
        shell.echo(chalk`{${colors.success} #} Updating local codedoc installation ...`);
        shell.cd('.codedoc');
        await exec('npm', 'update @codedoc/core');
      }
    }
  }
}
