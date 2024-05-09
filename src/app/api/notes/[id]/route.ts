import { NextRequest, NextResponse } from "next/server";
import { db } from "../..";

export async function DELETE(request: NextRequest, {params}: {
    params: {id:number}
}) {

    db.query("DELETE FROM notes WHERE notes_id=?", [params.id]);
    return NextResponse.json({message: "Note successfully deleted"})

}