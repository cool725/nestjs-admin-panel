import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {LocalesRepository} from "./classes/locales.repository";

@Injectable()
export class LocalesService {
  constructor(
    @InjectRepository(LocalesRepository)
    private repo: LocalesRepository,
  ) {}

  getAllLocales(){
    return this.repo.find();
  }

  createLocaleValue(key:string, translation:string ,languageId:number, section:string | null = null){
   return this.repo.upsert( {
      languageId ,
      value:translation,
      key,
      section
    } ,[
        'companyId','languageId', 'section','key',
    ])
  };

  updateLocaleValue(key, translation ,lang, section){
    return this.createLocaleValue(
        key,translation,lang,section
    )
  };

}
