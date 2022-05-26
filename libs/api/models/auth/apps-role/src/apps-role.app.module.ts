import DBStartOptions from './db/apps.database';
import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StartRepositoryApps } from './classes/start.repository.apps';
import { AppRoleService } from './apps-role.service';
import { AppRoleRepositoryApps } from './classes/repository.roles';
import { AppsRoleRightsEntity } from './entities/start.entity.role.rights';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
      StartRepositoryApps,
      AppRoleRepositoryApps,
      AppsRoleRightsEntity,
    ]),
  ],
  providers: [AppRoleService],
  controllers: [],
  exports: [AppRoleService],
})
export class AppsModule {
  static dbSettings = DBStartOptions;
}
