import { EntityRepository, Repository } from 'typeorm';
import { AuthTemplate } from './../entities/auth.entity.templates';

@EntityRepository(AuthTemplate)
export class AuthRepositoryTemplate extends Repository<AuthTemplate> {
  async getTemplate(
    key: string,
    lang: string,
    companyId: any = undefined
  ): Promise<Partial<AuthTemplate>> {
    const where: any = {
      name: key,
      lang: lang,
    };

    if (companyId) where['companyId'] = companyId;
    return (
      (await this.findOne({
        where: where,
      })) || { template: '' }
    );
  }
}
