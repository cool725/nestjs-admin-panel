import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  Generated,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { BusinessUserRolesEntity } from './business.users.roles.entity.app';

@Entity('com_company')
export class BusinessEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  @Exclude()
  businessId: number;

  @Column({ unique: true })
  @Generated('uuid')
  businessUuId: string;

  @Column({ type: 'varchar', nullable: false, length: 100 })
  titleFull: string;

  @Column({ type: 'varchar', nullable: true, length: 255 })
  address?: string;

  @Column({ type: 'varchar', nullable: true, length: 9 })
  postCode?: string;

  @Column({ type: 'varchar', nullable: true, length: 9 })
  city?: string;

  @Column({
    type: 'enum',
    nullable: false,
    enum: [
      'soleProprietorship',
      'joint_partnership',
      'foundation',
      'corporation',
      'limitedLiabilityCompany',
      'association',
    ],
  })
  legalForm: [
    'soleProprietorship',
    'joint_partnership',
    'foundation',
    'corporation',
    'limitedLiabilityCompany',
    'association'
  ];

  @Column({ type: 'varchar', nullable: true, length: 40 })
  contactPersonFirstName?: string;

  @Column({ type: 'varchar', nullable: true, length: 12 })
  contactPhone?: string;

  @Column({ type: 'varchar', nullable: true, length: 255 })
  @Index('app_companyId')
  logoSrc?: string;

  @Column({ type: 'varchar', nullable: true, length: 255 })
  bannerSrc?: string;

  @Column({ type: 'varchar', nullable: true, length: 255 })
  pageSrc?: string;

  // Finances
  @Column({ type: 'boolean', nullable: false, default: false })
  vatEnabled: boolean;

  @Column({ type: 'varchar', nullable: true, length: 50 })
  vatNumber: boolean;

  @Column({ type: 'int', nullable: false, precision: 4 })
  taxIncomeId: number;

  @Column({ type: 'int', nullable: false, precision: 4 })
  taxExpenseId: number;

  //Options
  @Column({ type: 'boolean', nullable: false, default: false })
  testMode?: boolean;

  @Column({ type: 'int', precision: 5 })
  @Index()
  @Exclude()
  createdAt: number;

  @OneToMany(() => BusinessUserRolesEntity, (role) => role.business)
  roles: BusinessUserRolesEntity[];

  constructor(params: Partial<BusinessEntity> = {}) {
    super();
    this.initialise(params);
  }

  @BeforeInsert()
  private beforeInsert() {
    this.createdAt = new Date().getFullYear();
  }

  protected initialise(params: Partial<BusinessEntity>) {
    if (params) Object.assign(this, params);
  }

  toSimpleJson() {
    return this;
  }
}
