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
  const user = {
    id: Number(cookies.get("userId")),
    name: cookies.get("userName"),
  };

  const handleRegistration = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const userData = {
      first_name: formData.get("first_name"),
      last_name: formData.get("last_name"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    axios
      .post(`${API_URL}/users`, userData)
      .then((response) => console.log(response));
  };

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const loginData = {
      email: formData.get("login-email"),
      password: formData.get("login-password"),
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
      <div className="container d-flex flex-column align-items-center gap-3 p-4">
        <style jsx>{`
          .responsive-form {
            width: 100%;
            max-width: 50%;
          }
          @media only screen and (max-width: 768px) {
            .responsive-form {
              max-width: 100%;
            }
          }
        `}</style>
        <form
          onSubmit={handleRegistration}
          className={`responsive-form flex flex-column p-3 rounded lg:w-75 md:w-50 sm:w-100 bg-dark text-light m-4`}
        >
          <h2 className="mb-3">Register</h2>
          <div className="mb-3">
            <label className="form-label" htmlFor="first_name">
              First Name
            </label>
            <input
              className="form-control"
              type="text"
              id="first_name"
              name="first_name"
            />
            <p className="text-danger"></p>
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
            <p className="text-danger"></p>
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
            <label className="form-label" htmlFor="confirm-password">
              Confirm Password
            </label>
            <input
              className="form-control"
              type="password"
              id="confirm-password"
              name="confirm-password"
            />
          </div>
          <div className="form-group">
            <button
              style={{
                backgroundColor: "#AD974F",
                color: "black",
                fontWeight: "600",
              }}
              className=" form-control mt-3 btn w-100"
            >
              Register
            </button>
          </div>
        </form>

        <form
          onSubmit={handleLogin}
          className={`responsive-form flex flex-column p-3  rounded lg:w-75 md:w-50 sm:w-100 bg-dark text-light m-4`}
        >
          <h2>Login</h2>
          <p className="text-danger"></p>
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
          <div className="form-group">
            <button
              style={{
                backgroundColor: "#AD974F",
                color: "black",
                fontWeight: "600",
              }}
              className=" form-control mt-3 btn w-100"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
