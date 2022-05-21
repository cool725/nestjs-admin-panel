import { instanceToPlain } from 'class-transformer';

import {
  BaseEntity,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

/*
 * Translation for Items/Products/Services ect
 * */
@Entity('translation_label')
@Index(['companyId', 'languageId', 'type'])
@Unique(['companyId', 'languageId', 'type', 'key', 'id'])
export class TranslationLabelEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  translationId: number;

  @Column({ type: 'bigint' })
  companyId: number;

  @Column({ type: 'smallint' })
  languageId: number;

  @Column({ type: 'char', length: 20 })
  type: string;

  @Column({ type: 'char', length: 20 })
  key: string;

  @Column({ type: 'varchar', length: 150 })
  value: string;

  @Column({ type: 'bigint', nullable: false })
  id: number;

  item;

  static DBSplitter = ':$:';

  public toJSON() {
    return instanceToPlain(this);
  }

  assign(object: {
    id: any;
    key: string;
    value: string;
    languageId: number;
    companyId: number;
    type: string;
  }) {
    return Object.assign(this, object);
  }

  /*
  * Creates a multi level string keypair
  * baseItem | target for the keypair build
  * row | must inlcude row.labels (will be refactored)
  * splitBy seperator of words
  * keyReplace: replace the key by given value; ex: cat:
  * */
  static createTranslationObjectByRow(baseItem, row = baseItem, splitBy = '@@,@@' , keyReplace = undefined){
    if(!row.labels)return baseItem;
    const keyParis = row.labels.split(splitBy)
    keyParis.forEach(keyPair => {
      let [key, value] = keyPair.split(
          TranslationLabelEntity.DBSplitter
      );

      key = keyReplace ? key.replace(keyReplace, '') : key;

      if(!row.label) row.label = {}
      if(!row.label[key]) row.label[key] = {}
      baseItem.label[key][row.languageId] =  value

    });
    return baseItem
  }
}
