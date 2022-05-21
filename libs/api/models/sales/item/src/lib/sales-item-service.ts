import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  SaleItemCategoryRepository, SaleItemPriceRepository,
  SaleItemRepository,
} from './classes/sales-item.repository';
import { SaleItemCategoryLinkEntity } from './entities/sale.entity.item-category.link';
import { doInsert } from '../../../../../common/db/utils/db.utils';

@Injectable()
export class SalesItemService {
  constructor(
    @InjectRepository(SaleItemRepository)
    private itemRepo: SaleItemRepository,
    @InjectRepository(SaleItemPriceRepository)
    private itemPriceRepo: SaleItemPriceRepository,
    @InjectRepository(SaleItemCategoryRepository)
    private categoryRepo: SaleItemCategoryRepository
  ) {}

  public getServices(businessId, langId, searchOptions) {
    return this.itemRepo.list(businessId, langId, searchOptions);
  }

  public async getService(businessId, itemId) {
    const service = await this.itemRepo.list(businessId, null, {
      itemId,
    })

    if(!service)return service

    service.prices = await this.itemPriceRepo.getPricesFromItem(
        businessId, itemId, service.type
    )

    return service
  }

  /*
   * injects selected language title and description to object
   * */
  public getServiceWithTranslation(businessId, itemId, langId) {
    return this.itemRepo.list(businessId, langId, { itemId });
  }

  public getServiceCategory(businessId, categoryId) {
    return this.categoryRepo.get(categoryId,businessId, null, {
      categoryId,
    });
  }

  public getServiceCategories(businessId, langId, searchOptions) {
    return this.categoryRepo.list(businessId, langId, searchOptions);
  }

  /**
   * Get Categories that parents have been deleted
   * */
  public getServiceCategoriesUnliked() {}

  async saveService(businessId, service) {
    const saleItemEntity = this.itemRepo.create();
    saleItemEntity.type = 'S';
    saleItemEntity.companyId = businessId;
    await doInsert(saleItemEntity);
    return this.updateService(businessId, saleItemEntity.itemId, service);
  }

  async updateService(businessId: number, itemId: number, service) {
    const saleItemEntity = await this.itemRepo.findOne({
      companyId: businessId,
      type: 'S',
      itemId: itemId,
    });
    await saleItemEntity.setTranslationFromLabelObj(service.label);
    await this.saveLinkCategories(businessId, itemId, service.categoriesIds);
    await this.savePrices(businessId, itemId, service.prices);


    return saleItemEntity.update();
  }

  async saveLinkCategories(businessId, itemId, categoriesIds: number[]) {
    if (categoriesIds) {
      const items = await SaleItemCategoryLinkEntity.find({
        where: {
          companyId: businessId,
          itemId: itemId,
        },
      });
      await Promise.all(items.map((a) => a.remove()));
      for (let i = 0; i < categoriesIds.length; i++) {
        const link = SaleItemCategoryLinkEntity.create();
        link.companyId = businessId;
        link.type = 'S';
        link.categoryId = categoriesIds[i];
        link.itemId = itemId;
        await link.save();
      }
    }
  }

  async deleteService(businessId, itemId) {
    return this.itemRepo
      .findOne({
        where: {
          companyId: businessId,
          type: 'S',
          itemId: itemId,
        },
      })
      .then((item) => (item ? item.remove() : null));
  }

  public async saveServiceCategory(businessId, category) {
    const saleItemCategoryEntity = this.categoryRepo.create();
    saleItemCategoryEntity.companyId = businessId;
    saleItemCategoryEntity.type = 'S';
    await doInsert(saleItemCategoryEntity);
    return this.updateCategoryService(
      businessId,
      saleItemCategoryEntity.categoryId,
      category
    );
  }

  async updateCategoryService(
    businessId: number,
    categoryId: number,
    category
  ) {
    const saleItemCatEntity = await this.categoryRepo.findOne({
      companyId: businessId,
      type: 'S',
      categoryId: categoryId,
    });

    saleItemCatEntity.parentCategoryId = category.parentCategoryId;
    saleItemCatEntity.enabled = category.enabled;
    saleItemCatEntity.color = category.color;
    saleItemCatEntity.setTranslationFromLabelObj(category.label);

    return saleItemCatEntity.update();
  }

  async deleteCategory(businessId: number, categoryId: number) {
    return this.categoryRepo
      .findOne({
        where: {
          companyId: businessId,
          type: 'S',
          categoryId: categoryId,
        },
      })
      .then((item) => (item ? item.remove() : null));
  }

  protected unlinkCategory(businessId, categoryId, type = 'S') {
    this.categoryRepo.query(
      `
    delete from sell_item_category_link where companyId = ? and type = ? and categoryId = ?
    `,
      [businessId, type, categoryId]
    );
  }

  protected unlinkService(businessId, itemId, type = 'S') {
    this.categoryRepo.query(
      `
    delete from sell_item_category_link where companyId = ? and type = ? and itemId = ?
    `,
      [businessId, type, itemId]
    );
  }


  // region prices/variants
   private async savePrices(businessId:number, itemId:number, prices:any[]){

    for(let i = 0; i<prices?.length;i++){
      const price = prices[i];
      const newPrice = this.itemPriceRepo.create()

      newPrice.companyId = businessId;
      newPrice.itemId = itemId;
      newPrice.type = price.type;
      newPrice.priceSell = price.priceSell;
      await newPrice.setTranslationFromLabelObj(price.label)

      await doInsert(newPrice)
    }





   }

   // endregion

}
