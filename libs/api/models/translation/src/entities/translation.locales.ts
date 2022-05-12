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
 * Locales for Application
 * */
@Entity('translation_locale')
@Index(['languageId'])
@Index(['languageId', 'section'])
@Unique(['languageId', 'section', 'key'])
export class TranslationLocaleEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  translationId: number;

  @Column({ type: 'smallint', nullable: false })
  languageId: number;

  @Column({ type: 'char', length: 30, nullable: true })
  section?: string;

  @Column({ type: 'char', length: 20 })
  key: string;

  @Column({ type: 'varchar', length: 150 })
  value: string;

  public toJSON() {
    return instanceToPlain(this);
  }
}
