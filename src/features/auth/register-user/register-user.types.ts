export interface RegisterUserFeatureParams {
  email: string;
  password: string;
}

export interface RegisterUserFeatureResult {
  id: number;
  email: string;
  role: string;
}
