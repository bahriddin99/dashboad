export interface SignUp extends SignIn {
  full_name: string;
  phone_number: string;
}
export interface AuthVerify {
  code: string;
  email: string;
}
export interface SignIn {
  email: string;
  password: string;
  
}
export interface UpdatePassword {
  code: string;
  new_password: string;
  email?: string;
}
export interface ForgetPassword {
  email: string;
  
}

export interface Request {
  sign_up: (data: SignUp) => any;
  auth_verify: (data: AuthVerify) => any;
  sign_in:(data: SignIn) => any;
  forget_password:(data: ForgetPassword) => any;
  update_password:(data: UpdatePassword) => any;
}
