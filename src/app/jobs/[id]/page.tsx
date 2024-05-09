'use client'
import axios from "axios"
import { useEffect, useState } from "react"
import {type JobData} from '../../../types';
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function JobDetailsPage({params}: {params: {id:string}}) {

    const [job, setJob] = useState<JobData | null>(null);
    const router = useRouter();

    useEffect(() => {
        axios.get(`http://localhost:3000/api/jobs/${params.id}`)
            .then(response => setJob(response.data.job))
            .catch(err => console.log(err))
    },[params.id])

    const removeJob = () => {
        axios.delete(`http://localhost:3000/api/jobs/${params.id}`)
            .then(response => router.replace("/dashboard"))
            .catch(error => console.log(error))
    }

    if (!job) {
        return <p>...Loading</p>
    }

    return (
        <>
            <h1>Job Details page for job id: {params.id}</h1>
            <h2>Company | {job.company}  </h2>
            <h2>Position | {job.position}  </h2>
            <button className="btn btn-danger" onClick={removeJob}>Remove</button>
            <Link href={`/jobs/${params.id}/update`} className="btn btn-warning" >Update</Link>
        </>
    )
}