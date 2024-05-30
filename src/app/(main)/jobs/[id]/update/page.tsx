'use client'
import { JobData } from "@/types";
import axios from "axios";
import cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { CATEGORIES } from "@/constants";

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
            <form onSubmit={submitHandler} className="p-3 gap-3 md:w-[50%] flex flex-col items-center w-full mx-auto">
                <div className="flex flex-col w-full mb-2 text-white">
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
                <div className="text-white mb-2 w-full">
                    <label htmlFor="position">Position</label>
                    <input
                        type="text"
                        id="position"
                        name="position"
                        className="text-black w-full"
                        value={jobTracker.position}
                        onChange={(e) =>
                            setJobTracker({
                                ...jobTracker,
                                position: e.target.value,
                            })
                        }
                    />
                </div>
                <button className=" bg-custom-yellow w-full p-4">Update</button>
            </form>
        </>
    )
}