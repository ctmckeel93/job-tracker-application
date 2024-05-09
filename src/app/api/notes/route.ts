import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {

    const body = request.json();

    return NextResponse.json({message:"Successfully created new note", note: body})
}