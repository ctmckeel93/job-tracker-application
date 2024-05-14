import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(request: NextRequest) {

    const body = await request.json();

    const newNote = await prisma.note.create({
        data: body
    })

    return NextResponse.json({message:"Successfully created new note", note: newNote})
}