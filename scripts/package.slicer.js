const fs = require('fs');
const path = require('path');

const mode = 'api';

let rawdata = fs.readFileSync(path.resolve(__dirname, 'package.json'));
let json = JSON.parse(rawdata);

const requirements = {
  app: [
    '@angular',
    '@popperjs',
    'bootstrap',
    'zone.js',
    '@ngx',
    'angular-cacheable',
    'ng-zorro-antd',
  ],
  mobile: ['ionic', 'capacitor'],
  api: [
    'cookie-session',
    'cookie-parser',
    'nodemailer',
    'passport-jwt',
    '@nest',
    'nrwl',
    'mysql',
    'nodemailer',
    'passport',
    'passport-jwt',
    'tslib',
    'typeorm',
    'bexio',
  ],
};

// Skip front end package.json
if (mode === 'api') {
  json.name = json.name + '-sliced-api';
  let result = {};
  let exclude = [...requirements.app, ...requirements.mobile].toString();
  for (let key in json.dependencies) {
    if (!exclude.includes(key.split('/')[0])) {
      result[key] = json.dependencies[key];
    }
  }
  json.dependencies = result;

  result = {};
  for (let key in json.devDependencies) {
    if (!exclude.includes(key.split('/')[0])) {
      result[key] = json.devDependencies[key];
    }
  }
  json.devDependencies = result;

  fs.writeFileSync(
    path.resolve(__dirname, 'package.json'),
    JSON.stringify(json),
    'utf8'
  );
} else if (mode === 'app') {
  let result = {};
  let exclude = [...requirements.api, requirements.mobile].toString();
  for (let key in json.dependencies) {
    if (!exclude.includes(key)) {
      result[key] = json.dependencies[key];
    }
  }
  json.dependencies = result;

  result = {};
  for (let key in json.devDependencies) {
    if (!exclude.includes(key)) {
      result[key] = json.devDependencies[key];
    }
  }
  json.devDependencies = result;

  fs.writeFileSync('package.json', JSON.stringify(json), 'utf8');
}
console.log('done');
