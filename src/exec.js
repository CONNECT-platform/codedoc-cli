const path = require('path');
const { exec, spawn } = require('child_process');

module.exports = (cmd, params) =>
  new Promise((resolve, reject) => {
    const nodeModuleFolder = path.join(__dirname, '..', 'node_modules');
    const binFolder = path.join(nodeModuleFolder, '.bin');
    const pathArr = [process.env.PATH || '', binFolder].filter(x => !!x);
    const nodePathArr = [process.env.NODE_PATH || '', nodeModuleFolder].filter(x => !!x);

    if (process.platform === 'win32') {
      const ENV_SEPARATOR = ';';

      const pathEnv = pathArr.join(ENV_SEPARATOR);

      const env = {
        ...process.env,
        PATH: pathEnv,
        Path: pathEnv,
        NODE_PATH: nodePathArr.join(ENV_SEPARATOR),
      };
      let child = null;
      try {
        child = exec(cmd + ' ' + params, { env });

        child.stdout.pipe(process.stdout);
        child.stderr.pipe(process.stderr);
        child.on('close', status => {
          if (status !== 0) reject();
          else resolve();
        });

        return child;
      } catch (error) {
        if (child !== null) {
          child.kill();
          child.disconnect();
        }
        reject(new Error(error));
      }
    } else {
      const ENV_SEPARATOR = ';';

      let child = null;
      try {
        child = spawn(cmd, [params], {
          stdio: 'inherit',
          shell: 'bash',
          env: {
            ...process.env,
            PATH: pathArr.join(ENV_SEPARATOR),
            NODE_PATH: nodePathArr.join(ENV_SEPARATOR),
          },
        });

        child.on('close', status => {
          if (status !== 0) reject();
          else resolve();
        });
      } catch (error) {
        if (child !== null) {
          child.kill();
          child.disconnect();
        }
        reject(new Error(error));
      }
    }
  });
