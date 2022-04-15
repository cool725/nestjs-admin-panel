import { EntityRepository, Repository } from 'typeorm';
import { IAuthUser } from '../interfaces/auth.interface.user';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { EAuthUserErrorCode } from '../interfaces/auth.enum.user';
import { AuthUserCredentialsDto } from './auth.dto.user.credentials';
import { AuthLogin } from '../entities/auth.entity.login';
import { AuthUser } from '../entities/auth.entity.user';
import { IAuthJtwPayload } from '../jtw/auth.jtw.interface';
import { AuthRepositoryUUId } from './auth.repository.uuId.user';

@EntityRepository(AuthUser)
export class AuthRepositoryUser extends Repository<AuthUser> {
  public readonly saveUuIdToken: boolean = true; // todo: handle false

  private uuIdRepo: AuthRepositoryUUId;

  constructor() {
    super();
    if (this.saveUuIdToken) this.uuIdRepo = new AuthRepositoryUUId();
  }

  // region sign
  // todo return user
  public async signUp(
    userDto: Partial<IAuthUser>
  ): Promise<{ userId: string }> {
    const { password, email } = userDto;
    const self = AuthRepositoryUser;

    if (!email) {
      throw new InternalServerErrorException('Parameter missing: Email');
    }

    if (!password) {
      throw new InternalServerErrorException('Parameter missing: Password');
    }

    const user = AuthUser.create();
    await user
      .setEmail(email)
      .setSalt(await bcrypt.genSalt())
      .setPassword(await self.hashPassword(<string>password, <string>user.salt))
      .setAuthCreatedAt()
      .save()
      .catch(self.onError);

    if (!user.userId) {
      throw new InternalServerErrorException('Saving user Failed');
    }

    // todo clean this up
    try {
      const customData = <any>userDto;
      user.firstName = customData['firstName'];
      user.lastName = customData['lastName'];
      user.phone = customData['phone'];
      user.save();
    } catch (e) {
      console.warn(e);
    }

    return { userId: user.userId };
  }

  public async signOf() {
    console.warn('AuthRepositoryUser:signOf not implemented');
  }
  // endregion

  // region uuId
  public async registerUuId(
    uuId: string,
    authUser: AuthUser,
    clearEntries: boolean
  ): Promise<string | null> {
    if (this.saveUuIdToken) {
      if (clearEntries) {
        await this.uuIdRepo.unRegisterUuIdFromUser(uuId, authUser.userId);
      }
      return this.uuIdRepo.registerUuId(uuId, authUser);
    } else {
      return '';
    }
  }

  public async unRegisterUuIdFromUser(uuId: string, userId: string) {
    if (uuId && this.saveUuIdToken) {
      return this.uuIdRepo.unRegisterUuIdFromUser(uuId, userId);
    }
  }

  public async findUuId(id: number | string): Promise<AuthLogin | null> {
    if (this.saveUuIdToken) {
      return this.uuIdRepo.findUuId(id);
    }
    return null;
  }

  public async findUuIdByPayload(
    payload: IAuthJtwPayload
  ): Promise<AuthLogin | null> {
    if (this.saveUuIdToken) {
      return this.uuIdRepo.findUuIdByPayload(payload);
    }
    return null;
  }
  // endregion

  public async validateUserPassword(
    authCredentialsDto: AuthUserCredentialsDto
  ): Promise<AuthUser | null> {
    const { email, password } = authCredentialsDto;
    const user = await AuthUser.findOne({ email });
    return user && (await user.validatePassword(password)) ? user : null;
  }

  public findAuthUserByEmail(email: string): Promise<AuthUser | undefined> {
    return AuthUser.findOne({ email });
  }

  public async resetPasswordByEmail(
    email: string,
    password: string,
    authUser: AuthUser | undefined = undefined
  ) {
    authUser = authUser || (await AuthUser.findOne({ email }));

    if (!authUser) return null;

    authUser.passwordResetLink = null;

    return this.save(
      authUser
        .setSalt(await bcrypt.genSalt())
        .setPassword(
          await AuthRepositoryUser.hashPassword(
            <string>password,
            <string>authUser.salt
          )
        )
    );
  }

  private static async hashPassword(
    password: string,
    salt: string
  ): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  private static onError(error: any) {
    if (EAuthUserErrorCode.duplicateUsername == error.errno) {
      throw new ConflictException('Username already exists');
    } else {
      throw new InternalServerErrorException(error);
    }
  }

  unRegisterUuIdById(uuId: string, id: number) {
    return this.uuIdRepo.unRegisterUuIdById(uuId, id);
  }
}
