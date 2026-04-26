"use server"

import { cookies } from "next/headers"
// import { createToken } from "@/app/lib/auth"
import { redirect } from "next/navigation"

// user
const users = [
  { id: "1", username: "user", password: "1234" },
  { id: "2", username: "mersad", password: "2044" },
]

export async function loginAction(prevState: any, formData: FormData) {

  const username = formData.get("username") as string
  const password = formData.get("password") as string

 
  const user = users.find(
    (u) => u.username === username && u.password === password
  )

  if (!user) {
    return { message: "نام کاربری یا رمز اشتباه است" }
  }
 
  // token
  // const token = await createToken({ userId: user.id, username: user.username })
   
  // cookie
  const cookieStore = await cookies()
  // cookieStore.set("token", token, {
  //   httpOnly: true,      
  //   secure: true,       
  //   maxAge: 60 * 60 * 24 * 7,  
  //   path: "/",
  // })

  redirect("/home")
}


export async function logoutAction() {
  const cookieStore = await cookies()
  cookieStore.delete("token")
  redirect("/login")
}