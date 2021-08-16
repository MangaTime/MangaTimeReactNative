export interface LoginInformation {
  username: string;
  password: string;
}

export interface AdditionalAuthenticationInformation {
  [key: string]: string| undefined;
}

export interface ServiceAuthenticationInformation {
  login: LoginInformation;
  additional: AdditionalAuthenticationInformation;
}
