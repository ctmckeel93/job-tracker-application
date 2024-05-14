
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient} from "@prisma/client";
const prisma = new PrismaClient();
export async function GET() {

    const results = await prisma.job.findMany({
        include: {user:true}
    })

    return NextResponse.json({
        message: "Successfully retrieved jobs with user data",
        jobs: results
    }, {status: 200}) 
}

export async function POST(request: NextRequest) {
    const body = await request.json();

    const newJob = await prisma.job.create({
        data: body
    })

    return NextResponse.json({
        message: "Successfully created new job",
        job: newJob,
        status: 201
    })

}
