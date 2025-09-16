import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { BlurFade } from "@/components/ui/blur-fade";

function Leaderboard() {
  const usersData = useSelector((state) => state.user.usersData);
  const dispatch = useDispatch();
  let url =
    "https://healthy-fi-me-default-rtdb.asia-southeast1.firebasedatabase.app/";

  console.log(usersData);
  let sortedArray = [...usersData].sort((a, b) => b.xp - a.xp);

  return (
    <BlurFade delay={0.25} inView>
      <div className="w-[300px] sm:w-[500px]  mx-auto mt-5">
        <h1 className="text-center my-5 font-semibold text-2xl sm:text-4xl">
          LeaderBoard
        </h1>
        {sortedArray.map((user, index) => (
          <div className="bg-[#fffdf3] p-2 rounded-2xl my-2" key={index}>
            <div className="flex justify-between">
              <h1>{user.name} </h1>
              <p>{user.xp} 🔥</p>
            </div>
          </div>
        ))}
      </div>
    </BlurFade>
  );
}

export default Leaderboard;
