"use server"
import { jwtDecode } from "jwt-decode";

export default async function tokenDecoder (token:string):Promise<any> {

    const decoded = jwtDecode(token);

  return decoded;
}
