import { EntityRepository, Repository } from 'typeorm';
import { TranslationLocaleEntity } from '../entities/translation.locales';

@EntityRepository(TranslationLocaleEntity)
export class LocalesRepository extends Repository<TranslationLocaleEntity> {
  constructor() {
    super();
  }
}
