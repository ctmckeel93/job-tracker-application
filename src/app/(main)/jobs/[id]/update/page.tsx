'use client'
import { JobData } from "@/types";
import axios from "axios";
import cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

export default function UpdateJobPage({params}: {
    params: {id:number}
}) {

    const initialJobTracker = {
        company: "",
        position: "",
        userId: cookies.get("userId"),
    };

    const router = useRouter();
    const [jobTracker, setJobTracker] = useState(initialJobTracker);

    useEffect(() => {
        axios.get("http://localhost:3000/api/jobs/" + params.id)
            .then(response => setJobTracker(response.data.job))
            .catch(error => console.log(error))
    },[])


    const submitHandler = (event: FormEvent<HTMLFormElement>) => {

        event.preventDefault();

        // const jobTracker = {
        //     id: params.id,
            
        // }

        const updatedJob = {
            company: jobTracker?.company,
            position: jobTracker?.position,
            userId: Number(cookies.get("userId"))

        }
        axios.put(`http://localhost:3000/api/jobs/${params.id}`, updatedJob)
            .then(() => router.push("/dashboard"))
            .catch(error => console.log(error))
    }

    return (
        <>
            <form onSubmit={submitHandler} >
                <div className="form-group mb-2">
                    <label htmlFor="company">Company</label>
                    <input
                        type="text"
                        id="company"
                        name="company"
                        className="text-black"
                        value={jobTracker?.company}
                        onChange={(e) =>
                            setJobTracker({
                                ...jobTracker,
                                company: e.target.value,
                            })
                        }
                    />
                </div>
                <div className="form-group mb-2">
                    <label htmlFor="position">Position</label>
                    <input
                        type="text"
                        id="position"
                        name="position"
                        className="text-black"
                        value={jobTracker.position}
                        onChange={(e) =>
                            setJobTracker({
                                ...jobTracker,
                                position: e.target.value,
                            })
                        }
                    />
                </div>
                <button className="border border-red-600 rounded p-2">Add</button>
            </form>
        </>
    )
}