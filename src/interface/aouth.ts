export interface SignUp {
    email: string,
    password: string,
    full_name: string,
    phone_number: string
}
export interface AuthVerify{
    code:string,
    email:string
}

export interface Request {
    sign_up:(data:SignUp)=>any
    auth_verify:(data:AuthVerify)=>any
}