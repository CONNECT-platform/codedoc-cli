const chalk = require('chalk');

const colors = require('../colors');

const updateToLatest = require('./latest');
const softUpdate = require('./soft');
const updatePlugin = require('./plugin');


module.exports = {
  cues: ['update', 'upgrade', 'u', 'U', '-u', '--update', '--upgrade'],
  hint: 
chalk`updates codedoc CLI and local installation. 
{gray #}                           use {${colors.highlight} update latest} to force update to latest verison.`,
  run: async (...args) => {
    if (args && (args[0] === 'plugin' || args[0] === 'plugins')) await updatePlugin(...args.slice(1));
    else if (args && args[0] === 'latest') await updateToLatest(...args.slice(1));
    else await softUpdate(...args);
  }
}
