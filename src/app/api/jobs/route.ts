
import { NextRequest, NextResponse } from "next/server";
import { db } from "..";

// export async function GET() {}

export async function POST(request: NextRequest) {

    const body = await request.json();

    await db.query("INSERT INTO jobs (company, position, user_id) VALUES (?,?,?)", [body.company, body.position, body.user_id])

    return NextResponse.json("ok");


}

// export async function PUT() {}

// export async function DELETE() {}