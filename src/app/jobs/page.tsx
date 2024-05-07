"use client";
import { API_URL } from "@/constants";
import axios from "axios";
import cookies from "js-cookie";
import { FormEvent, useState } from "react";
export default function CreateJobTrackerPage() {
    const initialJobTracker = {
        company: "",
        position: "",
        user_id: cookies.get("userId"),
    };

    const [jobTracker, setJobTracker] = useState(initialJobTracker);

    const submitHandler = (e: FormEvent) => {
        e.preventDefault();
        axios.post(API_URL + "jobs", jobTracker)
            .then(response => {
                console.log(response);
            }). catch(err => console.log(err))
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
    );
}
