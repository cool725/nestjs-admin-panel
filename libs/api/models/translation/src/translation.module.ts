import { Module } from '@nestjs/common';
import DBTranslationOptions from './db/translation.database';
import { LocalesRepository } from './classes/locales.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocalesService } from './locales.service';

@Module({
  imports: [TypeOrmModule.forFeature([LocalesRepository])],
  providers: [LocalesService],
  exports: [LocalesService],
})
export class TranslationModule {
  static dbSettings = DBTranslationOptions;
}
