import { NextResponse } from "next/server";
import db from "../../config/db";

type user = {
    id: number,
    first_name: string,
    last_name: string,
    role: string
}



export async function GET() {

    // const results = await db.query("Select * From users;")
    return Response.json("Connected to Job Tracker db");
}