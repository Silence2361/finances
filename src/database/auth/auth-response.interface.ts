export interface IRegisterCredentials {
  email: string;
  password: string;
}

export interface IRegisterResponse {
  id: number;
  email: string;
  role: string;
}

export interface ILoginCredentials {
  email: string;
  password: string;
}

export interface ILoginResponse {
  access_token: string;
}
