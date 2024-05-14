import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from "next";
import { cookies } from "next/headers";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {

    const body = await request.json();
    console.log("RAW REQUEST BODY", body)
    // const formData = JSON.parse(body)
    // console.log(formData)

    const login = await prisma.user.findFirst({
        where: {email: body.email}
    })

    if (login === null) {
        console.log("login returned null")
        return NextResponse.json({
            message: "Invalid login",
            status: 401
        }, {status:401})
    }

    if (!await bcrypt.compare(body.password, login.password)) {
        console.log("Passwords dont match")
        return NextResponse.json({
            message: "Invalid login",
            status: 401
        }, {status:401})
    }

    cookies().set("userId", String(login.id));
    cookies().set("userName", login.first_name);

    return NextResponse.json({message: "Successful login attempt recorded", data:{
    }}, {status: 200});
}