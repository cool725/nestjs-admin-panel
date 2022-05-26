import { EntityRepository, Repository } from 'typeorm';
import { SaleItemEntity } from '../entities/sale.entity.item';
import { SaleItemCategoryEntity } from '../entities/sale.entity.item-category';
import { TranslationLabelEntity } from '../../../../../translation/src/entities/translation.label.item';
import {SaleItemPriceEntity} from "../entities/sale.entity.item.price";
import {SaleItemEmployeeEntity} from "../entities/sale.entity.item.employee";

@EntityRepository(SaleItemEntity)
export class SaleItemRepository extends Repository<SaleItemEntity> {
  list(companyId: number, languageId: number, options: any = {}) {
    const params = [companyId];
    let where = '';

    if (languageId) {
      params.push(languageId);
      where += ' and tl.languageId = ? ';
    }

    if (options.itemId) {
      params.push(options.itemId);
      where += ' and s.itemId = ? ';
    }

    where += ' and (tl.key not like "cat:%" and tl.key not like "sip:%")';

    return this.query(
      `
          select
              s.*,
               group_concat(
                       distinct concat(tl.key, '${TranslationLabelEntity.DBSplitter}' ,tl.value)
                       SEPARATOR '@@,@@'
                  ) as labels,
              group_concat( distinct sicl.categoryId) as categoriesIds,
              languageId
          from sell_item s
              
                   left join translation_label tl on
                      s.companyId = tl.companyId and
                      s.type = tl.type 
                   and s.itemId = tl.id

                   left join sell_item_category_link sicl on (
                      s.companyId = sicl.companyId and
                      s.type = sicl.type and
                      s.itemId = sicl.itemId
                   ) 
          
          where s.companyId = ? and s.type = "S" ${where}
          group by s.itemId, languageId`,
      params
    ).then((rows) => {
      if (options.itemId) {
        let baseItem;
        for (let i = 0; i < rows.length; i++) {
          const row = rows[i];
          if (!baseItem) {
            baseItem = row;

            // split categories
            if (baseItem.categoriesIds) {
              baseItem.categoriesIds = baseItem.categoriesIds.split(',');
            }
          }
          // create translationObject
          baseItem = TranslationLabelEntity.createTranslationObjectByRow(
            baseItem,row
          )
        }
        if(baseItem?.labels) delete baseItem.labels;
        return baseItem;
      }

      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        if (row.labels) {
          TranslationLabelEntity.createTranslationObjectByRow(row);
          if (row.label && row.label['title'])
            row.title = row.label['title'][languageId];
          delete row.labels;
        }
      }

      return { data: rows };
    });
  }
}

@EntityRepository(SaleItemCategoryEntity)
export class SaleItemCategoryRepository extends Repository<SaleItemCategoryEntity> {
  constructor() {
    super();
  }

  list(companyId: number, languageId: number, options: any = {}) {
    const params = [companyId];
    let where = '';

    if (languageId) {
      params.push(languageId);
      where += ' and tl.languageId = ? ';
    }

    if (options.categoryId) {
      params.push(options.categoryId);
      where += ' and cat.categoryId = ? ';
    }

    where += ' and tl.key like "cat:%" ';

    let groupSql = options.grouped ? 'and cat.parentCategoryId is null' : '';

    const getCategories = (customWhere = '', customParams = []) =>
      this.query(`
          select
              cat.*,
              group_concat(
                      concat( tl.key, '${TranslationLabelEntity.DBSplitter}',tl.value)
                      SEPARATOR '@@,@@'  
                  ) as labels,
              languageId
          from sell_item_category cat
            left join translation_label tl on
                      cat.companyId = tl.companyId and
                      cat.type = tl.type and 
                      cat.categoryId = tl.id
          where cat.companyId = ? and cat.type = "S" ${where} ${customWhere}
          group by cat.categoryId , tl.languageId 
`, [...params, ...customParams]);

    const parseRows = async (rows) => {

      if (options.categoryId) {
        let baseItem;
        for (let i = 0; i < rows.length; i++) {
          const row = rows[i];
          if (!baseItem) {
            baseItem = row;

            // split categories
            if (baseItem.categoriesIds) {
              baseItem.categoriesIds = baseItem.categoriesIds.split(',');
            }
          }
          // create translationObject
          baseItem =TranslationLabelEntity.createTranslationObjectByRow(
              baseItem,row, '@@,@@', 'cat:'
          )
        }
        delete baseItem.labels;
        return baseItem;
      }

      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];

        if (row.labels) {
          TranslationLabelEntity.createTranslationObjectByRow(
              row, row ,'@@,@@','cat:'
          );

          if (row.label && row.label['title']) row.title = row.label['title'][languageId];
          delete row.labels;
        }

        if (options.grouped) row.children = await getCategories(`and cat.parentCategoryId = ?`, [
            row.categoryId,
          ]).then(parseRows);
      }

      return rows;
    };

    return getCategories(groupSql)
      .then(parseRows)
      .then((data) => ({ data: data }));
  }

  get(
     categoryId:number, companyId: number, languageId: number, options: any = {}
  ){
    options.categoryId = categoryId;
   return this.list(companyId, languageId, options)
       .then(row => row?.data)
  }
}

@EntityRepository(SaleItemPriceEntity)
export class SaleItemPriceRepository extends Repository<SaleItemPriceEntity> {
    getPricesFromItem(companyId: number, itemId: number, type:string, options: { languageId?:number } = {}) {
        const params = [companyId , itemId];
        let where = '';

        if (options.languageId) {
            params.push(options.languageId);
            where += ' and tl.languageId = ? ';
        }

        where += ' and tl.key like "sip:%" ';

        return this.query(`
         select
             p.*,
              group_concat(
                      concat( tl.key, '${TranslationLabelEntity.DBSplitter}',tl.value)
                      SEPARATOR '@@,@@'
                  ) as labels,
              languageId
          from sell_item_price p
                   left join translation_label tl on
                      p.companyId = tl.companyId and
                      p.type = tl.type and
                      p.itemId = tl.id
          where p.companyId = ? and p.type = "S" and p.itemId = ? ${where} 
          group by p.priceId , tl.languageId `, params)
            .then((rows) => {
                for (let i = 0; i < rows.length; i++) {
                const row = rows[i];
                if (row.labels) {
                    TranslationLabelEntity.createTranslationObjectByRow(
                        row,row,'@@,@@','sip:'
                        );
                    if (row.label && row.label['title']) row.title = row.label['title'][1];
                    delete row.labels;
                }
            }
            return rows;
        });
    }
}
@EntityRepository(SaleItemEmployeeEntity)
export class SaleItemEmployeeRepository extends Repository<SaleItemEmployeeEntity> {

}
