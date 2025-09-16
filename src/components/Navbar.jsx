import React from "react";
import logo from "../assets/logo.png";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import Hamburger from "./Hamburger";

function Navbar() {
  return (
    <div className="border-b border-black py-2  bg-[#faecdb] sticky top-0 z-20 ">
      <div className="w-[90%] mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/">
            <img
              src={logo}
              alt="logo"
              className="h-15 w-15 sm:h-26 sm:w-26  rounded-full border "
            />
          </Link>

          <h1 className="sm:text-4xl">Healthy-Fi-Me</h1>
        </div>

        <div className="hidden md:flex">
          <div className="flex gap-2 items-center ">
            <Link to={"/"} className="font-semibold text-xl">
              {" "}
              <h1>Home</h1>{" "}
            </Link>

            <Link to={"/profile"} className="font-semibold text-xl">
              {" "}
              <h1>Profile</h1>{" "}
            </Link>

            <Link to={"/plans"} className="font-semibold text-xl">
              {" "}
              <h1>Plan</h1>{" "}
            </Link>

            <Link to={"/logs"} className="font-semibold text-xl">
              {" "}
              <h1>Log</h1>{" "}
            </Link>

            <Link to={"/leaderboard"} className="font-semibold text-xl">
              {" "}
              <h1>Leaderboard</h1>{" "}
            </Link>

            <h1 className="flex items-center">
              <SignedIn>
                <UserButton />
              </SignedIn>
            </h1>
          </div>
        </div>

        <div className="md:hidden">
          <Hamburger />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
