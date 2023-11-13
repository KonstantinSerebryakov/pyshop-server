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
