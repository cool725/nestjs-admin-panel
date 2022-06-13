import { EntityRepository, Repository } from 'typeorm';
import { FinTransactionEntity } from '../entities/transaction.entity.app';

@EntityRepository(FinTransactionEntity)
export class TransactionRepository extends Repository<FinTransactionEntity> {
  constructor() {
    super();
  }

  getHighestTransactionId(companyId: number) {
    return FinTransactionEntity.getHighestTransactionId(companyId);
  }
}
