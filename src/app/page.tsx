"use client"
import {useState, useEffect, FormEvent} from 'react';
import Image from "next/image";
import axios from 'axios';
import {API_URL} from '../constants';
import { useRouter } from 'next/navigation';
import cookies from 'js-cookie';
// import {cookies} from 'next/headers';

export default function Home() {

  const router = useRouter();
  const [userId, setUserId] = useState(0);

  const initialUser = {
    first_name: "",
    last_name: "",
    email: "",
    password: ""
  }

  const initialLogin = {
    email: "",
    password: ""
  }

  const [user, setUser] = useState(initialUser);
  const [login, setLogin] = useState(initialLogin);

  const handleRegistration = (e: FormEvent) => {
    e.preventDefault();
    axios.post(API_URL + "users", user)
      .then(response => {
        console.log("User successfully created:", user)
        router.push("dashboard")
        
      })
      .catch(err => console.log("Something went wrong adding user to database:", err))
  }

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    axios.post(API_URL + "users/login", login)
      .then(response => {
        console.log(response)
        cookies.set("userId", response.data.data.id);
        cookies.set("userName", response.data.data.name);
        setUserId(response.data.data.id);
        router.push("dashboard")
      })
      .catch(err => console.log(err))
  }

  return (
    <>

    <div className="container flex flex-col items-center w-full justify-space-around h-screen">


      <form onSubmit={handleRegistration} className="flex flex-col gap-3 m-2 bg-slate-600 w-[50%] p-4 text-black">

          <div className="form-group flex justify-content-between">
            <label htmlFor="first_name">First Name</label>
            <input type="text" id="first_name" name="first_name" onChange={(e) => setUser({...user, first_name: e.target.value})}/>
          </div>
          <div className="form-group flex gap-2">
            <label htmlFor="last_name">Last Name</label>
            <input type="text" id="last_name" name="last_name" onChange={(e) => setUser({...user, last_name: e.target.value})}/>
          </div>
          <div className="form-group flex gap-2">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="text" onChange={(e) => setUser({...user, email: e.target.value})}/>
          </div>
          <div className="form-group flex gap-2">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" onChange={(e) => setUser({...user, password: e.target.value})}/>
          </div>
          <div className="form-group">
            <button className="bg-green-400 p-2 text-blue-900">Register</button>
          </div>

      </form>

      <form onSubmit={handleLogin} className="flex flex-col gap-3 m-2 bg-slate-600 w-[50%] p-4 text-black">
      <div className="form-group flex gap-2">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="text" onChange={(e) => setLogin({...login, email: e.target.value})}/>
          </div>
          <div className="form-group flex gap-2">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" onChange={(e) => setLogin({...login, password: e.target.value})}/>
          </div>
          <div className="form-group">
            <button className="bg-green-400 p-2 text-blue-900">Login</button>
          </div>
      </form>
    </div>
      
    </>
  );
}
