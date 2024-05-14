"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { type JobData } from "../../../types";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { API_URL } from "@/constants";

export default function JobDetailsPage({ params }: { params: { id: string } }) {
    const [job, setJob] = useState<JobData | null>(null);
    const [addingNote, setAddingNote] = useState(false);
    const [note, setNote] = useState({
        context: "",
        category: "",
        jobId: Number(params.id),
    });
    const router = useRouter();

    useEffect(() => {
        axios
            .get(`http://localhost:3000/api/jobs/${params.id}`)
            .then((response) => setJob(response.data.job))
            .catch((err) => console.log(err));
    }, [params.id]);

    const removeJob = () => {
        axios
            .delete(`http://localhost:3000/api/jobs/${params.id}`)
            .then(() => router.replace("/dashboard"))
            .catch((error) => console.log(error));
    };

    const handleAddNote = (e) => {
        e.preventDefault();
        axios.post(API_URL + `notes`, note)
        .then(() => setAddingNote(false))
        .catch(error => console.log(error))
    }

    if (!job) {
        return <p>...Loading</p>;
    }

    return (
        <>
            <h1>Job Details page for job id: {params.id}</h1>
            <h2>Company | {job.company} </h2>
            <h2>Position | {job.position} </h2>
            <button className="btn btn-danger" onClick={removeJob}>
                Remove
            </button>
            <Link
                href={`/jobs/${params.id}/update`}
                className="btn btn-warning"
            >
                Update
            </Link>

            {addingNote ? (
                <form onSubmit={handleAddNote} className="w-50 bg-dark mx-auto d-flex flex-column align-items-center justify-content-center p-5 text-light text-left">
                        <label className="align-self-start mx-2 mb-2" htmlFor="category">
                            Category:
                        </label>
                    <div className="w-100">
                        <input
                            onChange={(e) =>
                                setNote({ ...note, category: e.target.value })
                            }
                            className="w-100 m-2"
                            type="text"
                        />
                    </div>
                    <div className="w-100">
                        <label htmlFor="note" className="mx-2">Note:</label>
                        <textarea
                            className="w-100 m-2"
                            onChange={(e) =>
                                setNote({ ...note, context: e.target.value })
                            }
                        ></textarea>
                    </div>
                    <button className="btn btn-success align-self-end">Add</button>
                </form>
            ) : (
                <button onClick={() => setAddingNote(true)}>Add Note</button>
            )}
            <div>
                {job && job.notes?.map((note) => (
                    <>
                        <div>
                            <i>{note.created_at}</i>
                            <p>
                                {note.context}
                            </p>
                        </div>
                    </>
                ))}
            </div>
        </>
    );
}
