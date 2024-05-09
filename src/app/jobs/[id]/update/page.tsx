'use client'
import axios from "axios";
import cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function UpdateJobPage({params}: {
    params: {id:number}
}) {

    const router = useRouter();

    useEffect(() => {
        axios.get("http://localhost:3000/api/jobs/" + params.id)
            .then(response => setJobTracker(response.data.job))
            .catch(error => console.log(error))
    },[])

    const initialJobTracker = {
        id: params.id,
        company: "",
        position: "",
        user_id: cookies.get("userId"),
    };

    const submitHandler = (e) => {

        e.preventDefault();
        axios.put(`http://localhost:3000/api/jobs/${params.id}`, jobTracker)
            .then(() => router.push("/dashboard"))
            .catch(error => console.log(error))
    }


    const [jobTracker, setJobTracker] = useState(initialJobTracker);

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
                        value={jobTracker.company}
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