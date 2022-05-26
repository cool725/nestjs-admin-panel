import { EntityRepository, IsNull, Repository } from 'typeorm';
import { AppsEntity } from '../entities/start.entity.app';
import { AppsCategoryEntity } from '../entities/start.entity.category';

// TODO Rename repository

@EntityRepository(AppsEntity)
export class StartRepositoryApps extends Repository<AppsEntity> {
  constructor() {
    super();
  }

  public getPublicApps(options): Promise<AppsCategoryEntity[]> {
    const queryBuilder: any = {
      companyId: IsNull(),
    };

    if (options.domain) queryBuilder.domain = options.domain;

    return AppsCategoryEntity.find({
      where: queryBuilder,
    });
  }

  public getBusinessAppsSimple(options): Promise<AppsCategoryEntity[]> {
    const queryBuilder: any = {
      companyId: options.companyId || options.businessId ||  -1,
    };
    if (options.domain) queryBuilder.domain = options.domain;
    return AppsEntity.find({
      where: queryBuilder,
      relations: ['category'],
    });
  }

  public async getAppsAsMenu(params): Promise<any> {
    if (params.domain) params.domain = params.domain || -1;
    if (!params.companyId) params.companyId = params.companyId || IsNull();
    let maxDepth = 1000; // protection of recursive

    const allowedApps = (
      await this.query(
        `select distinct appId from app_role_rights apps
                             left join app_user_rights user
                                       on apps.companyId = user.companyId
                                           and apps.roleId = user.roleId
       where user.companyId = ?  and  user.userId = ? `,
        [params.companyId, params.userId]
      )
    ).map((allowedApps) => allowedApps.appId);

    const fetchCategories = (parentCategoryId) => {
      if (!parentCategoryId) return [];
      const queryParams = {
        domain: params.domain,
        companyId: params.companyId,
        parentCategoryId: parentCategoryId,
      };
      if (parentCategoryId) queryParams['parentCategoryId'] = parentCategoryId;

      return AppsCategoryEntity.find({
        where: [
          {
            domain: queryParams.domain,
            companyId: queryParams.companyId,
            parentCategoryId: queryParams.parentCategoryId,
          },
          {
            domain: queryParams.domain,
            companyId: IsNull(),
            parentCategoryId: queryParams.parentCategoryId,
          },
        ],
      });
    };

    const baseCategories = await fetchCategories(IsNull());

    const filterApps = (apps: AppsEntity[]) =>
      apps.filter((app) => allowedApps.includes(app.appId));

    const getChildren = async (base) => {
      if (!base || maxDepth < 0) return base;

      for (let i = 0; i < base.length; i++) {
        const category = base[i];

        // get children and filter apps
        category.children = (await fetchCategories(category.categoryId)) || [];
        if (category.apps) category.apps = filterApps(category.apps);

        if (maxDepth >= 0 && category.children)
          category.children = await getChildren(category.children);

        // Merge apps to children (Navigation)
        category.children.push(...(category.apps || []));

        // Delete non used valued
        delete category.apps;
        delete category.parentCategoryId;
      }

      maxDepth--;
      return base;
    };

    return getChildren(baseCategories);
  }
}
