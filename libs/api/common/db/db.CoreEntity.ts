import { BaseEntity, Column } from 'typeorm';

export abstract class TenantEntity extends BaseEntity {
  @Column({ type: 'bigint', nullable: false, unsigned: true })
  companyId: number;

  protected abstract beforeInsert(): Promise<any>;

  async setLastEntryId(key: string): Promise<number> {
    const lastEntry = await TenantEntity.find({
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
