"use client";
import { API_URL } from "@/constants";
import axios from "axios";
import cookies from "js-cookie";
import Link from "next/link";
import { useState, useEffect } from "react";
export default function DashboardPage() {

    type UserData = {
        id: number,
        first_name: string,
        last_name: string,
        email: string
    }

    type JobData = {
        id: number,
        company: string,
        position: string,
        user: UserData
    }


    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        axios
            .get(API_URL + "jobs")
            .then((response) => setJobs(response.data.jobs))
            .catch((err) => console.log(err));
    }, []);

    return (
        <>
            <h1>Hello {cookies.get("userName")}</h1>
            <table className="table table-dark table-hover table-striped text-center">
                <thead>
                    <tr>
                        <th>Company</th>
                        <th>Position</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {jobs.length > 0 &&
                        jobs.map((job: JobData, index) => (
                            <>
                            {
                                job.user.id == Number(cookies.get("userId")) &&

                                <tr className="align-middle">
                                    <td>{job.company}</td>
                                    <td>{job.position}</td>
                                    <td>
                                        <Link href={`/jobs/${job.id}`}>
                                            <button className="btn btn-info">
                                                Show Details
                                            </button>
                                        </Link>
                                    </td>
                                </tr>
                            }
                            </>
                        ))}
                </tbody>
            </table>
        </>
    );
}
