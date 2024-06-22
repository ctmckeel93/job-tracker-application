import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import {prisma} from "@/app/api/index";

export async function POST(request: NextRequest) {

    const body = await request.json();

    const newNote = await prisma.note.create({
        data: body
    })

    return NextResponse.json({message:"Successfully created new note", note: newNote})
}