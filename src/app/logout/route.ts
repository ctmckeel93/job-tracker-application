import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import destroyCookies from 'next-cookies';

export async function GET(request: NextRequest) {
    
    cookies().delete("userId");
    cookies().delete("userName");
    return NextResponse.redirect("http://localhost:3000/");
    
}