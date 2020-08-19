const shell = require('shelljs');
const chalk = require('chalk');

const colors = require('../colors');
const githubInfo = require('../util/github-info');

const readGitHubConfig = require('./read-gh-config');


module.exports = async(callback) => {
  shell.echo(chalk`{${colors.hint} # Checking GitHub configuration ...}`);
  try {
    const [ghi, ghc] = await Promise.all([githubInfo(), readGitHubConfig()]);
    if ((ghi || ghc)) {
      if (!ghi || !ghi.user || !ghi.repo) {
        callback();
        shell.echo(chalk`{${colors.warning} #}`);
        shell.echo(chalk`{${colors.warning} # WARNING:: }`);
        shell.echo(chalk`{${colors.warning} #} Your CODEDOC config indicates GitHub integration, but`);
        shell.echo(chalk`{${colors.warning} #} your project folder is not in sync with a GitHub repository.`);
      }
      else if (!ghc || !ghc.user || !ghc.repo) {
        callback();
        shell.echo(chalk`{${colors.warning} #}`);
        shell.echo(chalk`{${colors.warning} # WARNING:: }`);
        shell.echo(chalk`{${colors.warning} #} Your project folder is in sync with ` 
                  + chalk`{${colors.highlight} ${ghi.user}/${ghi.repo}},`);
        shell.echo(chalk`{${colors.warning} #} but CODEDOC is not configured accordingly (or is misconfigured).`);
        shell.echo(chalk`{${colors.warning} #} You can fix CODEDOC config in {${colors.link} .codedoc/config.ts}.`);
      }
      else if (ghc.user !== ghi.user || ghc.repo !== ghi.repo) {
        callback();
        shell.echo(chalk`{${colors.warning} #}`);
        shell.echo(chalk`{${colors.warning} # WARNING:: }`);
        shell.echo(chalk`{${colors.warning} #} Your project folder in in sync with a different GitHub repo than the one configured in CODEDOC.`);
        shell.echo(chalk`{${colors.warning} #}`);
        shell.echo(chalk`{${colors.warning} #} Project folder::        {${colors.highlight} ${ghi.user}/${ghi.repo}}`);
        shell.echo(chalk`{${colors.warning} #} CODEDOC config::        {${colors.highlight} ${ghc.user}/${ghc.repo}}`);
        shell.echo(chalk`{${colors.warning} #}`);
        shell.echo(chalk`{${colors.warning} #} You can fix CODEDOC config in {${colors.link} .codedoc/config.ts}.`);
      }
    }
  } catch {
    shell.echo(chalk`{${colors.hint} # Unable to read GitHub information, moving on ...}`);
  }
}
