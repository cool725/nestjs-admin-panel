import {
  Column,
  Entity, Index, JoinColumn, OneToOne,
  PrimaryGeneratedColumn, Unique
} from "typeorm";
import { TenantCompanyEntity } from "@movit/api/business";
import { AuthUserEntity } from "@movit/api/auth";

@Entity('emp_employee')
@Index(['companyId'])
@Unique(['companyId', 'employeeId'])
@Unique(['companyId', 'email'])
export class EmployeeEntity extends TenantCompanyEntity  {
  protected self: any  = EmployeeEntity;

  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column({ type: 'bigint', nullable: false, unsigned: true })
  employeeId: string;

  @OneToOne(() => AuthUserEntity ,{
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({name:'userId'})
  user: AuthUserEntity;

  @Column({ type: 'varchar', length: 50, nullable: true })
  firstName: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  lastName: string;

  @Column({ length: 100 })
  email: string;

  async beforeInsert(): Promise<any> {
    await this.setLastEntryId('employeeId');
  }
}
