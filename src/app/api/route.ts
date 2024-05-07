import { NextResponse } from "next/server";
import db from "../../config/db";





export async function GET() {

    // const results = await db.query("Select * From users;")
    return Response.json("Connected to Job Tracker db");
}