"use client";
import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { type JobData } from "../../../../types";
import { useRouter } from "next/navigation";
import Link from "next/link";
import deleteButton from '../../../../../public/delete-button.svg'
import { API_URL } from "@/constants";
import Image from "next/image";
import Loading from "@/app/components/Spinner";

export default function JobDetailsPage({ params }: { params: { id: string } }) {
    const [job, setJob] = useState<JobData | null>();
    const [addingNote, setAddingNote] = useState(false);

    useEffect(() => {
        axios.get(`${API_URL}/jobs/${params.id}`)
            .then(response => setJob(response.data.job))
            .catch(err => console.log(err))
    },[])
    const [note, setNote] = useState({
        context: "",
        category: "",
        jobId: Number(params.id),
    });
    const router = useRouter();


    const removeJob = () => {
        axios
            .delete(`http://localhost:3000/api/jobs/${params.id}`)
            .then(() => router.replace("/dashboard"))
            .catch((error) => console.log(error));
    };

    const handleAddNote = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget)

        const note = {
            context: formData.get("context"),
            category: formData.get("category"),
            jobId: Number(params.id),
        }
        axios.post(API_URL + `notes`, note)
        .then(() => {
            setAddingNote(false)
            setJob(job != null ? {...job, notes: [...job.notes, note]}: null)
        })
        .catch(error => console.log(error))
    }

    if (!job) {
        return <Loading/>;
    }

    return (
        <div className="text-white p-4">
            <div className="flex w-full justify-center items-center gap-2">
                <h1 className="text-3xl text-center">{job.company}</h1>
                    <Image onClick={removeJob} className="mt-2" src={deleteButton} alt="delete button" />
            </div>
            <h2>Position | {job.position} </h2>
            <Link
                href={`/jobs/${params.id}/update`}
                className="btn btn-warning"
            >
                Update
            </Link>

            {addingNote ? (
                <form onSubmit={handleAddNote} className="w-50 bg-dark mx-auto flex flex-col items-center justify-center p-5 text-white text-left">
                        <label className="align-self-start mx-2 mb-2" htmlFor="category">
                            Category:
                        </label>
                    <div className="w-full">
                        <input
                            className="w-full m-2"
                            type="text"
                            name="category"
                        />
                    </div>
                    <div className="w-full">
                        <label htmlFor="note" className="mx-2">Note:</label>
                        <textarea
                            className="w-full m-2"
                            name="context"
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
        </div>
    );
}
