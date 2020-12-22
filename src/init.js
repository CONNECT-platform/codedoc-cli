const shell = require('shelljs');
const chalk = require('chalk');

const colors = require('./colors');
const exec = require('./exec');
const autoconf = require('./auto-conf');


const checkNotInit = () => {
  if (shell.test('-d', '.codedoc')) {
    shell.echo(chalk`{${colors.error} # Error:} Project already initialized!`);
    shell.echo(chalk`{${colors.error} #}`);
    shell.echo(chalk`{${colors.error} #} - Run {${colors.highlight} {bold codedoc} serve} to serve docs on localhost.`);
    shell.echo(chalk`{${colors.error} #} - Run {${colors.highlight} {bold codedoc} build} to build your docs.`);
    shell.echo(chalk`{${colors.error} #} - Run {${colors.highlight} {bold codedoc} help} for more info.`);
    shell.echo();
    process.exit(1);
  }
}


const checkGit = () => {
  if (!shell.which('git')) {
    shell.echo(chalk`{${colors.error} # Error:} {underline.bold GIT} is required!`);
    shell.echo(chalk`{${colors.error} #} Please install git and try again.`);
    shell.echo(
      chalk`{${colors.error} #} To install git, visit {underline.bold {${colors.link} https://git-scm.com/downloads}}`
    );
    shell.echo();
    process.exit(1);
  }
}


const checkNPM = () => {
  if (!shell.which('npm')) {
    shell.echo(chalk`{${colors.error} # Error:} {underline.bold NPM} is required!`);
    shell.echo(chalk`{${colors.error} #} Please install NPM and try again.`);
    shell.echo(
      chalk`{${colors.error} #} To install NPM, visit {underline.bold {${colors.link} https://www.npmjs.com/get-npm}}`
    );
    shell.echo();
    process.exit(1);
  }
}


const cloneFiles = async () => {
  shell.echo(chalk`{${colors.success} # } Cloning Files ...`);
  try {
    await exec('git', 'clone https://github.com/CONNECT-platform/codedoc-boilerplate.git');
    shell.cp('-rf', './codedoc-boilerplate/.codedoc', './');

    if (!shell.test('-d', 'docs/md')) shell.mkdir('-p', './docs/md');

    if (!shell.test('-e', './docs/md/index.md'))
      shell.cp('-f', './codedoc-boilerplate/docs/md/index.md', './docs/md/');

    if (!shell.test('-e', './docs/md/_toc.md')) {
      shell.cp('-f', './codedoc-boilerplate/docs/md/_toc.md', './docs/md/');
      shell.cp('-rf', './codedoc-boilerplate/docs/md/docs', './docs/md/');
    }

    if (!shell.test('-d', 'docs/assets')) shell.mkdir('-p', './docs/assets');

    if (!shell.test('-e', 'docs/Dockerfile') && !shell.test('-e', 'docs/docker-compose.yml')) {
      shell.cp('-f', './codedoc-boilerplate/docs/Dockerfile', './docs/');
      shell.cp('-f', './codedoc-boilerplate/docs/docker-compose.yml', './docs/');
    }

    shell.rm('-rf', './codedoc-boilerplate');
  } catch(err) {
    shell.echo(chalk`{${colors.error} # Cloning Files Failed!}`);
    shell.echo();
    process.exit(1);
  }

  shell.echo(chalk`{${colors.success} # Files Cloned!}`);
  shell.echo();
};


const installDependencies = async () => {
  shell.echo(chalk`{${colors.success} # } Installing Dependencies ...`);
  shell.cd('.codedoc');
  try {
    await exec('npm', 'i');
    shell.cd('..');
  } catch(err) {
    shell.echo(chalk`{${colors.error} # Installing Dependencies Failed!}`);
    shell.echo();
    process.exit(1);
  }

  shell.echo(chalk`{${colors.success} # Dependencies Installed!}`);
  shell.echo();
}


module.exports = {
  cues: ['init', 'i', 'I', '-i', '-I', '--init'],
  hint: 'initialize a new codedoc project.',
  run: async () => {
    checkNotInit();
    checkGit();
    checkNPM();
    await cloneFiles();
    await installDependencies();
    await autoconf();
  }
}
