export interface IUserInfo {
  id: string;
  userId: string;

  name: string | null;
  phone: string | null;
  address: string | null;
  about: string | null;
}

export interface IUserInfoUpdate
  extends Partial<Omit<IUserInfo, 'id' | 'userId'>> {}
