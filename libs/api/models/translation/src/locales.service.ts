import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LocalesRepository } from './classes/locales.repository';

@Injectable()
export class LocalesService {
  constructor(
    @InjectRepository(LocalesRepository)
    private repo: LocalesRepository
  ) {}

  getAllLocales() {
    let data = {};
    const langName = {
      1: 'de',
      2: 'en',
    };
    return this.repo.find().then((rows) => {
      rows.map((obj) => {
        const langItem = {
          key: obj.key,
          value: obj.value,
          languageId: obj.languageId,
          section: obj.section,
        };

        if (data[obj.section]) {
          if (data[obj.section][langName[obj.languageId]]) {
            data[obj.section][langName[obj.languageId]][obj.key] = langItem;
          } else {
            data[obj.section][langName[obj.languageId]] = {};
            data[obj.section][langName[obj.languageId]][obj.key] = langItem;
          }
        } else {
          data[obj.section] = {};
          data[obj.section][langName[obj.languageId]] = {};
          data[obj.section][langName[obj.languageId]][obj.key] = langItem;
        }
      });
      return data;
    });
  }

  createLocaleValue(
    key: string,
    translation: string,
    languageId: number,
    section: string | null = null
  ) {
    return this.repo.upsert(
      {
        languageId,
        value: translation || '',
        key,
        section,
      },
      ['languageId', 'section', 'key']
    );
  }

  updateLocaleValue(key, translation, lang, section) {
    return this.createLocaleValue(key, translation, lang, section);
  }
}
