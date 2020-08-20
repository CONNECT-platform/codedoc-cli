const fs = require('fs');
const shell = require('shelljs');

const exec = require('../exec');


module.exports = () => new Promise((resolve, reject) => {
  const filename = '__tmp_' + Math.random().toString(36).substring(7) + '.json';
  exec('ts-node', 
  `-e "import { config } from './.codedoc/config'; console.log(JSON.stringify(config));"` 
  + ` --project .codedoc/tsconfig.json`
  + ` > ${filename}`
  )
  .then(() => {
    fs.readFile(filename, (err, data) => {
      shell.rm(filename);
      if (err) {
        reject(err);
      } else {
        try {
          resolve(JSON.parse(data));
        } catch (err) {
          reject(err);
        }
      }
    });
  }).catch(reject);
});