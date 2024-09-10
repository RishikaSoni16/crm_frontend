export interface LoginUserRequest{
    email:string;
    password:string;
}

export interface SignupUserRequest{
    fullname: string;
    email: string;
    role: number;
    password: string;
    confirmPassword: string;
    acceptTerms: boolean;
}
