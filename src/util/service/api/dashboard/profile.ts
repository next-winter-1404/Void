import {ApiClient} from "../apiClient"

export const profileApi = (client:ApiClient) => ({
    
    profileAvatarUploader: (data:any)=> client.putForm(`/api/users/upload/picture`,data),
    userInfo: (id:number)=> client.get(`/api/users/${id}`),
    
    userinfo_Changer: (id:number,data:{email:string,phone:string,address:string,buyingHistory:object,sellingHistory:object})=>
        client.put(`/api/users/${id}/profile`,data),

    userPassword_Changer: (data:{currentPassword:string,newPassword:string})=>client.put(`/api/users/change-password`,data),


})