"use client"
import { API_URL } from "@/constants";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";



export default function Login() {

    const router = useRouter();
    const handleLogin = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const loginData = {
            email: formData.get("email"),
            password: formData.get("password"),
        };

        const jsonData = JSON.stringify(loginData);
        console.log(jsonData);

        axios
            .post(`${API_URL}/users/login`, loginData)
            .then((response) => {
                console.log(response);
                router.push("/dashboard");
            })
            .catch((err) => console.log(err));
    };
    return (
        <>
            <div className="flex flex-col items-center justify-center h-screen">
                {/* <style jsx>{`
                    .responsive-form {
                        width: 100%;
                        max-width: 50%;
                    }
                    @media only screen and (max-width: 768px) {
                        .responsive-form {
                            max-width: 100%;
                        }
                    }
                `}</style> */}
                <form
                    onSubmit={handleLogin}
                    className={`flex flex-col items-center gap-4 text-white rounded p-6 h-screen`}
                >
                    <h2 className="mb-3 text-lg text-custom-yellow p-3 ">
                        Login
                    </h2>

                    <div className="mb-3 flex flex-col gap-2 justify-between w-full">
                        <label className="form-label" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="form-control w-full text-black"
                            id="email"
                            name="email"
                            type="text"
                        />
                    </div>
                    <div className="mb-3 flex flex-col gap-2 justify-between w-full">
                        <label className="form-label" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="form-control w-full text-black"
                            type="password"
                            id="password"
                            name="password"
                        />
                    </div>
                    <div className="flex flex-col w-full">
                        <button
                            style={{
                                backgroundColor: "#AD974F",
                                color: "black",
                                fontWeight: "600",
                                width: "100%",
                            }}
                            className="mt-3 p-3 button w-full rounded-full"
                        >
                            Login
                        </button>
                        <Link
                            style={{
                                backgroundColor: "#AD974F",
                                color: "black",
                                fontWeight: "600",
                                width: "100%",
                            }}
                            className="button rounded-full bg-custom-yellow button-lg flex flex-col p-3 mt-4 text-center"
                            href="/login"
                        >
                            Create an account
                        </Link>
                    </div>
                </form>
            </div>
        </>
    );
}
