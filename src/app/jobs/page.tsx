"use client";
import { API_URL } from "@/constants";
import axios from "axios";
import cookies from "js-cookie";
import { FormEvent} from "react";
export default function CreateJobTrackerPage() {

    const submitHandler = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget)

        const jobTracker = {
            company: formData.get("company"),
            position: formData.get("position"),
            userId: cookies.get("userId"),
        };
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
                    />
                </div>
                <div className="form-group mb-2">
                    <label htmlFor="position">Position</label>
                    <input
                        type="text"
                        id="position"
                        name="position"
                        className="text-black"
                    />
                </div>
                <button className="border border-red-600 rounded p-2">Add</button>
            </form>
        </>
    );
}
