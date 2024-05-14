import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function DELETE(request: NextRequest, {params}: {
    params: {id:number}
}) {

    await prisma.note.delete({
        where: {id: Number(params.id)}
    })
    return NextResponse.json({message: "Note successfully deleted"})

}