export interface IUser {
  _id: string;
  googleId?: string;
  username: string;
  email: string;
  avatar: string;
  onCourt: {
    isOnCourt: boolean;
    court?: string;
  };
  favCourts: string[];
  addedCourts: string[];
  checkIns: string[];
  city: { label: string; value: string; coordinates: number[] };
  role: EnumUserRole;
}

// export interface IUserState {
//   email: string;
//   id: string;
//   googleId: string;
//   name: string;
// }

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}

export interface IInitialState {
  user: IUser | null;
  isLoading: boolean;
}

export interface IEmailPassword {
  email: string;
  password: string;
}

export interface IAuth extends IEmailPassword {
  name?: string;
}

export interface IAuthResponse extends ITokens {
  user: IUser;
}

export enum EnumTokens {
  AccessToken = "accessToken",
  RefreshToken = "refreshToken",
}

export enum EnumAuth {
  Login = "login",
  Register = "register",
}

export enum EnumUserRole {
  ADMIN = "admin",
  USER = "user",
}
