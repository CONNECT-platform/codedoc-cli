const { writeFileSync } = require('fs');
const { join } = require('path');

const shell = require('shelljs');
const chalk = require('chalk');

const colors = require('./colors');
const checkInit = require('./check-init');


module.exports = async () => {
  await checkInit();
  const testfile = join('.codedoc', '__tmp_' + Math.random().toString(36).substring(7) + '.js');
  writeFileSync(testfile, `require('@codedoc/core');`);
  const code = shell.exec(`node ${testfile}`, {silent: true}).code;
  shell.rm(testfile);

  if (code !== 0) {
    shell.echo(chalk`{${colors.error} # Error:} your local codedoc installation is incomplete.`);
    shell.echo(chalk`{${colors.error} #} There are some packages missing from {${colors.highlight} {italic .codedoc/node_modules}}`);
    shell.echo(chalk`{${colors.error} #} - Run {${colors.highlight} {bold codedoc} install} to install them.`);
    shell.echo(chalk`{${colors.error} #} - Or run {${colors.highlight} {bold codedoc} update} to install the latest version.`);
    shell.echo();
    process.exit(0);
  }
}

