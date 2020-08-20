const shell = require('shelljs');
const chalk = require('chalk');

const colors = require('../colors');
const githubInfo = require('../util/github-info');


const getGHConfig = async config => config.then(C => {
  if (C.misc && C.misc.github) {
    return C.misc.github;
  } else return undefined;
});


module.exports = async(config, callback) => {
  shell.echo();
  shell.echo(chalk`{${colors.hint} # Checking GitHub configuration ...}`);
  try {
    const [ghi, ghc] = await Promise.all([githubInfo(), getGHConfig(config)]);
    if ((ghi || ghc)) {
      let issue = undefined;
      if (!ghi || !ghi.user || !ghi.repo) issue = 'NO-GHI';
      else if (!ghc || !ghc.user || !ghc.repo) issue = 'NO-GHC';
      else if (ghc.user !== ghi.user || ghc.repo !== ghi.repo) issue = 'MISMATCH';

      if (issue) {
        callback();
        shell.echo(chalk`{${colors.warning} #}`);
        shell.echo(chalk`{${colors.warning} # WARNING:: }`);
        if (issue === 'NO-GHI') {
          shell.echo(chalk`{${colors.warning} #} Your CODEDOC config indicates GitHub integration, but`);
          shell.echo(chalk`{${colors.warning} #} your project folder is not in sync with a GitHub repository.`);
        }
        else if (!ghc || !ghc.user || !ghc.repo) {
          shell.echo(chalk`{${colors.warning} #} Your project folder is in sync with ` 
                    + chalk`{${colors.highlight} ${ghi.user}/${ghi.repo}},`);
          shell.echo(chalk`{${colors.warning} #} but CODEDOC is not configured accordingly (or is misconfigured).`);
        }
        else if (ghc.user !== ghi.user || ghc.repo !== ghi.repo) {
          shell.echo(chalk`{${colors.warning} #} Your project folder in in sync with a different GitHub repo than the one configured in CODEDOC.`);
          shell.echo(chalk`{${colors.warning} #}`);
          shell.echo(
            chalk`{${colors.warning} #} Project folder::        {${colors.highlight} ${ghi.user}/${ghi.repo}}`);
          shell.echo(
            chalk`{${colors.warning} #} CODEDOC config::        {${colors.highlight} ${ghc.user}/${ghc.repo}}`);
        }
        shell.echo(chalk`{${colors.warning} #}`);
        shell.echo(chalk`{${colors.warning} #} You can fix this by modifying {${colors.link} .codedoc/config.ts}`);
        shell.echo(chalk`{${colors.warning} #}`);
        shell.echo(chalk`{${colors.warning} #} Read {${colors.link}.underline https://codedoc.cc/docs/config/misc#github-integration} for more information.`);
        shell.echo(chalk`{${colors.warning} #}`);
      }
    }
  } catch {
    shell.echo(chalk`{${colors.hint} # Unable to read GitHub information, moving on ...}`);
  }
}
