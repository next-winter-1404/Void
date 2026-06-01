import { match } from "assert";
import { NextRequest, NextResponse } from "next/server";
import {getToken} from "@/util/service/api/token"

export async function middleware(req:NextRequest) {
    const token = await getToken();
    
    if(!token && req.nextUrl.pathname.startsWith("/reserving")){
        return NextResponse.redirect(new URL("/home", req.url));
    }

    // if(req.nextUrl.pathname.startsWith("/forgetPassword")){
    //      return "/forgetPassword"
    // }else if(req.nextUrl.pathname.startsWith("/register")){
    //     return "/register"
    // }

    
    // if(req.nextUrl.pathname.startsWith("/forgetPassword")) {
    //     return NextResponse.redirect(new URL("/forgetPassword?step=FverifyEmail", req.url));
    // }

    // if(req.nextUrl.pathname.startsWith("/register")) {
    //     return NextResponse.redirect(new URL("/register?step=RverifyEmail", req.url));
    // }

    // if(req.nextUrl.pathname.startsWith("/about")) {
    //      return NextResponse.rewrite(new URL("/home", req.url));
    // }

    // if(!token) return NextResponse.redirect(new URL("/login",req.url));

    return NextResponse.next();
}

export const config = {
    matcher : ["/forgetPassword/","/register/","/reserving/contactWithSeller"]
}