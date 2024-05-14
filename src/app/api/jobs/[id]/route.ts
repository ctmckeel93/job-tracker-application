import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();
export async function GET(request: NextRequest, {params}: {
    params: {id: number}
} ) {
    const id = Number(params.id)
    const job = await prisma.job.findUnique({
        where: {id: id},
        include: {user:true}
    })

    return NextResponse.json({
        message: "Success retrieving job record with user",
        job: job,
        status: 200
    })

}

export async function PUT(request: NextRequest, {params}: {
    params: {id:number}
}) {
    const body = await request.json();

    const updated_job = await prisma.job.update({
        where: {id: Number(params.id)},
        data: body
    })

    return NextResponse.json({
        message: "Successfully updated job record",
        job: updated_job,
        status: 200
    })


}

export async function DELETE(request: NextRequest,{params}: {
    params: {id:number}
}) {

    await prisma.job.delete({
        where: {id: Number(params.id)}
    })

    return NextResponse.json({
        message: "Successfully deleted job record",
        status: 200
    })
}

