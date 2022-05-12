import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { doInsert } from '../../../common/db/utils/db.utils';
import {LocalesRepository} from "./classes/locales.repository";

@Injectable()
export class LocalesService {
  constructor(
    @InjectRepository(LocalesRepository)
    private localesRepo: LocalesRepository,
  ) {}
}
