"use client";
import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { type JobData } from "../../../../types";
import { useRouter } from "next/navigation";
import Link from "next/link";
import deleteButton from "../../../../../public/delete-button.svg";
import editButton from "../../../../../public/edit-button.svg";
import { API_URL } from "@/constants";
import Image from "next/image";
import Loading from "@/app/components/Spinner";

export default function JobDetailsPage({ params }: { params: { id: string } }) {
    const [job, setJob] = useState<JobData | null>();
    const [addingNote, setAddingNote] = useState(false);

    useEffect(() => {
        axios
            .get(`${API_URL}/jobs/${params.id}`)
            .then((response) => setJob(response.data.job))
            .catch((err) => console.log(err));
    }, []);
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

        const formData = new FormData(event.currentTarget);

        const note = {
            context: formData.get("context"),
            category: formData.get("category"),
            jobId: Number(params.id),
        };
        axios
            .post(API_URL + `notes`, note)
            .then(() => {
                setAddingNote(false);
                setJob(
                    job != null ? { ...job, notes: [...job.notes, note] } : null
                );
            })
            .catch((error) => console.log(error));
    };

    if (!job) {
        return <Loading />;
    }

    return (
        <div className="text-white p-4 flex flex-col gap-[100px]">
            <div>
                <div className="flex w-full justify-center items-center gap-2">
                    <h1 className="text-3xl text-center">{job.company}</h1>
                    <Image
                        onClick={removeJob}
                        className="mt-2"
                        src={deleteButton}
                        alt="delete button"
                    />
                    <Link href={`/jobs/${params.id}/update`} className="mt-2">
                        <Image src={editButton} alt="edit button" />
                    </Link>
                </div>
                <h2 className="text-center text-2xl">{job.position} </h2>
            </div>

            {addingNote ? (
                <form
                    onSubmit={handleAddNote}
                    className=" w-full bg-dark mx-auto flex flex-col gap-3 text-white text-left md:w-[50%]"
                >
                    <label htmlFor="category">Category:</label>
                    <div className="w-full">
                        <input className="w-full text-black" type="text" name="category" />
                    </div>
                    <div className="w-full">
                        <label htmlFor="note">Note:</label>
                        <textarea className="w-full text-black" name="context"></textarea>
                    </div>
                    <button className="bg-custom-yellow p-4 w-full">Add</button>
                </form>
            ) : (
                <button
                    className="bg-custom-yellow w-full p-4"
                    onClick={() => setAddingNote(true)}
                >
                    Add Note
                </button>
            )}
            <h2 className="text-center text-2xl">Notes</h2>
            <div className="flex gap-4 flex-wrap justify-center">
                {job &&
                    job.notes?.map((note) => (
                        <>
                            <div className="w-[300px] h-[300px] p-4 bg-custom-yellow text-black flex items-center justify-center text-black">
                                <i>{note.createdAt}</i>
                                <p>{note.context}</p>
                            </div>
                        </>
                    ))}
            </div>
        </div>
    );
}
