import { IUserInfo } from './user-info.interface';

export interface IUser {
  id?: string;
  email?: string;
  passwordHash?: string | null;
  type?: string;

  userInfo?: IUserInfo | null;
}
type UserRequired = {
  [K in keyof IUserInfo]-?: IUserInfo[K]; // Convert optional fields to required
};

export interface IUserPublic extends Omit<IUser, 'passwordHash' | 'userInfo'> {}
export interface IUserUpdate extends Omit<IUser, 'id' | 'userInfo'> {}
export interface IUserCreate extends Omit<IUser, 'id'> {
  email: string;
  passwordHash: string | null;
}

/* 

export interface IUserInfo {
  id?: string;
  userId?: string;

  name?: string | null;
  phone?: string | null;
  address?: string | null;
  about?: string | null;
}
type UserInfoRequired = {
  [K in keyof IUserInfo]-?: IUserInfo[K]; // Convert optional fields to required
};

export interface IUserInfoUpdate
  extends Partial<Omit<IUserInfo, 'id' | 'userId'>> {}
interface IUserInfoUpdateAll extends Omit<UserInfoRequired, 'id' | 'userId'> {}
interface IUserInfoUpdatePartial extends Partial<IUserInfoUpdateAll> {}
export interface IUserInfoCreate extends Omit<IUserInfo, 'id'> {
  userId: string;
}

*/
