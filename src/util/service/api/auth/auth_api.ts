import { ApiClient } from "../apiClient";

export const AuthAPI = (client: ApiClient) => ({

  login: (data: { email: string; password: string }) =>
    client.post("/api/auth/login", data),


  register: (data: { email: string }) =>
    client.post("/api/auth/register", data),

  verifyEmail: (data: { tempUserId:number ;verificationCode: string }) =>
    client.post("/api/auth/verify-email", data),

  complete_registration : (data:{userId:number ;phoneNumber:string; password:string})=>
    client.post ("/api/auth/complete-registration",data),



  logout: () => client.post("/api/auth/logout"),
  refresh: () =>
    client.post("/api/auth/refresh"),


  forgotPasswordRequest: (data: { email: string }) =>
    client.post("/api/auth/forgot-password/request", data),

  forgetPasswordVerify : (data: {email: string;code:string})=>
    client.post("/api/auth/forgot-password/verify",data),

  resetPassword: (data: { email:string ;password: string }) =>
    client.post("/api/auth/forgot-password/reset", data),


});
