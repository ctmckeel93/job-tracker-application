"use client"
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {

    const [isShowing, setIsShowing] = useState(false);
    return (
        <nav className="text-white">
            <div className="flex justify-between p-2 items-center bg-custom-yellow">
                <span className="text-2xl">Job Tracker</span>
                <div onClick={() => setIsShowing(!isShowing)} className="flex flex-col gap-1 md:hidden">
                    <span className="h-[2px] bg-white w-[13px]"></span>
                    <span className="h-[2px] bg-white w-[13px]"></span>
                    <span className="h-[2px] bg-white w-[13px]"></span>
                </div>
            </div>
            <div className={`md:flex md:flex-row md:gap-4  items-center md:p-3 flex-col text-center text-white ${isShowing === false ? "hidden": "flex"} bg-gray-900`}>
                <div className="h-[35px] md:w-[80px] flex items-center md:border-transparent sm:w-full justify-center items-center border border-black">
                    <Link href="/dashboard">Home</Link>
                </div>
                <div className="h-[35px] md:w-[80px] md:border-transparent flex items-center sm:w-full justify-center items-center border border-black">
                    <Link href="/jobs">Add job</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;