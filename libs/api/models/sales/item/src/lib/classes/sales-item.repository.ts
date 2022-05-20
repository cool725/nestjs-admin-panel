import { EntityRepository, Repository } from 'typeorm';
import { SaleItemEntity } from '../entities/sale.entity.item';
import { SaleItemCategoryEntity } from '../entities/sale.entity.item-category';
import { TranslationLabelEntity } from '../../../../../translation/src/entities/translation.label.item';
import { TranslatableUtils } from '../../../../../../common/decorator';

@EntityRepository(SaleItemEntity)
export class SaleItemRepository extends Repository<SaleItemEntity> {
  list(businessId: number, languageId: number, options: any = {}) {
    const params = [businessId];
    let where = '';

    if (languageId) {
      params.push(languageId);
      where += ' and tl.languageId = ? ';
    }

    if (options.itemId) {
      params.push(options.itemId);
      where += ' and s.itemId = ? ';
    }

    where += ' and tl.key not like "cat:%" ';

    return this.query(
      `
          select
              s.*,
               group_concat(
                       distinct concat(tl.key, '${TranslationLabelEntity.DBSplitter}' ,tl.value)
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
            const [key, value] = baseItem.labels.split(
              TranslationLabelEntity.DBSplitter
            );
            baseItem.label = {
              [key]: { [row.languageId]: value },
            };

            delete baseItem.labels;

            // split categories
            if (baseItem.categoriesIds) {
              baseItem.categoriesIds = baseItem.categoriesIds.split(',');
            }

            continue;
          }

          const [key, value] = row.labels.split(
            TranslationLabelEntity.DBSplitter
          );
          if (!baseItem.label[key]) baseItem.label[key] = {};
          baseItem.label[key][row.languageId] = value;
        }
        return baseItem;
      }

      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        if (row.labels) {
          TranslatableUtils.splitLabels(row);
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

  list(businessId: number, languageId: number, options: any = {}) {
    const params = [businessId];
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
      this.query(
        `
          select
              cat.*,
              group_concat(
                      concat( tl.key, '${TranslationLabelEntity.DBSplitter}',tl.value)
                  ) as labels,
              languageId
          from sell_item_category cat
            left join translation_label tl on
                      cat.companyId = tl.companyId and
                      cat.type = tl.type and 
                      cat.categoryId = tl.id
          where cat.companyId = ? and cat.type = "S" ${where} ${customWhere}
          group by cat.categoryId , tl.languageId 
`,
        [...params, ...customParams]
      );

    const parseRows = async (rows) => {
      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];

        if (row.labels) {
          TranslatableUtils.splitLabels(row, 'cat:');
          if (row.label && row.label['title'])
            row.title = row.label['title'][languageId];
          delete row.labels;
        }

        if (options.grouped)
          row.children = await getCategories(`and cat.parentCategoryId = ?`, [
            row.categoryId,
          ]).then(parseRows);
      }
      return rows;
    };

    return getCategories(groupSql)
      .then(parseRows)
      .then((data) => ({ data: data }));
  }
}
