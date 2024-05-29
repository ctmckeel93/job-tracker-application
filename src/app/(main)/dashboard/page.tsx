"use client";
import { API_URL } from "@/constants";
import axios from "axios";
import cookies from "js-cookie";
import Link from "next/link";
import { useState, useEffect } from "react";
import Loading from '../../components/Spinner';
export default function DashboardPage() {
    type UserData = {
        id: number;
        first_name: string;
        last_name: string;
        email: string;
    };

    type JobData = {
        id: number;
        company: string;
        position: string;
        user: UserData;
    };

    const [jobs, setJobs] = useState(null);

    useEffect(() => {
        axios
            .get(API_URL + "jobs")
            .then((response) => setJobs(response.data.jobs))
            .catch((err) => console.log(err));
    }, []);

    if (!jobs) {
        return (<Loading/>)
    }
    return (
        <div className="p-4">
            <h1>
                Hello <span>{cookies.get("userName")}</span>
            </h1>
            
            <table className="table-auto w-full text-center text-white p-3">
                <thead>
                    <tr className="border-b-2 border-white">
                        <th>Company</th>
                        <th>Position</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {jobs &&
                        jobs.map((job: JobData, index) => (
                            <>
                                {job.user.id ==
                                    Number(cookies.get("userId")) && (
                                    <tr className="align-middle border-b-2 p-4 border-white mb-3 h-[50px]">
                                        <td>{job.company}</td>
                                        <td>{job.position}</td>
                                        <td>
                                            <Link href={`/jobs/${job.id}`}>
                                                <button
                                                    style={{
                                                        backgroundColor:
                                                            "#AD974F",
                                                        color: "black",
                                                        fontWeight: "600",
                                                    }}
                                                    className="rounded-full text-sm p-2"
                                                >
                                                    Details
                                                </button>
                                            </Link>
                                        </td>
                                    </tr>
                                )}
                            </>
                        ))}
                </tbody>
            </table>
        </div>
    );
}
