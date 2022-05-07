import {
  BaseEntity,
  Column,
  Entity,
  Index,
  PrimaryColumn, Unique,

} from 'typeorm';


@Entity('com_company_index')
@Index(['businessId','tableName'])
@Unique(['businessId','tableName'])
export class BusinessTableIndexEntity extends BaseEntity {
  @PrimaryColumn({ primary: false , unsigned:true})
  businessId: number;

  @Column()
  tableName: string;

  @Column({type:'bigint',unsigned:true,default:1})
  tableIndex: number;


  public static getNexId( businessId:number,tableName:string,){
    return BusinessTableIndexEntity.query(`
      select max(tableIndex) as id from com_company_index where companyId = ? and tableName = ?
    `,[businessId,tableName]).then(r => r.id || 1)
  }
}
