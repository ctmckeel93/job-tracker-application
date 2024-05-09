import { NextRequest, NextResponse } from "next/server";
import { db } from "../..";
import { arrayFromRows } from "@/app/helpers";

export async function GET(request: NextRequest, {params}: {
    params: {id: number}
}) {
    // console.log(params.id);

    const [rows, fields] = await db.query("SELECT jobs.*, users.id AS users_id, first_name, last_name, email, notes_id, context, category, notes.created_at FROM jobs LEFT JOIN users ON users.id = jobs.user_id LEFT JOIN notes ON jobs_id = jobs.id WHERE jobs.id = ?",[params.id])

    const rowArray = arrayFromRows(rows);

    const job = rowArray[0];

    const jobData = {
        id: job.id,
        company: job.company,
        position: job.position,
        user: {},
        notes: [] as any[]
    } 
    const userData = {
        id: job.user_id,
        first_name: job.first_name, 
        last_name: job.last_name,
        email: job.email
    }

    jobData.user = userData;

    
    for (const row of rowArray) {



        const noteData = {
            id: row.notes_id,
            context: row.context,
            category: row.category,
            created_at: new Date(row.created_at).toDateString()
        }

        
        
        jobData.notes.push(noteData);
    }






    return NextResponse.json({message: "Retrieved job with user data", job: jobData}, {
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

