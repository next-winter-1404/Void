import { cookies } from "next/headers";

export async function setToken(token: string) {
  const cookieStore = await cookies();

  cookieStore.set("auth_token", token, {
    maxAge: 86400,
    path: "/",
    sameSite: "strict",
    secure: true
  });
}

export async function getToken() {
  const cookieStore = await cookies();
  return cookieStore.get("auth_token")?.value || null;
}


export async function removeToken() {
  const cookieStore = await cookies();
  
  cookieStore.delete("auth_token");

  // cookieStore.set("auth_token", "", {
  //   path: "/",
  //   maxAge: 0,          
  //   sameSite: "strict",
  //   secure: true
  // });
}
