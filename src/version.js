const path = require('path');
const shell = require('shelljs');
const chalk = require('chalk');

const colors = require('./colors');


const version = pkg => new Promise((resolve, reject) => {
  shell.exec(`npm show ${pkg} version`, { silent: true }, (status, version) => {
    if (status === 0) resolve(version.trim());
    else reject();
  });
});


const divider = '...........................................';


module.exports = {
  cues: ['version', '-v', '-V', 'v', 'V', '--version'],
  hint: 'displays the CLI version.',
  run: async () => {
    const cli_installed = require('../package.json').version;
    let core_installed = 'not installed';
    let cli_update = false;
    let core_update = false;
    let cli_latest = 'unknown';
    let core_latest = 'unknown';

    shell.echo(chalk`{${colors.hint} # Fetching version info ...}`);

    try {
      [cli_latest, core_latest] = await Promise.all([version('@codedoc/cli'), version('@codedoc/core')]);
      cli_update = cli_latest !== cli_installed;
    } catch (err) {}

    shell.echo(chalk`{${cli_update?colors.warning:colors.success} #}`
            + chalk` {bold @codedoc/cli} version`
            + chalk` {bold.${cli_update?colors.warning:colors.success} ${cli_installed}}`
            + chalk` {${colors.faded} ${divider.substr(cli_installed.length)}}`
            + chalk` {${cli_update?colors.warning:colors.hint} latest: ${cli_latest}}`
            );

    if (shell.test('-d', '.codedoc')) {
      try {
        core_installed = require(path.resolve('.codedoc/package-lock.json'))
                              .dependencies['@codedoc/core'].version;
        if (core_latest !== 'unknown') core_update = core_latest !== core_installed;
      } catch (err) {
        core_update = true;
      }

      shell.echo(chalk`{${core_update?colors.warning:colors.success} #}`
                + chalk` {bold @codedoc/core} version:`
                + chalk` {bold.${
                  core_installed === 'not installed'?
                  colors.error:
                  (core_update?colors.warning:colors.success)
                } ${core_installed}}`
                + chalk` {${colors.faded} ${divider.substr(core_installed.length + 2)}}`
                + chalk` {${core_update?colors.warning:colors.hint} latest: ${core_latest}}`
                );
    }

    if (core_update || cli_update) {
      shell.echo();
      shell.echo(chalk`{${colors.warning} # WARNING:} some packages are missing or need update.`);
      shell.echo(chalk`{${colors.warning} #} Please run {${colors.highlight} {bold codedoc} update}`);
    }
  }
}
