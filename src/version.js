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


const majorDiff = (v1, v2) => {
  const v1split = v1.split('.');
  const v2split = v2.split('.');

  if (v1split[0] !== v2split[0]) return true;
  if (v1split[0] === '0' && v1split[1] !== v2split[1]) return true;
  return false;
}


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
      if (majorDiff(core_installed, core_latest) || majorDiff(cli_installed, cli_latest)) {
        shell.echo(chalk`{${colors.warning} # WARNING:} There are major updates to some packages.`);
        shell.echo(chalk`{${colors.warning} #} Use {${colors.highlight} {bold codedoc} update latest} to update to latest version.`);
        shell.echo(chalk`{${colors.warning} #}`);
        shell.echo(chalk`{${colors.warning} # {bold NOTE:}} This update might contain breaking changes.`);
        shell.echo(chalk`{${colors.warning} # {bold NOTE:}} Check https://codedoc.cc for more information.`);
        shell.echo();
        shell.echo(chalk`{${colors.faded} #} You can still use {${colors.highlight} {bold codedoc} update} to update to latest minor version compatible with your installed version.`)
      } else {
        shell.echo(chalk`{${colors.warning} # WARNING:} some packages are missing or need update.`);
        shell.echo(chalk`{${colors.warning} #} Please run {${colors.highlight} {bold codedoc} update}`);
        shell.echo();
      }

      shell.echo(chalk
      `{${colors.faded} #} Read {${colors.link} https://codedoc.cc/docs/cli#updates} for more information on updates.`);
    }
  }
}
