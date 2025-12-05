export interface InterfaceLoginFormValues {
  email: string;
  password: string;
}

export interface InterfaceRegisterFormValues {
  name: string;
  email: string;
  password: string;
}

export interface InterfaceRegisterFormMobileValues {
  name: string;
  phone: string;
}

export interface InterfaceLoginFormMobileValues {
  phone: string;
}

export interface InterfaceLoginFormOTPValues {
  code: string;
  token: string;
}