import { NextResponse, NextRequest } from "next/server";
import {db} from "../index";
import bcrypt from "bcrypt";

export async function GET() {
    const results = await db.query("SELECT * FROM users");

    return NextResponse.json(results[0])
}

export async function POST(request: NextRequest) {
    const body = await request.json() ;

    console.log(body)
    console.log(body.email)
    const newPassword =  await bcrypt.hash(body.password, 10);
    console.log(newPassword)

    const result = await db.query("INSERT INTO users (first_name, last_name, email, password) VALUES (?,?,?,?);", [body.first_name, body.last_name, body.email, newPassword]);

    return NextResponse.json("ok");
}