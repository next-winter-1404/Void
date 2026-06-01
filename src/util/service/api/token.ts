import { cookies } from "next/headers";

interface userProps{
  id:number,
  email:string,
  role:"buyer" | "seller" | "admin",
  name:string,
  profilePicture:string | null,
  iat:number,
  exp:number
}

export async function setToken(token: string,user_info:userProps) {
  const cookieStore = await cookies();

  cookieStore.set("auth_token", token, {
    maxAge: 60 * 60,
    path: "/",
    sameSite: "strict",
    secure: true
  });

  cookieStore.set("user_info",JSON.stringify(user_info),{
     maxAge: 60 * 60,
    path: "/",
    sameSite: "strict",
    secure: true
  })


}



export async function getToken() {
  const cookieStore = await cookies();
  return cookieStore.get("auth_token")?.value || null;
}


export async function getUserInfo():Promise<userProps>{
  const cookieStore = await cookies();
   const userData =  cookieStore.get("user_info")?.value as string || "{}";

   return JSON.parse(userData);
}


export async function removeToken() {
  const cookieStore = await cookies();
  
  cookieStore.delete("auth_token");
  cookieStore.delete("user_info");


}
