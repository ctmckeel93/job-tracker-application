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
            <div className={`md:flex md:flex-row md:gap-4 md:items-center md:p-3 flex-col text-center text-white ${isShowing === false ? "hidden": "flex"} bg-gray-900`}>
                <Link href="/dashboard">Home</Link>
                <Link href="#">About</Link>
                <Link href="/jobs">Add job</Link>
            </div>
        </nav>
    );
};

export default Navbar;