import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useUser } from "@clerk/clerk-react";
import { addPlan } from "@/redux/planSlice";
import { useNavigate } from "react-router-dom";
import PlanLoader from "./PlanLoader";

function AIplan() {
  const { user } = useUser();
  const [plan, setPlan] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const uid = user.id;
  //   console.log(uid);

  const dispatch = useDispatch();
  let usersData = useSelector((state) => state.user.usersData);

  let url =
    "https://healthy-fi-me-default-rtdb.asia-southeast1.firebasedatabase.app/";

  let apiUrl =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

  const currentUser = usersData.find((u) => u.uid == uid);

  let prompt = `You are a professional fitness and nutrition expert. 
Generate a personalized 7-day fitness and diet plan for ${currentUser.goal} in pure JSON format only. 
Do not include any explanation, text, or markdown. 
Return strictly a valid JSON object.

The output JSON must have this structure:
{
  "dailyPlan": {
    "day1": {
      "targetCalories": 0,
      "meals": {
        "breakfast": { "name": "...", "calories": 0, "done": false },
        "lunch": { "name": "...", "calories": 0, "done": false },
        "snacks": { "name": "...", "calories": 0, "done": false },
        "dinner": { "name": "...", "calories": 0, "done": false }
      },
      "workout": [
        { "name": "...", "burnedCalories": 0, "done": false },
        { "name": "...", "burnedCalories": 0, "done": false }
      ],
      "tips": ["..."]
    },
    "day2": { ... },
    ...
    "day7": { ... }
  }
}

User Details:
- Name: ${currentUser.name}
- Age: ${currentUser.age}
- Gender: ${currentUser.gender}
- Height: ${currentUser.height} ft
- Weight: ${currentUser.weight} kg
- Goal: ${currentUser.goal}
- Target Weight: ${currentUser.targetWeight} kg
- Activity Level: ${currentUser.activityLevel}
- Diet Preference: ${currentUser.diet}

Make the plan easy for beginners, healthy, and sustainable.
Include realistic calories per meal, calories burned per workout, targetCalories, and boolean done fields (done: false for all meals and workouts initially).
Return only a valid JSON object.
Do not include markdown, code fences, or the word json`;

  //   console.log(prompt);

  let apiKey = "AIzaSyC7foEP1qQfz8KzKZEG523oPVPAc7pNNVQ";

  let headers = {
    "x-goog-api-key": apiKey,
    "Content-Type": "application/json",
  };

  let requestBody = {
    contents: [
      {
        parts: [
          {
            text: prompt,
          },
        ],
      },
    ],
  };

  useEffect(() => {
    axios.post(apiUrl, requestBody, { headers }).then((res) => {
      let response = res.data.candidates[0].content.parts[0].text;
      response = response.replace(/```json|```/g, "").trim();
      console.log(response);
      let planObj = JSON.parse(response);
      setPlan(planObj);
      console.log(planObj);

      axios
        .put(`${url}/plans/${uid}.json`, planObj)
        .then((res) => {
          dispatch(addPlan({ plan: planObj }));
          console.log("Got user details, plan created and added ✅");
          navigate("/plans");
          setLoading(false);
        })
        .catch((err) => console.log(err));
    });
  }, []);

  useEffect(() => {
    if (plan) console.log("Plan state:", plan);
  }, [plan]);

  //   console.log(res.data.candidates[0].content.parts[0].text)

  return <>{loading && <PlanLoader />}</>;
}

export default AIplan;
