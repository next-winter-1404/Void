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

export async function getUserId(): Promise<number | null> {
  const token = await getToken();
  if (!token) return null;

  try {
    
    const payload = token.split(".")[1];
    const decoded = JSON.parse(atob(payload));
  
    console.log("JWT payload:", decoded);
    return decoded.id ?? decoded.userId ?? decoded.sub ?? null;
  } catch {
    return null;
  }
}
