
import { NextRequest, NextResponse } from "next/server";
import { db } from "..";

export async function GET() {

    const [rows, fields] = await db.query("SELECT jobs.*, users.id AS users_id, first_name, last_name, email FROM jobs LEFT JOIN users ON users.id = jobs.user_id;")
    const results = [];
    for (const row of rows) {
        const userData = {
            id: row.users_id,
            first_name: row.first_name,
            last_name: row.last_name,
            email: row.email
        }

        const jobData = {
            id: row.id,
            company: row.company,
            position: row.position,
            user: userData
        }

        results.push(jobData);
    }

    return NextResponse.json({
        message: "Successfully retrieved jobs with user data",
        jobs: results
    }, {status: 200}) 
}

export async function POST(request: NextRequest) {

    const body = await request.json();

    await db.query("INSERT INTO jobs (company, position, user_id) VALUES (?,?,?)", [body.company, body.position, body.user_id])

    return NextResponse.json("ok");


}