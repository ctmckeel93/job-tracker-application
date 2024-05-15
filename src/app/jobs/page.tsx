"use client";
import { API_URL } from "@/constants";
import axios from "axios";
import cookies from "js-cookie";
import { FormEvent } from "react";
export default function CreateJobTrackerPage() {
  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const jobTracker = {
      company: formData.get("company"),
      position: formData.get("position"),
      userId: cookies.get("userId"),
    };
    axios
      .post(API_URL + "jobs", jobTracker)
      .then((response) => {
        console.log(response);
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
          onSubmit={submitHandler}
          className={`responsive-form flex flex-column p-3 rounded lg:w-75 md:w-50 sm:w-100 bg-dark text-light m-4`}
        >
          <div className="form-group mb-2">
            <label htmlFor="company">Company</label>
            <input
              type="text"
              id="company"
              name="company"
              className="form-control text-black"
            />
          </div>
          <div className="form-group mb-2">
            <label htmlFor="position">Position</label>
            <input
              type="text"
              id="position"
              name="position"
              className="form-control text-black"
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
              Add
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
