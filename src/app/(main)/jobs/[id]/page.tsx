"use client";
import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { type JobData } from "../../../../types";
import { useRouter } from "next/navigation";
import Link from "next/link";
import deleteButton from "../../../../../public/delete-button.svg";
import chevronDown from "../../../../../public/chevron-down.svg";
import editButton from "../../../../../public/edit-button.svg";
import { API_URL, CATEGORIES } from "@/constants";
import Image from "next/image";
import Loading from "@/app/components/Spinner";
import { orderByCreatedAt } from "@/app/helpers";

export default function JobDetailsPage({ params }: { params: { id: string } }) {
    const [job, setJob] = useState<JobData | null>();
    const [notes, setNotes] = useState<any[]>([]);
    const [addingNote, setAddingNote] = useState(false);
    const [categories, setCategories] = useState(CATEGORIES);
    const [showingFilterContainer, setShowingFilterContainer] = useState(false);

    useEffect(() => {
        axios
            .get(`${API_URL}/jobs/${params.id}`)
            .then((response) => {
                response.data.job.notes.sort(orderByCreatedAt);
                setJob(response.data.job);
                setNotes(response.data.job.notes);
            })
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        if (job) {
            const filteredNotes = notes.filter((note) => {
                console.log("here");
                console.log(note);
                if (categories[note.category]?.isShowing) {
                    return note;
                }
            });
            setJob(
                (prevJob) => prevJob && { ...prevJob, notes: filteredNotes.toSorted(orderByCreatedAt) }
            );
        }
    }, [categories]);

    useEffect(() => {
        if (job) {
            setNotes(job.notes);
        }
    }, []);

    const [note, setNote] = useState({
        context: "",
        category: "",
        jobId: Number(params.id),
        created_at: "",
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
            created_at: new Date()
        };
        axios
            .post(API_URL + `notes`, note)
            .then(() => {
                setAddingNote(false);
                setJob(
                    job != null ? { ...job, notes: [note, ...job.notes]} : null
                );
            })
            .catch((error) => console.log(error));
    };

    const removeNote = (noteId:number) => {
        axios.delete(`${API_URL}/notes/${noteId}`)
            .then(() => setJob((prevJob) => {
                return prevJob != null ? { ...prevJob, notes: prevJob.notes.filter(note => note.id !== noteId)} : null
            } )).catch(err => console.log("Something interrupted the process deleting a note."))
    }

    const filterCategories = async (category: string) => {
        await setCategories((prevCategories) => ({
            ...prevCategories,
            [category]: {
                ...prevCategories[category],
                isShowing: !prevCategories[category].isShowing,
            },
        }));
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
                        <select
                            className="w-full text-black"
                            name="category"
                            id=""
                        >
                            {Object.keys(categories).map((category, index) => {
                                const {
                                    id,
                                    label,
                                }: { id: number; label: string } =
                                    categories[category];
                                return (
                                    <option key={id} value={category}>
                                        {label}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div className="w-full">
                        <label htmlFor="note">Note:</label>
                        <textarea
                            className="w-full text-black"
                            name="context"
                        ></textarea>
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
            <div className="w-full h-6 lg:flex justify-evenly items-center hidden hover:cursor-pointer">
                {Object.keys(categories).map((category) => {
                    return (
                        <div
                            onClick={() => filterCategories(category)}
                            key={categories[category].id}
                            style={{
                                backgroundColor: categories[category].color,
                                opacity: categories[category].isShowing
                                    ? "100%"
                                    : "30%",
                            }}
                            className="text-white w-[150px] text-sm rounded-full p-2 text-center font-bold"
                        >
                            {categories[category].label}
                        </div>
                    );
                })}
            </div>
            <div className="  flex flex-row justify-center w-full">
                <p onClick={() => setShowingFilterContainer(true)} className="w-[150px] rounded-full bg-gray-800 text-white text-center p-1 flex flex-col items-center text-sm lg:hidden">
                    See filters
                    <Image src={chevronDown} alt="down chevron arrow" />
                </p>
            </div>
            <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2  md:justify-items-center justify-center gap-y-10 grid-cols-1">
                {job && job.notes &&
                    job.notes?.map((note) => (
                        <>
                            <div key={note.id} className="w-full md:w-[300px] h-[300px] bg-gray-900 text-white flex flex-col text-black rounded-t-xl">
                                <div
                                    style={{
                                        backgroundColor: `${
                                            categories[
                                                note.category.toLowerCase()
                                            ]
                                                ? categories[
                                                      note.category.toLowerCase()
                                                  ].color
                                                : "gray"
                                        }`,
                                    }}
                                    className={`h-[50px] w-full rounded-t-xl flex items-center`}
                                >
                                    <div className="flex flex-1 justify-center">
                                        {new Date(
                                            note.created_at
                                        ).toLocaleDateString("en-us", {
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </div>
                                    <div className=" flex-2 self-start">
                                        <Image onClick={() => removeNote(note.id)} src={deleteButton} alt="click to delete note"/>
                                    </div>
                                </div>
                                {/* <i>{note.createdAt}</i> */}
                                <p className="p-3">{note.context}</p>
                            </div>
                        </>
                    ))}
            </div>
            <div className={`h-[50%] fixed bottom-0 left-0 w-screen bg-gray-900 lg:hidden flex flex-col items-center justify-around slide-up-container ${showingFilterContainer ? "open" : ""}`}>
                <div className="h-[20px] w-[20px] rounded-full border border-black bg-red-400" onClick={() => setShowingFilterContainer(false)}></div>
                <h3 className="text-custom-yellow text-xl font-bold">Click to filter notes by category</h3>
                <div className="md:grid-cols-3 md: grid grid-cols-1 place-content-center place-items-center gap-y-[20px] w-full">
                {Object.keys(categories).map((category) => {
                        return (
                            <div
                                onClick={() => filterCategories(category)}
                                key={categories[category].id}
                                style={{
                                    backgroundColor: categories[category].color,
                                    opacity: categories[category].isShowing
                                        ? "100%"
                                        : "30%",
                                }}
                                className="flex justify-center items-center text-white w-[150px] h-[20px] text-sm rounded-full p-2 font-bold"
                            >
                                {categories[category].label}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
