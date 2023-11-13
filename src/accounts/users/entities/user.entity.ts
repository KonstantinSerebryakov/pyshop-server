import { IUser, IUserCreate, IUserPublic, IUserUpdate } from '@app/interfaces';
import { compare, genSalt, hash } from 'bcryptjs';
import { UserInfoEntity } from './user-info.entity';
import { UnauthorizedException } from '@nestjs/common';

export class UserEntity implements IUser {
  id?: string;
  email?: string;
  passwordHash?: string;
  userInfo?: UserInfoEntity;

  static get Empty(): UserEntity {
    return new UserEntity({ email: '', passwordHash: '' });
  }

  constructor(user: IUser) {
    Object.assign(this, user);
    this.userInfo = user.userInfo
      ? new UserInfoEntity(user.userInfo)
      : undefined;
  }

  public getPublic(): IUserPublic {
    return { id: this.id, email: this.email };
  }

  public getCreate(): IUserCreate {
    if (!this.passwordHash || !this.email)
      throw Error('missed required fields');
    return { email: this.email, passwordHash: this.passwordHash };
  }

  public getUpdate(): IUserUpdate {
    return { email: this.email, passwordHash: this.passwordHash };
  }

  public async getNested(): Promise<IUser> {
    return {
      ...this.getPublic(),
      userInfo: this.userInfo ? await this.userInfo.getNested() : undefined,
    };
  }

  public async setPassword(password: string) {
    const salt = await genSalt(10);
    this.passwordHash = await hash(password, salt);
  }

  public async validatePassword(password: string): Promise<boolean> {
    if (!this.passwordHash) throw Error('missed passwordHash field');
    const isValid = compare(password, this.passwordHash);
    if (!isValid) {
      throw new UnauthorizedException(
        'Authorization failed. The password or email are incorrect.',
      );
    }
    return isValid;
  }
}

// import { IUser, IUserPublic, IUserUpdate } from '@app/interfaces';
// import { compare, genSalt, hash } from 'bcryptjs';
// import { UserInfoEntity } from './user-info.entity';
// import { DataEntity } from '@app/interfaces/interfaces/data-entity.interface';

// export class UserEntity implements DataEntity, IUser {
//   id?: string;
//   email: string;
//   passwordHash: string;

//   userInfo?: UserInfoEntity;

//   public static get Empty(): UserEntity {
//     return new UserEntity({
//       email: '',
//       passwordHash: '',
//     });
//   }

//   constructor(user: IUser) {
//     this.id = user.id;
//     this.email = user.email;
//     this.passwordHash = user.passwordHash;
//     if (user.userInfo) {
//       this.userInfo = new UserInfoEntity(user.userInfo);
//     }
//   }

//   public async getPublic(): Promise<IUserPublic> {
//     return {
//       id: this.id,
//       email: this.email,
//     };
//   }

//   public getCreate() {
//     return {
//       id: this.id,
//       email: this.email,
//       passwordHash: this.passwordHash,
//     };
//   }

//   public getUpdate(): IUserUpdate {
//     return {
//       email: this.email,
//       passwordHash: this.passwordHash,
//     };
//   }

//   public async getNested(): Promise<IUser> {
//     return {
//       id: this.id,
//       email: this.email,
//       passwordHash: this.passwordHash,
//       userInfo: await this.userInfo.getNested(),
//     };
//   }

//   public async setPassword(password: string) {
//     const salt = await genSalt(10);
//     this.passwordHash = await hash(password, salt);
//   }

//   public async validatePassword(password: string) {
//     return compare(password, this.passwordHash);
//   }
// }
