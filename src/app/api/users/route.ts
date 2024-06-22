import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcrypt";
import {prisma} from "@/app/api/index";

export async function GET() {
    const results = await prisma.user.findMany({
        select: {id:true, email:true, first_name:true, last_name:true}
    });
    return NextResponse.json(results)
}

export async function POST(request: NextRequest) {
    const body = await request.json() ;
    const newPassword =  await bcrypt.hash(body.password, 10);
    body.password = newPassword;

    const result = await prisma.user.create({
        data: body
    })

    return NextResponse.json(result);
}