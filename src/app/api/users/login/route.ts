import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {

    const body = await request.json();
    console.log(body);

    const login = await prisma.user.findFirst({
        where: {email: body.email}
    })

    if (login === null) {
        return NextResponse.json({
            message: "Invalid login",
            status: 401
        }, {status:401})
    }

    if (!await bcrypt.compare(body.password, login.password)) {
        return NextResponse.json({
            message: "Invalid login",
            status: 401
        }, {status:401})
    }
    return NextResponse.json({message: "Successful login attempt recorded", data:{
    }}, {status: 200});
}