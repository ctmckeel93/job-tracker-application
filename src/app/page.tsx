"use client";
import { useState, useEffect, FormEvent, SyntheticEvent } from "react";
import Image from "next/image";
import axios from "axios";
import { API_URL } from "../constants";
import { useRouter } from "next/navigation";
import cookies from "js-cookie";
// import {cookies} from 'next/headers';

export default function Home() {
    const router = useRouter();
    const [userId, setUserId] = useState(0);

    const handleRegistration = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget)
        const userData = {
            first_name: formData.get("first_name"),
            last_name: formData.get("last_name"),
            email: formData.get("email"),
            password: formData.get("password")

        }

        axios.post(`${API_URL}/users`, userData)
            .then(response => console.log(response))
    }


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
                        />
                        <p className="text-danger">
                        </p>
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
                        />
                    </div>
                    <div className="mb-3">
                        <label
                            className="form-label"
                            htmlFor="confirm-password"
                        >
                            Confirm Password
                        </label>
                        <input
                            className="form-control"
                            type="password"
                            id="confirm-password"
                            name="confirm-password"
                        />
                    </div>
                    <div className="form-group d-flex justify-content-end">
                        <button className="btn btn-dark btn-outline-light">
                            Register
                        </button>
                    </div>
                </form>

                <form
                    className="d-flex flex-column bg-dark w-50 p-3 text-light rounded"
                >
                    <h2>Login</h2>
                    <div className="form-group flex gap-2 mb-3">
                        <label className="form-label" htmlFor="login-email">
                            Email
                        </label>
                        <input
                            className="form-control"
                            id="login-email"
                            name="login-email"
                            type="text"
                        />
                    </div>
                    <div className="form-group flex gap-2 mb-3">
                        <label htmlFor="login-password">Password</label>
                        <input
                            className="form-control"
                            type="password"
                            id="login-password"
                            name="login-password"
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
