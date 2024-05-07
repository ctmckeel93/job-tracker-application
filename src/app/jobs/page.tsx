'use client'
import cookies  from 'js-cookie';
export default function CreateJobTrackerPage() {

    const initialJobTracker = {
        company: "",
        position: "",
        user_id: cookies.get("userId")
    }

    return (
        <>
            <form>

            </form>
        </>
    )
}