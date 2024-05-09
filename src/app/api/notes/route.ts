import { NextRequest, NextResponse } from "next/server";
import { db } from "..";

export async function POST(request: NextRequest) {

    const body = await request.json();

    const newNote = db.query("INSERT INTO notes (context, category, jobs_id) VALUES (?,?,?)", [body.context, body.category, body.jobs_id])

    return NextResponse.json({message:"Successfully created new note", note: newNote})
}