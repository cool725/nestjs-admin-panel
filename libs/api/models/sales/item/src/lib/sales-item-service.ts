import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  SaleItemCategoryRepository, SaleItemEmployeeRepository, SaleItemPriceRepository,
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
    private categoryRepo: SaleItemCategoryRepository,
     @InjectRepository(SaleItemEmployeeRepository)
    private employeeRepo: SaleItemEmployeeRepository
  ) {}

  public getServices(companyId, langId, searchOptions) {
    return this.itemRepo.list(companyId, langId, searchOptions);
  }

  public async getService(companyId, itemId) {
    const service = await this.itemRepo.list(companyId, null, {
      itemId,
    })

    if(!service)return service

    service.prices = await this.itemPriceRepo.getPricesFromItem(
        companyId, itemId, service.type
    )

    service.employees = await this.employeeRepo.find(
        { where: {
            companyId, type:service.type ,itemId
          }}
    )

    return service
  }

  /*
   * injects selected language title and description to object
   * */
  public getServiceWithTranslation(companyId, itemId, langId) {
    return this.itemRepo.list(companyId, langId, { itemId });
  }

  public getServiceCategory(companyId, categoryId) {
    return this.categoryRepo.get(categoryId,companyId, null, {
      categoryId,
    });
  }

  public getServiceCategories(companyId, langId, searchOptions) {
    return this.categoryRepo.list(companyId, langId, searchOptions);
  }

  /**
   * Get Categories that parents have been deleted
   * */
  public getServiceCategoriesUnliked() {}

  async saveService(companyId, service) {
    const saleItemEntity = this.itemRepo.create();
    saleItemEntity.type = 'S';
    saleItemEntity.companyId = companyId;
    await doInsert(saleItemEntity);
    return this.updateService(companyId, saleItemEntity.itemId, service);
  }

  async updateService(companyId: number, itemId: number, service) {
    const saleItemEntity = await this.itemRepo.findOne({
      companyId: companyId,
      type: 'S',
      itemId: itemId,
    });
    await saleItemEntity.setTranslationFromLabelObj(service.label);
    await this.saveLinkCategories(companyId, itemId, service.categoriesIds);
    await this.savePrices(companyId, itemId, service.prices);
    await this.saveEmployees(companyId, itemId, service.employees);


    return saleItemEntity.update();
  }

  async saveLinkCategories(companyId, itemId, categoriesIds: number[]) {
    if (categoriesIds) {
      const items = await SaleItemCategoryLinkEntity.find({
        where: {
          companyId: companyId,
          itemId: itemId,
        },
      });
      await Promise.all(items.map((a) => a.remove()));
      for (let i = 0; i < categoriesIds.length; i++) {
        const link = SaleItemCategoryLinkEntity.create();
        link.companyId = companyId;
        link.type = 'S';
        link.categoryId = categoriesIds[i];
        link.itemId = itemId;
        await link.save();
      }
    }
  }

  async deleteService(companyId, itemId) {
    return this.itemRepo
      .findOne({
        where: {
          companyId: companyId,
          type: 'S',
          itemId: itemId,
        },
      })
      .then((item) => (item ? item.remove() : null));
  }

  public async saveServiceCategory(companyId, category) {
    const saleItemCategoryEntity = this.categoryRepo.create();
    saleItemCategoryEntity.companyId = companyId;
    saleItemCategoryEntity.type = 'S';
    await doInsert(saleItemCategoryEntity);
    return this.updateCategoryService(
        companyId,
      saleItemCategoryEntity.categoryId,
      category
    );
  }

  async updateCategoryService(
      companyId: number,
    categoryId: number,
    category
  ) {
    const saleItemCatEntity = await this.categoryRepo.findOne({
      companyId: companyId,
      type: 'S',
      categoryId: categoryId,
    });

    saleItemCatEntity.parentCategoryId = category.parentCategoryId;
    saleItemCatEntity.enabled = category.enabled;
    saleItemCatEntity.color = category.color;
    saleItemCatEntity.setTranslationFromLabelObj(category.label);

    return saleItemCatEntity.update();
  }

  async deleteCategory(companyId: number, categoryId: number) {
    return this.categoryRepo
      .findOne({
        where: {
          companyId: companyId,
          type: 'S',
          categoryId: categoryId,
        },
      })
      .then((item) => (item ? item.remove() : null));
  }

  protected unlinkCategory(companyId, categoryId, type = 'S') {
    this.categoryRepo.query(
      `
    delete from sell_item_category_link where companyId = ? and type = ? and categoryId = ?
    `,
      [companyId, type, categoryId]
    );
  }

  protected unlinkService(companyId, itemId, type = 'S') {
    this.categoryRepo.query(
      `
    delete from sell_item_category_link where companyId = ? and type = ? and itemId = ?
    `,
      [companyId, type, itemId]
    );
  }


  // region prices/variants
   private async savePrices(companyId:number, itemId:number, prices:any[]){

    for(let i = 0; i<prices?.length;i++){
      const price = prices[i];
      const newPrice = this.itemPriceRepo.create()

      newPrice.companyId = companyId;
      newPrice.itemId = itemId;
      newPrice.type = price.type;
      newPrice.priceSell = price.priceSell;

      newPrice.duration = price.duration;

      await newPrice.setTranslationFromLabelObj(price.label)

      await doInsert(newPrice)
    }





   }

   // endregion

  private async saveEmployees(companyId:number, itemId:number, employees){
    await this.employeeRepo.delete({
      companyId:companyId,
      type:'S',
      itemId:itemId
    })
    for ( const key in employees ) {
      if(employees[key]){
        await this.employeeRepo.insert({
          companyId:  companyId,
          type:       'S',
          itemId:     itemId,
          employeeId: employees[key]
        })
      }
    }
  }

}
