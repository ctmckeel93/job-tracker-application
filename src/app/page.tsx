"use client";
import { useState, useEffect, FormEvent } from "react";
import Image from "next/image";
import axios from "axios";
import { API_URL } from "../constants";
import { useRouter } from "next/navigation";
import cookies from "js-cookie";
// import {cookies} from 'next/headers';

export default function Home() {
    const router = useRouter();
    const [userId, setUserId] = useState(0);

    const initialUser = {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
    };

    const initialLogin = {
        email: "",
        password: "",
    };

    const [user, setUser] = useState(initialUser);
    const [login, setLogin] = useState(initialLogin);

    const handleRegistration = (e: FormEvent) => {
        e.preventDefault();
        axios
            .post(API_URL + "users", user)
            .then((response) => {
                console.log("User successfully created:", user);
                router.push("dashboard");
            })
            .catch((err) =>
                console.log(
                    "Something went wrong adding user to database:",
                    err
                )
            );
    };

    const handleLogin = (e: FormEvent) => {
        e.preventDefault();
        axios
            .post(API_URL + "users/login", login)
            .then((response) => {
                console.log(response);
                cookies.set("userId", response.data.data.id);
                cookies.set("userName", response.data.data.name);
                setUserId(response.data.data.id);
                router.push("dashboard");
            })
            .catch((err) => console.log(err));
    };

    return (
        <>
            <div className="container d-flex flex-column align-items-center gap-3 p-3">
                <form
                    onSubmit={handleRegistration}
                    className="flex flex-column  p-3 border rounded w-50 bg-dark text-light m-3"
                >
                    <h2>Register</h2>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="first_name">
                            First Name
                        </label>
                        <input
                            className="form-control "
                            type="text"
                            id="first_name"
                            name="first_name"
                            onChange={(e) =>
                                setUser({ ...user, first_name: e.target.value })
                            }
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="last_name">
                            Last Name
                        </label>
                        <input
                            className="form-control"
                            type="text"
                            id="last_name"
                            name="last_name"
                            onChange={(e) =>
                                setUser({ ...user, last_name: e.target.value })
                            }
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="form-control"
                            id="email"
                            name="email"
                            type="text"
                            onChange={(e) =>
                                setUser({ ...user, email: e.target.value })
                            }
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="form-control"
                            type="password"
                            id="password"
                            name="password"
                            onChange={(e) =>
                                setUser({ ...user, password: e.target.value })
                            }
                        />
                    </div>
                    <div className="form-group d-flex justify-content-end">
                        <button className="btn btn-dark btn-outline-light">
                            Register
                        </button>
                    </div>
                </form>

                <form
                    onSubmit={handleLogin}
                    className="d-flex flex-column bg-dark w-50 p-3 text-light rounded"
                >
                    <h2>Login</h2>
                    <div className="form-group flex gap-2 mb-3">
                        <label className="form-label" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="form-control"
                            id="email"
                            name="email"
                            type="text"
                            onChange={(e) =>
                                setLogin({ ...login, email: e.target.value })
                            }
                        />
                    </div>
                    <div className="form-group flex gap-2 mb-3">
                        <label htmlFor="password">Password</label>
                        <input
                            className="form-control"
                            type="password"
                            id="password"
                            name="password"
                            onChange={(e) =>
                                setLogin({ ...login, password: e.target.value })
                            }
                        />
                    </div>
                    <div className="form-group d-flex justify-content-end">
                        <button className="btn btn-dark btn-outline-light">
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
