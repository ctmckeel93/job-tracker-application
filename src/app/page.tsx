"use client";
import { useState, useEffect, FormEvent, SyntheticEvent } from "react";
import Image from "next/image";
import axios from "axios";
import { API_URL } from "../constants";
import { useRouter } from "next/navigation";
import cookies from "js-cookie";

export default function Home() {
  const router = useRouter();
  const [userId, setUserId] = useState(0);
  const [loginError, setLoginError] = useState("");
  const [registrationErrors, setRegistrationErrors] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const initialUser = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
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
        console.log("Something went wrong adding user to database:", err)
      );
  };

  const handleRegistrationInput = (e: SyntheticEvent) => {
    const inputName: string = (e.target as HTMLInputElement).name;
    const inputValue: string = (e.target as HTMLInputElement).value;

    handleFrontendValidations(inputName, inputValue);

    setUser({ ...user, [inputName]: inputValue });
  };

  const handleFrontendValidations = (inputName: string, inputValue: any) => {
    if (inputName === "first_name") {
      if (inputValue.length < 3 && inputValue.length !== 0) {
        console.log("Typing in first name input");
        setRegistrationErrors({
          ...registrationErrors,
          first_name: "First name must have at least 3 characters",
        });
      } else {
        setRegistrationErrors({ ...registrationErrors, first_name: "" });
      }
    }

    if (inputName === "last_name") {
      if (inputValue.length < 3 && inputValue.length !== 0) {
        setRegistrationErrors({
          ...registrationErrors,
          last_name: "Last name must have at least 3 characters",
        });
      } else {
        setRegistrationErrors({ ...registrationErrors, last_name: "" });
      }
    }
  };

  const handleLogin = (e: SyntheticEvent) => {
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
      .catch((err) => {
        console.log(err);
        setLoginError(err.response.data.message);
      });
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
          // style={{ outline: '2px solid #AD974F' }}

          className={`responsive-form flex flex-column p-3  rounded lg:w-75 md:w-50 sm:w-100 bg-dark text-light m-4`}
        >
          <h2 className="mb-3">Register</h2>
          <div className="mb-3">
            <label className="form-label" htmlFor="first_name">
              First Name
            </label>
            <input
              className="form-control "
              type="text"
              id="first_name"
              name="first_name"
              onChange={handleRegistrationInput}
            />
            <p className="text-danger">{registrationErrors.first_name}</p>
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
              onChange={handleRegistrationInput}
            />
            <p className="text-danger">{registrationErrors.last_name}</p>
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
              onChange={handleRegistrationInput}
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
              onChange={handleRegistrationInput}
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
              onChange={handleRegistrationInput}
            />
          </div>
          <div className="form-group">
          <button style={{ backgroundColor: '#AD974F' , color: 'black', fontWeight: '600'}} className=" form-control mt-3 btn  w-100">
              Register
            </button>
          </div>
        </form>

        <form
          onSubmit={handleLogin}
          // style={{ outline: '2px solid #AD974F' }}
          className={`responsive-form flex flex-column p-3  rounded lg:w-75 md:w-50 sm:w-100 bg-dark text-light m-4`}
        
        >
          <h2>Login</h2>
          <p className="text-danger">{loginError}</p>
          <div className="form-group flex gap-2 mb-3">
            <label className="form-label" htmlFor="login-email">
              Email
            </label>
            <input
              className="form-control"
              id="login-email"
              name="login-email"
              type="text"
              onChange={(e) => setLogin({ ...login, email: e.target.value })}
            />
          </div>
          <div className="form-group flex gap-2 mb-3">
            <label htmlFor="login-password">Password</label>
            <input
              className="form-control"
              type="password"
              id="login-password"
              name="login-password"
              onChange={(e) => setLogin({ ...login, password: e.target.value })}
            />
          </div>
          <div className="form-group">
            <button style={{ backgroundColor: '#AD974F' , color: 'black', fontWeight: '600'}} className=" form-control mt-3 btn w-100">
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
