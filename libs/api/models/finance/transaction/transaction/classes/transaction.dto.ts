import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { FinTransactionEntity } from '../entities/transaction.entity.app';

export class FinTransactionDataDto {
  transactions: FinTransactionEntity[];
}
