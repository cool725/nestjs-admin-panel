/**
 * Load ENV
 * **/
import { env } from '@movit/api/utils';
env.load();

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { BusinessAPIModule } from './app/business.module';
import { BexioHelper } from '@movit/api/extern';
import * as cookieParser from 'cookie-parser';
import { CorsMiddleware } from '@movit/api/middleware';

async function bootstrap() {
  const app = await NestFactory.create(BusinessAPIModule);
  const globalPrefix = 'api';

  app.setGlobalPrefix(globalPrefix);
  app.use(cookieParser());
  app.use(CorsMiddleware());

  const port = process.env.PORT || 3003;
  await app.listen(port);

  listRoutes(app.getHttpServer());

  Logger.log(
    process.env.APP_ENV +
      `: 🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

const listRoutes = (server) => {
  const router = server._events.request._router;

  const availableRoutes: [] = router.stack
    .map((layer) => {
      if (layer.route) {
        return {
          route: {
            path: layer.route?.path,
            method: layer.route?.stack[0].method,
          },
        };
      }
    })
    .filter((item) => item !== undefined);
};

bootstrap();

(() => {
  /*
    const bexio = new BexioHelper.Bexio(
    `eyJraWQiOiI2ZGM2YmJlOC1iMjZjLTExZTgtOGUwZC0wMjQyYWMxMTAwMDIiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJpbmZvQG15bW92aXQuY29tIiwibG9naW5faWQiOiI4NjNiNmM5ZC01NTJlLTQyYWYtOTJmNC1hMTU1MzI1ZDgwZWUiLCJjb21wYW55X2lkIjoiaWdzbjQyb3BsNnJxIiwidXNlcl9pZCI6Mjc5MDczLCJhenAiOiJldmVybGFzdC10b2tlbi1vZmZpY2UtY2xpZW50Iiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCBhbGwgdGVjaG5pY2FsIiwiaXNzIjoiaHR0cHM6XC9cL2lkcC5iZXhpby5jb20iLCJleHAiOjMyMDA2NjIyNDMsImlhdCI6MTYyMzg2MjI0MywiY29tcGFueV91c2VyX2lkIjoxLCJqdGkiOiI5ZDQ3MWQ1YS1lOWZiLTQxZjYtYjhmOS05N2U2NzYxNDRhZjkifQ.ULHI2kHWvURwcdo-dWw7iZKKfeANEA5NqxPJRRk-pSUx-f9AsH80Hf8kzsdNg5pRJUn__jtwq0wHrRPYif3UHf1YVRA-7P9n8VjZYEg8jv4gLrkBFcp9AL06SZbPkGvrpSfIjaLXWlE1kcU38fVaozVoSeA4bam-Tb4Dmc2lq2kdAHHFg-7CC2OG1jwPYIAN8nUyA3otgrrgsVPuD520ycTnVvIhr3kjfocL_O0ZCVEY9i0aKfH6_SCTNcTAp7h7vICmtNjM-lG0dCOHf3vkK3jYhwEVO_iX4FrISEvQrkavrjeLXX4WFZgjw1Graf9Tjr-hCXtt6-hD8OdUhSFDcmiV9dl8TaOjybh4SUrdBU1UPNKuoOyKqnIm1zHBWyZjRGgumS5-yEKJRxqQiuu5e3yjygIj1DG9Tae4C8EJzWnSqaGeMOeZfda0oGjnayJnXjqdst7of8T9P7YsOqlmO89UQZg62O_WWGLV7TM5NW4J-iwdxqog2n9LqoMgN2vDOlfNOEFtOvBGP8gTkmZdEuS99rvEGWC0_wri0THAjMiuGnoJ5Q77gtc_jgwzsyBt1sAlDKYrRG8FryWD7ofvhk2jtiKBd2BS7hCjM1bCIwwVQOIJdOiG3ak9b1Mst6FBygPdRKITHubkMwjJX3NVttp_C7LcKMSlPi8T0RBu9qQ`
    );

    bexio.accounts.getAccountCategories().then(async (results) => {
      const mapping = {};
      for (let i = 0; i < results.length; i++) {
        const entry = results[i];
        const cat = new FinAccountCategoryEntity();
        cat.externId = entry.id;
        cat.companyId = 1;
        cat.name = entry.name;
        cat.code = entry.account_no;
        await cat.save();
        if (mapping[entry.parent_fibu_account_group_id]) {
          await FinAccountCategoryEntity.getRepository().query(
            `update fin_account_category set  parentAccountCategoryId = ? where uuId = ?;`,
            [mapping[entry.parent_fibu_account_group_id], cat.uuId]
          );
        }

        mapping[entry.id] = cat.uuId;
        console.log(cat.uuId);
      }
    });

    /*  * */
  /* *
  bexio.accounts
    .getAccounts()
    .then(async (accounts) => {
      for (let i = 0; i < accounts.length; i++) {
        const entry: any = accounts[i];
        const acc =
          (await FinAccountEntity.findOne({
            where: {
              externId: entry.id,
              companyId: 1,
            },
          })) || new FinAccountEntity();
        acc.companyId = 1;
        acc.name = entry.name;
        acc.externId = entry.id;
        acc.accountId =
          (await FinAccountEntity.getHighestAccountId(acc.companyId)) + 1;
        acc.code = entry.account_no;
        acc.type = entry.account_type;
        if (entry.fibu_account_group_id)
          acc.category = await FinAccountCategoryEntity.findOne({
            where: {
              externId: entry.fibu_account_group_id,
            },
          });
        // tax_id:
        if (entry.tax_id) {
          acc.tax = await FinAccountTaxEntity.findOne({
            where: {
              externId: entry.tax_id,
            },
          });
        }

        await acc.save();
      }
    })
    .catch(console.log);
   */
  /*
  bexio.taxes.getTaxes().then(async (taxes) => {
    const companyId = 1;
    for (let i = 0; i < taxes.length; i++) {
      const entry = taxes[i];

      let account;
      const tax = new FinAccountTaxEntity();
      tax.name = entry.display_name;
      tax.companyId = companyId;
      tax.code = entry.code;
      tax.taxId =
        (await FinAccountTaxEntity.getHighestTaxId(tax.companyId)) + 1;

      tax.type = entry.tax_settlement_type;
      tax.externId = entry.id;
      tax.isActive = entry.is_active;
      tax.value = entry.value || 0.0;

      tax.startYear = entry.start_year || new Date().getFullYear();
      tax.endYear = entry.end_year;
      // fetch accountId
      if (entry.account_id) {
        account = await FinAccountEntity.findOne({
          where: {
            externId: entry.account_id,
          },
        });

        if (account) {
          tax.accountId = account.accountId;
        }
      }

      await tax.save();
    }
  });
  * */
})();
