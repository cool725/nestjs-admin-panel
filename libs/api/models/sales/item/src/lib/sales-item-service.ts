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

  public async getServicesGrouped(companyId, langId, searchOptions) {

    // get all categories grouped
    const categories = await this.getServiceCategories(companyId,langId, {
      ...searchOptions ,grouped:true})

    // fetch category services and its children services
    let maxIteration = 10000;
    const fetchCategoryServices = async (category) => {
      if (category.children?.length && maxIteration) {
        for (const subcategory of category.children) {
          maxIteration--;
          await fetchCategoryServices(subcategory)
        }
      }
      const services = await this.itemRepo.list(companyId, langId, {...searchOptions, categoryId: category.categoryId});
      category.items = services ? services.data : []

    }

    for (const category of categories.data) await fetchCategoryServices(category)


    return categories
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
    this.itemPriceRepo.find({
      where: {
        companyId: companyId,
        type: 'S',
        itemId: itemId,
      }})
      .then(items => {items.map(item => item.removeTranslations())});

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

    for(let i = 0; i< prices?.length;i++){
      const price = prices[i];

      // todo refactore dupplicate code
      // todo verify if price is valid types
      if(price.priceId){
        const priceOld = await this.itemPriceRepo.findOne({
          where:{
            companyId:companyId,
            itemId:itemId,
            type:price.type,
            priceId:price.priceId,

          }
        });

        if(priceOld){

          priceOld.companyId = companyId;
          priceOld.itemId = itemId;
          priceOld.type = price.type;
          priceOld.priceSell = price.priceSell;
          priceOld.duration = price.duration;
          priceOld.crmPriceClassId = price.crmPriceClassId || null;
          priceOld.setTranslationFromLabelObj(price.label)

          await priceOld.update()
        }
      }else {
        const newPrice = this.itemPriceRepo.create()
        newPrice.companyId = companyId;
        newPrice.itemId = itemId;
        newPrice.type = price.type;
        newPrice.priceSell = price.priceSell;
        newPrice.duration = price.duration;
        newPrice.crmPriceClassId = price.crmPriceClassId  || null;;
        await newPrice.setTranslationFromLabelObj(price.label)
        await doInsert(newPrice)
      }

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
