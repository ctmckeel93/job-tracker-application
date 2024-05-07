'use client'
import cookies from 'js-cookie';
export default function DashboardPage() {

    return (
        <>
            <h1>Hello {cookies.get("userName")}</h1>

        </>
    )
}