import { Exclude, instanceToPlain } from 'class-transformer';

import {
  BaseEntity,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

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
}
