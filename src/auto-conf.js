const fs = require('fs');
const path = require('path');
const shell = require('shelljs');
const chalk = require('chalk');

const colors = require('./colors');
const githubInfo = require('./util/github-info');


const camelcase = str => str.split(/\s|\-|\_/).map(part => part[0].toUpperCase() + part.substr(1)).join(' ');

const spaces = count => Array(count + 1).join(' ');

const autoconf = () => new Promise(async resolve => {
  shell.echo(chalk`{${colors.success} # } Configuring Project ...`);

  const folder = path.basename(shell.pwd().toString());
  const github = await githubInfo();

  const name = github ? camelcase(github.repo) : camelcase(folder);

  const SPACES_COUNT = 40;
  const conf = `
import { configuration } from '@codedoc/core';

import { theme } from './theme';


export const config = /*#__PURE__*/configuration({
  theme,${spaces(SPACES_COUNT - 6)}// --> add the theme. modify \`./theme.ts\` for chaning the theme.
  ${github ? `dest: {
    namespace: '/${github.repo}'${spaces(SPACES_COUNT - 16 - github.repo.length)}// --> your github pages namespace. remove if you are using a custom domain.
  },` : ''}
  page: {
    title: {
      base: '${name}'${spaces(SPACES_COUNT - 12 - name.length)}// --> the base title of your doc pages
    }
  },
  ${github ? `misc: {
    github: {
      user: '${github.user}',${spaces(SPACES_COUNT - 13 - github.user.length)}// --> your github username (where your repo is hosted)
      repo: '${github.repo}',${spaces(SPACES_COUNT - 13 - github.repo.length)}// --> your github repo name
    }
  },` : ''}
});
`;

  fs.writeFile(path.join('.codedoc', 'config.ts'), conf, err => {
    if (err) {
      shell.echo(chalk`{${colors.warning} # WARNING:} Could not write automatic configuration.`);
      shell.echo(err);
      shell.echo(chalk`{${colors.warning} #} Configure manually by editting {underline.italic {${colors.link} .codedoc/config.ts}}.`);
    } else {
      shell.echo(chalk`{${colors.success} # Project Configured!}.`);
      shell.echo(chalk`{${colors.success} #} Modify configs by editting {underline.italic {${colors.link} .codedoc/config.ts}}.`);
    }

    shell.echo();
    resolve();
  });
});


module.exports = autoconf;
