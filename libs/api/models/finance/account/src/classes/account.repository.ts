import { EntityRepository, IsNull, Repository } from 'typeorm';
import { FinAccountEntity } from '../entities/account.entity.app';
import { FinAccountCategoryEntity } from '../entities/account.category.entity.app';
import { FinAccountTaxEntity } from '../entities/account.tax.entity.app';

@EntityRepository(FinAccountEntity)
export class AccountRepository extends Repository<FinAccountEntity> {
  constructor() {
    super();
  }
}

@EntityRepository(FinAccountCategoryEntity)
export class AccountCategoryRepository extends Repository<FinAccountCategoryEntity> {
  constructor() {
    super();
  }
}

@EntityRepository(FinAccountTaxEntity)
export class AccountTaxRepository extends Repository<FinAccountTaxEntity> {
  constructor() {
    super();
  }
}
