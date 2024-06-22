"use client";
import { API_URL } from "@/constants";
import axios from "axios";
import cookies from "js-cookie";
import Link from "next/link";
import { useState, useEffect } from "react";
import Loading from '../../components/Spinner';
import infoButton from '../../../../public/info-button.svg';
import Image from "next/image";
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

    const [jobs, setJobs] = useState([]);
    const [username, setUsername] = useState(cookies.get("userName"));
    const [userId, setUserId] = useState(cookies.get("userId"));

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
                Hello <span suppressHydrationWarning >{username}</span>
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
                    {jobs.length > 0 &&
                        jobs.map((job: JobData) => (
                            <>
                                {job.user.id ==
                                    Number(userId) && (
                                    <tr key={job.id}  className="items-center border-b-2 p-4 border-white mb-3 h-[50px]">
                                        <td>{job.company}</td>
                                        <td>{job.position}</td>
                                        <td className=" flex justify-center h-[100%] mt-3">
                                            <Link  href={`/jobs/${job.id}`}>
                                                    <Image src={infoButton} alt="info-button"/>
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
