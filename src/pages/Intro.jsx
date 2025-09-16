import React from "react";
import hero from "../assets/hero.jpg";
import logo2 from "../assets/logo2.png";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { BlurFade } from "@/components/ui/blur-fade";

function Intro() {
  return (
    <BlurFade delay={0.25} inView>
      <div className=" relative">
        <img src={hero} alt="" className="h-screen w-screen object-cover " />
        <div className="bg-[#00000079] absolute h-screen w-screen top-0 left-0"></div>

        <div className="absolute inset-0 mx-2  flex flex-col items-center justify-center text-white text-center">
          <img src={logo2} alt="" className="w-150 my-2" />
          <h1 className="my-2 text-2xl ">
            Track your meals, workouts, and streaks — level up your health with
            XP and progress charts!
          </h1>

          <div className="bg-white text-black text-xl px-5 py-2 rounded-full  cursor-pointer mt-2 ">
            <SignedOut>
              <SignInButton className="cursor-pointer" />
            </SignedOut>
          </div>
        </div>
      </div>
    </BlurFade>
  );
}

export default Intro;
