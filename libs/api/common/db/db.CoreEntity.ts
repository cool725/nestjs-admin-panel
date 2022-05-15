import { BaseEntity, Column, TableInheritance } from "typeorm";
import { Exclude } from "class-transformer";

@TableInheritance()
export abstract class TenantEntity extends BaseEntity {
  @Exclude() abstract self:any

  @Column({ type: 'bigint', nullable: false, unsigned: true })
  companyId: number;

  protected abstract beforeInsert(): Promise<any>;

  async setLastEntryId(key: string): Promise<number> {
    const lastEntry = await this.self.find({
      order: {
        [key]: 'DESC',
      },
      where: { companyId: this.companyId },
      take: 1,
    });
    this[key] = lastEntry && lastEntry[0] ? +lastEntry[0][key] + 1 : 1;
    return this[key];
  }

  public toJSON() {
    return this;
  }
}
