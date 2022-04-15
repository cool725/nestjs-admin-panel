import { AuthUser } from '../entities/auth.entity.user';
import { AuthLogin } from '../entities/auth.entity.login';
import { IAuthJtwPayload } from '../jtw/auth.jtw.interface';
import { InternalServerErrorException } from '@nestjs/common';

export class AuthRepositoryUUId {
  public async registerUuId(
    uuId: string,
    authUser: AuthUser
  ): Promise<string | null> {
    const login = new AuthLogin({
      uuId: uuId,
      authCreatedAt: authUser.authCreatedAt,
      user: authUser,
    });

    await login.save().catch((err) => {
      if (err.errno === 1062 /*Duplicate*/) {
        return login.reload();
      } else {
        return AuthRepositoryUUId.onError(err);
      }
    });

    return login.id ? login.id + '' : null;
  }

  public async unRegisterUuId(uuId: string | number) {
    if (uuId) {
      return AuthLogin.delete(<any>{
        where: {
          uuId: uuId,
        },
      }).catch(AuthRepositoryUUId.onError);
    }
  }

  public unRegisterUuIdById(uuId: string, id: number) {
    if (uuId) {
      return AuthLogin.delete({
        uuId: uuId,
        id: id,
      }).catch(AuthRepositoryUUId.onError);
    }
    return;
  }
  public async unRegisterUuIdFromUser(uuId: string, userId: string) {
    if (uuId) {
      return AuthLogin.delete({
        uuId: uuId,
        user: {
          userId: userId,
        },
      }).catch(AuthRepositoryUUId.onError);
    }
  }

  public async findUuId(id: string | number): Promise<AuthLogin> {
    return AuthRepositoryUUId.find({ id });
  }

  public async findUuIdByPayload(payload: IAuthJtwPayload): Promise<AuthLogin> {
    return AuthRepositoryUUId.find({
      authCreatedAt: payload.authCreatedAt,
      uuId: payload.uuId,
      user: payload.sub,
      id: payload.id,
    });
  }

  private static find(params: any): Promise<AuthLogin> {
    return AuthLogin.findOne(params);
  }

  static onError(error: any) {
    throw new InternalServerErrorException(error);
  }
}
