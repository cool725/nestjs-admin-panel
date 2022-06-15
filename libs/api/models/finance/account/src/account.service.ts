import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  AccountCategoryRepository,
  AccountRepository,
  AccountTaxRepository,
} from './classes/account.repository';
import { FinAccountCategoryEntity } from './entities/account.category.entity.app';
import { EAccountType } from './classes/account.enum';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(AccountRepository)
    private accountRepo: AccountRepository,
    @InjectRepository(AccountCategoryRepository)
    private categoryRepo: AccountCategoryRepository,
    @InjectRepository(AccountTaxRepository)
    private taxRepo: AccountTaxRepository
  ) {}

  async getCategories(params: {
    companyId: number;
    withAccounts?: boolean;
  }): Promise<FinAccountCategoryEntity[]> {

    if (!params.companyId) {
      throw 'CompanyId is missing';
    }

    const fetchCategories = (parentAccountCategoryId = null) => {
      const queryParams = { companyId: params.companyId };
      if (parentAccountCategoryId)
        queryParams['parentAccountCategoryId'] = parentAccountCategoryId;
      return this.categoryRepo
        .createQueryBuilder()
        .select()
        .where(
          'companyId = :companyId ' +
            (parentAccountCategoryId
              ? ' and parentAccountCategoryId = :parentAccountCategoryId'
              : 'and parentAccountCategoryId is null'),
          queryParams
        )
        .getMany();
    };

    const baseCategories = await fetchCategories();

    const getChildren = async (base) => {
      if (!base) return base;
      for (let i = 0; i < base.length; i++) {
        const category = base[i];
        category.accounts =
          (await this.getAccounts(params.companyId,{
            accountCategoryId: category.uuId,
          })) || [];
        category.categories = (await fetchCategories(category.uuId)) || [];
        if (category.categories) {
          for (let childI = 0; childI < category.categories.length; childI++) {
            category.categories = await getChildren(category.categories);
          }
        }
      }

      return base;
    };

    return await getChildren(baseCategories);
  }

  async getAccounts(  companyId: number, params: {

    accountCategoryId?: string;
    type?: EAccountType;
  }) {

    if (companyId) {
      throw 'companyId is missing: 1';
    }

    const query = this.accountRepo
      .createQueryBuilder()
      .select()
      .orderBy('code')
      .where('companyId = :companyId', { companyId: companyId });

    if (params.accountCategoryId) {
      query.andWhere('accountCategoryId = :accountCategoryId', {
        accountCategoryId: params.accountCategoryId,
      });
    }

    if (params.type) {
      query.andWhere('type = :type', {
        type: params.type,
      });
    }

    return query.getMany();
  }

  async getTaxes(params: { companyId: number }) {
    return this.taxRepo.find({
      where: {
        companyId: params.companyId,
      },
    });
  }

  async getTAccounts(params: {
    companyId: number;
    accountCategoryId?: string;
  }) {
    const results = {
      debits: await this.getAccounts(params.companyId,{
        ...params,
        type: EAccountType.active_accounts,
      }).then(AccountService.arrayToJSON),
      credits: await this.getAccounts(params.companyId,{
        ...params,
        type: EAccountType.passive_accounts,
      }).then(AccountService.arrayToJSON),
    };
    return results;
  }

  static arrayToJSON(array) {
    return array.map((entry) => entry.toJSON());
  }
}
