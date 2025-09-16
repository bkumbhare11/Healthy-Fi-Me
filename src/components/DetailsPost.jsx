import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "@/redux/userSlice";
import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import AIplan from "./AIplan";

function DetailsPost({ userDetails }) {
  const dispatch = useDispatch();
  const { user } = useUser();

  let url =
    "https://healthy-fi-me-default-rtdb.asia-southeast1.firebasedatabase.app/";

  useEffect(() => {
    if (userDetails) {
      axios
        .post(`${url}/users.json`, {
          uid: user.id,
          name: userDetails.name,
          age: userDetails.age,
          gender: userDetails.gender,
          height: userDetails.height,
          weight: userDetails.weight,
          goal: userDetails.goal,
          targetWeight: userDetails.targetWeight,
          activityLevel: userDetails.activityLevel,
          diet: userDetails.diet,
          xp: 0,
        })
        .then((res) => {
          dispatch(
            addUser({
              id: res.data.name,
              uid: user.id,
              fId: res.data.name,
              name: userDetails.name,
              age: userDetails.age,
              gender: userDetails.gender,
              height: userDetails.height,
              weight: userDetails.weight,
              goal: userDetails.goal,
              targetWeight: userDetails.targetWeight,
              activityLevel: userDetails.activityLevel,
              diet: userDetails.diet,
              xp: 0,
            })
          );
          console.log("User Added");
        })
        .catch((err) => console.log(err));
    }
  }, [userDetails]);

  return <></>;
}

export default DetailsPost;
