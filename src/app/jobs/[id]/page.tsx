'use client'
import axios from "axios"
import { useEffect, useState } from "react"
import {type JobData} from '../../../types';

export default function JobDetailsPage({params}: {params: {id:string}}) {

    const [job, setJob] = useState<JobData | null>(null);

    useEffect(() => {
        axios.get(`http://localhost:3000/api/jobs/${params.id}`)
            .then(response => setJob(response.data.job))
            .catch(err => console.log(err))
    },[params.id])

    if (!job) {
        return <p>...Loading</p>
    }

    return (
        <>
            <h1>Job Details page for job id: {params.id}</h1>
            <h2>Company | {job.company}  </h2>
            <h2>Position | {job.position}  </h2>
        
        </>
    )
}