const shell = require('shelljs');


module.exports = () => new Promise(resolve => {
  shell.exec('git remote get-url origin', {silent: true}, (status, url) => {
    if (status === 0) {
      const match = /^(https\:\/\/|git@)github\.com[:\/](?<user>[^\/]+)\/(?<repo>[^\/]+)\.git$/.exec(url.trim());
      if (match && match.groups.user && match.groups.repo) {
        resolve({
          user: match.groups.user,
          repo: match.groups.repo
        });
      }
      else resolve();
    }
    else resolve();
  });
});
