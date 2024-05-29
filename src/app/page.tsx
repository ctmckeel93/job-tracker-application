"use client";
import { useState, useEffect, FormEvent, SyntheticEvent } from "react";
import Image from "next/image";
import axios from "axios";
import { API_URL } from "../constants";
import { useRouter } from "next/navigation";
import cookies from "js-cookie";
import Link from "next/link";
import Router from "next/router";

export default function Home() {
  

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
      .then((response) => Router.push("/dashboard"));
  };

  

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
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
          className={`responsive-form flex flex-col items-center gap-4 text-white rounded p-6 h-screen`}
        >
          <h2 className="mb-3 text-lg text-custom-yellow p-3 ">Register</h2>
          <div className="mb-3 flex flex-col gap-2 justify-between w-full">
            <label className="form-label" htmlFor="first_name">
              First Name
            </label>
            <input
              className="form-control w-full"
              type="text"
              id="first_name"
              name="first_name"
            />
            <p className="text-danger"></p>
          </div>
          <div className="mb-3 flex flex-col gap-2 justify-between w-full">
            <label className="form-label" htmlFor="last_name">
              Last Name
            </label>
            <input
              className="form-control w-full "
              type="text"
              id="last_name"
              name="last_name"
            />
            <p className="text-danger"></p>
          </div>
          <div className="mb-3 flex flex-col gap-2 justify-between w-full">
            <label className="form-label" htmlFor="email">
              Email
            </label>
            <input
              className="form-control w-full"
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
              className="form-control w-full"
              type="password"
              id="password"
              name="password"
            />
          </div>
          <div className="mb-3 flex flex-col gap-2 justify-between w-full">
            <label className="form-label" htmlFor="confirm-password">
              Confirm Password
            </label>
            <input
              className="form-control w-full"
              type="password"
              id="confirm-password"
              name="confirm-password"
            />
          </div>
          <div className="flex flex-col w-full">
            <button
              style={{
                backgroundColor: "#AD974F",
                color: "black",
                fontWeight: "600",
                width: "100%"
              }}
              className="mt-3 p-3 button w-full rounded-full"
            >
              Register
            </button>
            <Link style={{
                backgroundColor: "#AD974F",
                color: "black",
                fontWeight: "600",
                width: "100%"
              }} className="button rounded-full bg-custom-yellow button-lg flex flex-col p-3 mt-4 text-center" href="/login">Go to login page</Link>
          </div>
        </form>

        
      </div>
    </>
  );
}
