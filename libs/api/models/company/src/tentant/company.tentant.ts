import { BaseEntity, Column, TableInheritance } from 'typeorm';
import { classToPlain, Exclude } from 'class-transformer';

@TableInheritance()
export abstract class TenantCompanyEntity extends BaseEntity {
  @Exclude() protected abstract self: any; // Child entity. This is required because child entity will be registered for queries

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
    return classToPlain(this);
  }
}

@TableInheritance()
export class TenantCompanyTranslatableEntity extends TenantCompanyEntity {
  protected self: any;

  protected beforeInsert(): Promise<any> {
    return Promise.resolve(undefined);
  }
}
