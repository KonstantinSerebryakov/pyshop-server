import { IUser, IUserPublic, IUserUpdate } from '@app/interfaces';
import { compare, genSalt, hash } from 'bcryptjs';
import {
  Exclude,
  Transform,
  classToPlain,
  classToPlainFromExist,
  instanceToPlain,
} from 'class-transformer';

export class UserEntity implements IUser {
  id?: string;
  email: string;
  passwordHash: string;

  public static get Empty(): UserEntity {
    return new UserEntity({
      email: '',
      passwordHash: '',
    });
  }

  constructor(user: IUser) {
    this.id = user.id;
    this.email = user.email;
    this.passwordHash = user.passwordHash;
  }

  public async getPublic(): Promise<IUserPublic> {
    return {
      id: this.id,
      email: this.email,
    };
  }

  public async getUpdate(): Promise<IUserUpdate> {
    return {
      email: this.email,
      passwordHash: this.passwordHash,
    };
  }

  public async setPassword(password: string) {
    const salt = await genSalt(10);
    const pass = await hash(password, salt);
    this.passwordHash = await hash(password, salt);
  }

  public async validatePassword(password: string) {
    return compare(password, this.passwordHash);
  }
}
