const fs = require('fs');
const path = require('path');
const typeorm = require('typeorm');
const env = require('dotenv');

env.config({ path: path.resolve('..', '.env') });
env.config({ path: path.resolve('.env') });

const langNameIndex = {
  1: 'de',
  2: 'en',
};

const settings = {
  projects: ['business'],
  distPath: path.resolve('apps/app'),
  appPath: 'src/assets/locale',
};

const getLocalesFromDB = async (projectName) => {
  const data = {};

  const tableName = `translation_locale`;

  const db = await typeorm.createConnection({
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: +(process.env.DB_PORT || 0),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  });

  const rows = await db.query(['select * from', tableName].join(' '));

  rows.map((obj) => {
    if (!data[langNameIndex[obj.languageId]]) {
      data[langNameIndex[obj.languageId]] = {};
    }

    if (!data[langNameIndex[obj.languageId]][obj.section]) {
      data[langNameIndex[obj.languageId]][obj.section] = {};
    }

    if (obj.key && obj.key.includes('.')) {
      const parts = obj.key.split('.');
      let lastPart;
      parts.forEach((part, i) => {
        let current = lastPart
          ? lastPart
          : data[langNameIndex[obj.languageId]][obj.section];
        if (!current[part]) current[part] = {};
        if (i === parts.length - 1) current[part] = obj.value;

        lastPart = current[part];
      });
    } else
      data[langNameIndex[obj.languageId]][obj.section][obj.key] = obj.value;

    if (obj.langName == 'de' && obj.section == 'global')
      console.log(obj.langName, obj.key, obj.section, obj.key);
  });

  return data;
};

const exportLocales = (projectName, data) => {
  const appPath = [settings.distPath, projectName].join('/');
  const distPath = [appPath, settings.appPath].join('/');

  if (!fs.existsSync(appPath)) return 0;
  if (!fs.existsSync(distPath)) fs.mkdirSync(distPath);

  for (let lang in data) {
    if (!fs.existsSync(distPath + '/' + lang + '/'))
      fs.mkdirSync(distPath + '/' + lang + '/');
    console.log(data[lang]);
    for (let section in data[lang]) {
      fs.writeFileSync(
        distPath + '/' + lang + '/' + lang + '.' + section + '.locale.json',
        JSON.stringify(data[lang][section]),
        'utf8'
      );
      console.log('ok >', section, lang);
    }
  }
  return 1;
};

(async () => {
  for (let i = 0; i < settings.projects.length; i++) {
    const projectName = settings.projects[i];
    const data = await getLocalesFromDB(projectName);
    exportLocales(projectName, data);
  }
  process.exit(0);
})();
