import { NextRequest, NextResponse } from "next/server";
import { db } from "../..";

export async function GET(request: NextRequest, {params}: {
    params: {id: number}
}) {
    // console.log(params.id);

    const [rows, fields] = await db.query("SELECT jobs.*, users.id AS users_id, first_name, last_name, email FROM jobs LEFT JOIN users ON users.id = jobs.user_id WHERE jobs.id = ?",[params.id])

    const results = [];

    for (const row of rows) {

        console.log(row);

        const jobData = {
            id: row.id,
            company: row.company,
            position: row.position,
            user: {}
        }

        const userData = {
            id: row.user_id,
            first_name: row.first_name, 
            last_name: row.last_name,
            email: row.email
        }

        jobData.user = userData;
        results.push(jobData);
    }



    return NextResponse.json({message: "Retrieved job with user data", job: results[0]}, {
        status: 200
    });
}