#!/usr/bin/env node

const shell = require('shelljs');
const chalk = require('chalk');

const colors = require('./colors');
const commands = require('./commands');


let argvindex = 1;

if (/\/node$/.test(process.argv[0])) {
  argvindex = 2;
}

shell.echo();

let fulfilled = false;

commands.forEach(command => {
  if (command.cues.includes(process.argv[argvindex])) {
    command.run();
    fulfilled = true;
  }
});

if (!fulfilled) {
  shell.echo(chalk`{${colors.error} # Error:} unrecognized command.`);
  commands.help.run();
}

shell.echo();
