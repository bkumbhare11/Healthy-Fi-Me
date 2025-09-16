import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { getplan, updatePlan } from "@/redux/planSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { TbBulbFilled } from "react-icons/tb";
import { BiSolidDish } from "react-icons/bi";
import { CgGym } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import DataLoader from "@/components/DataLoader";
import { BlurFade } from "@/components/ui/blur-fade";

function Plan() {
  const navigate = useNavigate();
  const { user } = useUser();
  let uid = user.id;

  const plans = useSelector((state) => state.plan.planData);
  let [dailyPlan, setDailyPlan] = useState([]);

  const dispatch = useDispatch();

  let url =
    "https://healthy-fi-me-default-rtdb.asia-southeast1.firebasedatabase.app/";

  let date = new Date();
  let isoDate = date.toISOString();

  function startPlan() {
    axios
      .patch(`${url}/plans/${uid}.json`, { startDate: isoDate })
      .then((res) => {
        dispatch(updatePlan({ uid, startDate: isoDate }));
        console.log("start day saved");
        navigate("/");
      });
  }

  useEffect(() => {
    axios.get(`${url}/plans.json`).then((res) => {
      let tempPlans = [];
      for (let key in res.data) {
        tempPlans.push({
          id: key,
          ...res.data[key],
        });
      }
      dispatch(getplan(tempPlans));
    });
  }, []);

  console.log(plans);

  let currentPlan = plans.find((p) => p.id == uid);
  console.log(currentPlan);

  useEffect(() => {
    if (plans.length > 0) {
      if (currentPlan) {
        setDailyPlan(currentPlan.dailyPlan);
      }
    }
  }, [uid, plans]);

  console.log(dailyPlan);

  const plansArray = Object.values(dailyPlan);
  console.log(plansArray);

  return (
    <>
      <BlurFade delay={0.25} inView>
        {plansArray.length > 0 ? (
          <div className="w-[90%] sm:w-[80%] mx-auto mt-10">
            {plansArray.map((p, i) => (
              <div
                className="bg-[#fffdf3] mb-5 p-3 sm:p-5 rounded-xl sm:rounded-4xl"
                key={i}
              >
                <h1 className="text-3xl sm:text-4xl mb-3 font-semibold">
                  Day {i + 1}
                </h1>

                <div className="flex items-center justify-center gap-2">
                  <p className="text-2xl sm:text-3xl">
                    <TbBulbFilled />
                  </p>
                  <h1 className="sm:text-xl my-3 font-semibold">{p.tips[0]}</h1>
                </div>

                <div className="my-5">
                  <div className="flex  items-center gap-1  my-2">
                    <p className="font-semibold text-2xl sm:text-3xl">Meals</p>
                    <p className="text-2xl sm:text-3xl">
                      <BiSolidDish />
                    </p>
                  </div>

                  <div className="flex gap-2 my-2  ">
                    <p className="font-semibold  ">Breakfast</p>
                    <p>{p.meals.breakfast.name}</p>
                  </div>

                  <div className="flex gap-2 my-2 ">
                    <p className="font-semibold ">Lunch</p>
                    <p className="">{p.meals.lunch.name}</p>
                  </div>

                  <div className="flex gap-2 my-2 ">
                    <p className="font-semibold  ">Snacks</p>
                    <p>{p.meals.snacks.name}</p>
                  </div>

                  <div className="flex  gap-2 my-2 ">
                    <p className="font-semibold  ">Dinner</p>
                    <p>{p.meals.dinner.name}</p>
                  </div>
                </div>

                <div>
                  <div className="flex  items-center gap-1 my-2">
                    <p className="font-semibold text-2xl sm:text-3xl">
                      Workout
                    </p>
                    <p className="text-2xl sm:text-3xl">
                      <CgGym />
                    </p>
                  </div>

                  {p.workout.map((w, i) => (
                    <div className="flex gap-2" key={i}>
                      <p className="font-semibold">{i + 1}.</p>
                      <p>{w.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="flex justify-center">
              {!currentPlan.startDate ? (
                <button
                  className="bg-[#2f5941] text-md sm:text-xl text-white w-[50%] mb-5 py-2 rounded-xl cursor-pointer"
                  onClick={startPlan}
                >
                  Start Plan
                </button>
              ) : (
                <h1 className="font-semibold text-lg sm:text-2xl">
                  Your plan started on{" "}
                  {new Date(currentPlan.startDate).toLocaleDateString()}
                </h1>
              )}
            </div>
          </div>
        ) : (
          <DataLoader />
        )}
      </BlurFade>
    </>
  );
}

export default Plan;
