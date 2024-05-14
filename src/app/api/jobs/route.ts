
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient} from "@prisma/client";
const prisma = new PrismaClient();
export async function GET() {

    const results = await prisma.job.findMany()

    return NextResponse.json({
        message: "Successfully retrieved jobs with user data",
        jobs: results
    }, {status: 200}) 
}
