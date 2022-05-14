const { MigrationInterface, QueryRunner } = require('typeorm');
const fs = require('fs');
const path = require('path');

module.exports = class LocalesImport1652505406643 {
  _tableName = 'translation_locale';

  getLocales() {
    return JSON.parse(
      fs.readFileSync(path.resolve(__dirname, 'locales.json'), 'utf8')
    );
  }

  async up(queryRunner) {
    const locales = this.getLocales();

    for (let section in locales) {
      for (let lang in locales[section]) {
        if (lang !== 'de') continue;

        for (const key in locales[section][lang]) {
          const langObj = locales[section][lang][key];
          await queryRunner.query(
            `
            insert into translation_locale(
                  languageId, \`key\`, section, value                         
            ) values ( ? , ? , ? , ? ) on duplicate key update value = ?
        `,
            [
              langObj.langId || langObj.languageId,
              langObj.key,
              langObj.section,
              langObj.value,
              langObj.value,
            ]
          );
        }
      }
    }
  }

  async down(queryRunner) {}
};
