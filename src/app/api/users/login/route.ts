import { NextRequest, NextResponse } from "next/server";
import { db } from "../..";
import bcrypt from 'bcrypt';

export async function POST(request: NextRequest) {

    const body = await request.json();

    const [rows, fields] = await db.query("SELECT * FROM users WHERE email=?", [body.email])

    const rowArray = rowsAsArray(rows);

    if (rowArray.length < 1) {
        return NextResponse.json({message: "Invalid login attempt"}, {status: 401})
    }

    const passwordCheck = await bcrypt.compare(body.password, rowArray[0].password);

    if (!passwordCheck) {
        return NextResponse.json({message: "Invalid login attempt"},{status: 401});
    }


    // request.cookies.set("userId", rowArray[0].id);
    return NextResponse.json({message: "Successful login attempt recorded", data:{
        id: rowArray[0].id,
        name: `${rowArray[0].first_name} ${rowArray[0].last_name}`
    }}, {status: 200});
}


const rowsAsArray = (rows:any) => {
    let rowsArray = [];

    for (let row of rows) {
        rowsArray.push(row)
    }
    return rowsArray;
}