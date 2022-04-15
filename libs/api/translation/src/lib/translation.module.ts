import { Module } from '@nestjs/common';
import DBTranslationOptions from './db/translation.database';

@Module({
  controllers: [],
  providers: [],
  exports: [],
})
export class TranslationModule {
  static dbSettings = DBTranslationOptions;
}
