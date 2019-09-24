'use strict';

const child_process = require('child_process');

child_process.execSync('npm install');
child_process.execSync('node src/index.js');
