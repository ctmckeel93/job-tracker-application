import { NextRequest, NextResponse } from "next/server";
import { db } from "../..";
import { arrayFromRows } from "@/app/helpers";

export async function GET(request: NextRequest, {params}: {
    params: {id: number}
}) {
    // console.log(params.id);

    const [rows, fields] = await db.query("SELECT jobs.*, users.id AS users_id, first_name, last_name, email FROM jobs LEFT JOIN users ON users.id = jobs.user_id WHERE jobs.id = ?",[params.id])

    const results = [];

    for (const row of arrayFromRows(rows)) {

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

export async function PUT(request: NextRequest, {params}: {
    params: {id:number}
}) {
    const body = await request.json();

    db.query("Update jobs SET company=?, position=? WHERE id=?", [body.company, body.position, params.id])
    return NextResponse.json({message: "Job successfully updated", body: body });
}

export async function DELETE(request: NextRequest,{params}: {
    params: {id:number}
}) {

    db.query("DELETE FROM jobs WHERE id=?", [params.id]);
    return NextResponse.json({message: "Job successfully deleted"})
}

