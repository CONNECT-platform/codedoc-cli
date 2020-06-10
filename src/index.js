#!/usr/bin/env node

const shell = require('shelljs');
const chalk = require('chalk');

const colors = require('./colors');
const commands = require('./commands');


let argvindex = 2;

if (/index\.js$/.test(process.argv[0])) {
  argvindex = 1;
}

shell.echo();

let fulfilled = false;

commands.forEach(async command => {
  if (command.cues.includes(process.argv[argvindex]) && !fulfilled) {
    fulfilled = true;
    await command.run(...process.argv.slice(argvindex + 1));
    shell.echo();
  }
});

if (!fulfilled) {
  shell.echo(chalk`{${colors.error} # Error:} unrecognized command: ${process.argv[argvindex]}`);
  commands.help.run();
}


