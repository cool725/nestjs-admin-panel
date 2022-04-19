import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  Generated,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn, Unique,
} from 'typeorm';
import { Exclude } from 'class-transformer';


@Entity('crm_profile')
export class ProfileEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  @Exclude()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  firstName: string;

  @Column({ type: 'varchar', length: 50 })
  lastName: string;

  @Column({ type: 'varchar', length: 100 })
  email: string;

  @Column({ type: 'varchar', length: 15 })
  phone: string;


  constructor() {
    super();

  }

  @BeforeInsert()
  private beforeInsert() {

  }


  toJSON() {
    return this;
  }
}
