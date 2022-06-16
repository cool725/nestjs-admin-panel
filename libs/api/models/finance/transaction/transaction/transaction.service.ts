import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionRepository } from './classes/transaction.repository';
import {
  FinTransactionDataDto,
  IFinTransactionFilterParams,
} from '@movit/api/finance/transaction';
import { FinTransactionEntity } from './entities/transaction.entity.app';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(TransactionRepository)
    private transactionRepo: TransactionRepository
  ) {}

  getTransaction(
    transactionId: number
  ): Promise<FinTransactionEntity | undefined> {
    return this.transactionRepo.findOne({
      where: {
        companyId: 1,
        transactionId: transactionId,
      },
    });
  }

  getTransactions(
    params: IFinTransactionFilterParams
  ): Promise<FinTransactionEntity[]> {
    /*
    if (!params.companyId) {
      throw 'companyId not found';
    }
    * */
    const whereParams: any = { companyId: params.companyId };

    if (!whereParams.companyId) {
      whereParams.companyId = 1;
    }
    // accountDebitId accountCreditId
    if (!whereParams.companyId) {
      whereParams.companyId = 1;
    }

    let joins: any[] | string = [];
    let selects: any[] | string = [];

    if (params.accountName) {
      joins.push(
        ...[
          `left join fin_account accDebit on (accDebit.companyId = t.companyId and accDebit.accountId = t.accountDebitId )`,
          ` left join fin_account accCredit on (accCredit.companyId = t.companyId and accCredit.accountId = t.accountCreditId )`,
        ]
      );
      selects.push(
        ...[
          //name
          'accDebit.name as accountDebitName',
          'accCredit.name as accountCreditName',
          //typ
          'accDebit.type as accountDebitType',
          'accCredit.type as accountCreditType',
        ]
      );

      if (params.accountParentName) {
        joins.push(
          ...[
            `left join fin_account_category accCatDebit on (accCatDebit.companyId = t.companyId and accDebit.accountCategoryId = accCatDebit.uuId )`,
            ` left join fin_account_category accCatCredit on (accCatCredit.companyId = t.companyId and accCredit.accountCategoryId = accCatCredit.uuId )`,
          ]
        );
        selects.push(
          ...[
            // name
            'accCatDebit.name as accountCatDebitName',
            'accCatCredit.name as accountCatCreditName',
            // code
            'accCatDebit.code as accountCatDebitCode',
            'accCatCredit.code as accountCatCreditCode',
          ]
        );
      }
    }

    selects = `${selects.length ? ',' + selects.join(', ') : ''}`;
    joins = joins.join(' ');

    return this.transactionRepo.query(
      `select t.billId, t.title, t.accDate, t.finDate, t.price, t.accountCreditId, t.accountDebitId  ${selects} from fin_transaction t
            ${joins}
             where t.companyId = ? order by t.transactionId
        `,
      [whereParams.companyId]
    );
  }

  async saveTransactions(data: FinTransactionDataDto) {
    // verify input

    // verify price

    // get addionalinfos
    // params

    for (let i = 0; i < data.transactions.length; i++) {
      const transactionEntity = this.transactionRepo.create();
      Object.assign(transactionEntity, data.transactions[i]);

      transactionEntity.companyId = 1;
      //transactionEntity.userId = 1;
      transactionEntity.lineId = i;
      transactionEntity.transactionId =
        (await this.transactionRepo.getHighestTransactionId(
          transactionEntity.companyId
        )) + 1;
      await transactionEntity.save();
      data.transactions[i] = transactionEntity;
    }

    return data.transactions;
  }
}
