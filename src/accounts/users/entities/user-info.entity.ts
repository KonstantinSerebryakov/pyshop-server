import { IUserInfo, IUserInfoCreate, IUserInfoUpdate } from '@app/interfaces';

export class UserInfoEntity implements IUserInfo {
  id?: string;
  userId?: string;
  name?: string | null;
  phone?: string | null;
  address?: string | null;
  about?: string | null;

  constructor(userInfo: IUserInfo) {
    Object.assign(this, userInfo);
  }

  public fillOptionalNullables() {
    this.name ??= null;
    this.phone ??= null;
    this.address ??= null;
    this.about ??= null;
  }

  public getUpdate(): IUserInfoUpdate {
    return {
      name: this.name,
      phone: this.phone,
      address: this.address,
      about: this.about,
    };
  }

  getCreate(): IUserInfoCreate {
    if (!this.userId) throw new Error('required field userId is not defined');
    return {
      userId: this.userId,
      name: this.name,
      phone: this.phone,
      address: this.address,
      about: this.about,
    };
  }

  public async getNested(): Promise<IUserInfo> {
    return { ...this };
  }
}

// import { IUserInfo, IUserInfoCreate, IUserInfoUpdate } from '@app/interfaces';
// import { DataEntity } from '@app/interfaces/interfaces/data-entity.interface';

// export class UserInfoEntity implements DataEntity, IUserInfo {
//   id?: string;
//   userId: string;

//   name?: string | null;
//   phone?: string | null;
//   address?: string | null;
//   about?: string | null;

//   constructor(userInfo: IUserInfo) {
//     this.id = userInfo.id;
//     this.userId = userInfo.userId;
//     this.name = userInfo.name;
//     this.phone = userInfo.phone;
//     this.address = userInfo.address;
//     this.about = userInfo.about;
//   }

//   public getUpdate(): IUserInfoUpdate {
//     return {
//       name: this.name ?? null,
//       phone: this.phone ?? null,
//       address: this.address ?? null,
//       about: this.about ?? null,
//     };
//   }

//   getUpdatePartial(): Partial<IUserInfoUpdate> {
//     return {
//       name: this.name,
//       phone: this.phone,
//       address: this.address,
//       about: this.about,
//     };
//   }

//   getCreate(): IUserInfoCreate {
//     return {
//       userId: this.userId ?? null,
//       name: this.name ?? null,
//       phone: this.phone ?? null,
//       address: this.address ?? null,
//       about: this.about ?? null,
//     };
//   }

//   public async getNested(): Promise<IUserInfo> {
//     return {
//       id: this.id,
//       userId: this.userId ?? null,
//       name: this.name ?? null,
//       phone: this.phone ?? null,
//       address: this.address ?? null,
//       about: this.about ?? null,
//     };
//   }
// }
