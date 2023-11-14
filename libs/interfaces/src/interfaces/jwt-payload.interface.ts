export interface IJWTPayloadBase {
  exp: number;
  iat: number;
}

export interface IJWTPayloadAccess {
  id: string; // userid
}
export interface IJWTPayloadRefresh {
  id: string; // uuid
  deviceId: string;
  userId: string;
}
