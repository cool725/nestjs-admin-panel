import { CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthUserEntity } from '@movit/api/auth';

export const AppsRolesGuard: (...types: number[]) => any = createAppsRolesGuard;

function createAppsRolesGuard(...ids: number[]) {
  return class MixinAppsRoleGuard implements CanActivate {
    protected getData(context): {
      user: AuthUserEntity;
      business: { companyId: any };
    } {
      const { user, _company } = context.switchToHttp().getRequest();
      console.warn('verify companyId in createAppsRolesGuard')
      return {
        user,
        business: {
          companyId: _company.companyId,
        },
      };
    }

    protected getAccess(companyId, userId, appIds: number[]): Promise<string> {
      let questionMarks = appIds.map((id) => '? ').join(',');
      return AuthUserEntity.query(
        `select group_concat(arr.access) as access from app_user_rights aur
                    left join app_role_rights arr on
                     arr.companyId = aur.companyId and
                      arr.roleId =  aur.roleId
         where aur.companyId = ? and aur.userId = ? and appId in (${questionMarks})`,
        [companyId, userId, appIds]
      ).then((r) => (r[0] ? r[0].access.split(',') : []));
    }

    protected hasMethodAccess(appAccess, reqMethod) {
      if (appAccess.includes('root')) return true;
      if (appAccess.includes('delete')) return true;
      if (appAccess.includes('read') && reqMethod === 'GET') return true;
      if (appAccess.includes('write') && reqMethod != 'DELETE') return true;
      return false;
    }

    async canActivate(context: ExecutionContext) {
      const { user, business } = this.getData(context);
      const req = context.switchToHttp().getRequest();

      const access = await this.getAccess(
        business.companyId,
        user.userId,
        ids
      );

      return this.hasMethodAccess(access, req.method);
    }
  };
}
