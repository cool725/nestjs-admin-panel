const { MigrationInterface, QueryRunner } = require("typeorm");
const InitialAppsSeeds = require('../../libs/api/models/auth/apps-role/src/db/seeds/apps.seeds');

module.exports = class AppSeeds1655197599776 {
  async up(queryRunner) {
    const apps = InitialAppsSeeds.apps;
    const appCategories = InitialAppsSeeds.categories;

    for(let i = 0; i <appCategories.data.length; i++) {
      await queryRunner.query(`INSERT INTO app_category (categoryId, domain, parentCategoryId, companyId, title) VALUES (?, ?, ?, ?, ?)`,
        [
          appCategories[i].categoryId,
          appCategories[i].domain,
          appCategories[i].parentCategoryId,
          appCategories[i].companyId,
          appCategories[i].title
        ]
      )
    }

    for(let i = 0; i <apps.length; i++) {
      await queryRunner.query(`INSERT INTO app_app (appId, domain, companyId, title, path, img, categoryId) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          apps[i].appId,
          apps[i].domain,
          apps[i].companyId,
          apps[i].title,
          apps[i].path,
          apps[i].img,
          apps[i].categoryId
        ]
      )
    }
  }

  async down(queryRunner) { }
}
