import React from "react";
import { useSelector } from "react-redux";
import { useUser } from "@clerk/clerk-react";
import { FaWeight } from "react-icons/fa";
import { GoGoal } from "react-icons/go";
import { MdTimer } from "react-icons/md";
import { CgGym } from "react-icons/cg";
import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getplan } from "@/redux/planSlice";
import { getUser } from "@/redux/userSlice";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { TbBulbFilled } from "react-icons/tb";
import { addLog } from "@/redux/logSlice";
import { useNavigate } from "react-router-dom";
import PlanLoader from "@/components/PlanLoader";
import { BlurFade } from "@/components/ui/blur-fade";

function Home() {
  const navigate = useNavigate();
  let { user } = useUser();
  const uid = user.id;
  const dispatch = useDispatch();
  const usersData = useSelector((state) => state.user.usersData);
  const plans = useSelector((state) => state.plan.planData);
  let [dailyPlan, setDailyPlan] = useState([]);
  let [day, setDay] = useState(0);
  let dailylogData = useSelector((state) => state.log.logsData);

  const [breakfastStatus, setBreakfastStatus] = useState(false);
  const [lunchStatus, setLunchStatus] = useState(false);
  const [snacksStatus, setSnacksStatus] = useState(false);
  const [dinnerStatus, setDinnerStatus] = useState(false);
  const [workout1Status, setWorkout1Status] = useState(false);
  const [workout2Status, setWorkout2Status] = useState(false);

  const [dayComplete, setDayComplete] = useState(false);

  let url =
    "https://healthy-fi-me-default-rtdb.asia-southeast1.firebasedatabase.app/";

  function handleClick() {
    navigate("/userDetails");
  }

  useEffect(() => {
    if (usersData.length == 0) {
      axios.get(`${url}/users.json`).then((res) => {
        const tempusers = [];
        for (let key in res.data) {
          tempusers.push({ id: key, ...res.data[key] });
        }
        dispatch(getUser(tempusers));
      });
    }
  }, []);

  const currentUser = usersData.find((u) => u.uid === user.id);

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

  let currentPlan = plans.find((p) => p.id == uid);
  // console.log(currentPlan.startDate);

  useEffect(() => {
    if (plans.length > 0) {
      if (currentPlan) {
        setDailyPlan(currentPlan.dailyPlan);
      }
    }
  }, [uid, plans]);

  // Date Calclulation
  useEffect(() => {
    if (currentPlan && currentPlan.startDate) {
      let start = new Date(currentPlan.startDate);
      start.setHours(0, 0, 0, 0);
      let todayDate = new Date();
      todayDate.setHours(0, 0, 0, 0);
      let difference = todayDate - start;
      let currentDay = Math.floor(difference / (24 * 60 * 60 * 1000)) + 1;
      setDay(currentDay);
    }
  }, [uid, currentPlan]);

  const plansArray = dailyPlan ? Object.values(dailyPlan) : [];
  console.log(plansArray);

  // Calories consumed Calculation
  let caloriesConsumed = 0;
  if (breakfastStatus)
    caloriesConsumed += plansArray[day].meals.breakfast.calories;

  if (lunchStatus) caloriesConsumed += plansArray[day].meals.lunch.calories;
  if (snacksStatus) caloriesConsumed += plansArray[day].meals.snacks.calories;
  if (dinnerStatus) caloriesConsumed += plansArray[day].meals.dinner.calories;

  console.log(caloriesConsumed);

  // Calories burned Calclulation
  let caloriesBurned = 0;
  if (workout1Status)
    caloriesBurned += plansArray[day].workout[0].burnedCalories;
  if (workout2Status)
    caloriesBurned += plansArray[day].workout[1].burnedCalories;

  console.log(caloriesBurned);

  // XP Calclulation
  let xpPerItem = 10;
  let completionCount = 0;

  if (breakfastStatus) completionCount++;
  if (lunchStatus) completionCount++;
  if (snacksStatus) completionCount++;
  if (dinnerStatus) completionCount++;
  if (workout1Status) completionCount++;
  if (workout2Status) completionCount++;

  let xpEarned = completionCount * xpPerItem;

  if (completionCount === 6) xpEarned += 50;

  console.log(xpEarned);

  // Adherence calculation
  let itemsCount = 6;
  let adherence = Math.round((completionCount / itemsCount) * 100);
  console.log(adherence);

  // Target Calories for each day
  let target = plansArray[day - 1]?.targetCalories || 0;

  console.log(target);

  // Day complition status
  function handleComplete() {
    axios
      .patch(`${url}/logs/${uid}/day${day}.json`, {
        targetCalories: target,
        caloriesConsumed: caloriesConsumed,
        caloriesBurned: caloriesBurned,
        xp: xpEarned,
        adherence: adherence,
        completed: true,
      })
      .then((res) => {
        dispatch(
          addLog({
            uid,
            dayKey: `day${day}`,
            targetCalories: target,
            caloriesConsumed: caloriesConsumed,
            caloriesBurned: caloriesBurned,
            xp: xpEarned,
            adherence: adherence,
            completed: true,
          })
        );
        console.log("Log saved ✅");
      })
      .catch((err) => console.log(err));

    console.log(" day completed log posted");
  }

  console.log(dailylogData);
  let currentUserLog = dailylogData.find((log) => log.uid == uid);
  console.log(currentUserLog);

  useEffect(() => {
    if (currentUserLog?.completed) {
      // console.log(currentUserLog);
      // console.log(currentUserLog.completed);
      setDayComplete(true);
    }
  }, [currentUserLog]);

  return (
    <>
      <BlurFade delay={0.25} inView>
        {usersData.length > 0 && usersData.some((u) => u.uid === user.id) ? (
          <div className="w-[90%] sm:w-[80%] mx-auto mt-5">
            <div className="  rounded-xl  p-2 flex justify-between ">
              <div className="flex items-center gap-3  px-3 py-2 rounded-xl ">
                <img
                  src={user.imageUrl}
                  alt="user profile image"
                  className="w-10 sm:w-15 rounded-full"
                />
                <h1 className="text-lg font-semibold  sm:text-3xl">
                  Hello, {currentUser.name}
                </h1>
              </div>

              <p className="text-sm sm:text-2xl bg-[#f8ead8] h-fit min-w-[100px] py-2 px-3 rounded-xl text-center ">
                <span className="font-semibold">XP</span> : {currentUser.xp}⚡️
              </p>
            </div>
            {/* Usery summary details */}
            <div className="mt-5">
              <div className="flex flex-wrap justify-around">
                <div className=" p-3 rounded-4xl flex flex-col items-center gap-2 mb-2 w-[120px] bg-[#f8ead8]  ">
                  <p className="text-4xl sm:text-5xl">
                    <FaWeight />
                  </p>
                  <h1 className="font-semibold">
                    {currentUser.weight} → {currentUser.targetWeight}
                  </h1>
                </div>

                <div className=" p-3 rounded-4xl flex flex-col items-center gap-2 mb-2 w-[120px] bg-[#f8ead8] ">
                  <p className="text-4xl sm:text-5xl">
                    <GoGoal />
                  </p>
                  <h1 className="font-semibold">{currentUser.goal}</h1>
                </div>

                <div className=" p-3 rounded-4xl flex flex-col items-center gap-2 w-[120px] bg-[#f8ead8] ">
                  <p className="text-4xl sm:text-5xl">
                    <MdTimer />
                  </p>
                  <h1 className="font-semibold">7 Days</h1>
                </div>

                <div className=" p-3 rounded-4xl flex flex-col items-center gap-2 w-[120px] bg-[#f8ead8] ">
                  <p className="text-4xl sm:text-5xl">
                    <CgGym />
                  </p>
                  <h1 className="font-semibold">{currentUser.activityLevel}</h1>
                </div>
              </div>
            </div>

            {/* Daily Plan section */}
            {plansArray.length > 0 && plansArray[day - 1] ? (
              <div className="mt-5 w-[90%] sm:w-[80%] my-5  mx-auto relative">
                <div className="bg-[#fffdf3] p-3 sm:p-5 rounded-xl sm:rounded-4xl">
                  <h1 className="text-3xl sm:text-4xl mb-5 font-semibold">
                    Day {day}
                  </h1>

                  <div className="flex items-center justify-center gap-2 mb-5">
                    <p className="text-2xl sm:text-3xl">
                      <TbBulbFilled />
                    </p>
                    <h1 className="sm:text-xl my-3 font-semibold">
                      {plansArray[day - 1].tips[1]}
                    </h1>
                  </div>

                  <div className="font-semibold text-2xl sm:text-3xl mb-5">
                    <h1>Meals</h1>
                  </div>

                  <div className="mb-5">
                    <h1 className="font-semibold text-xl sm:text-2xl mb-2">
                      BreakFast
                    </h1>

                    <div className="flex flex-col gap-6">
                      <div className="flex items-center gap-3 ml-5 ">
                        <Checkbox
                          id="breakfast"
                          className="border border-black sm:h-6 sm:w-6"
                          checked={breakfastStatus}
                          onCheckedChange={(checked) =>
                            setBreakfastStatus(checked)
                          }
                        />
                        <Label
                          htmlFor="breakfast"
                          className="text-md sm:text-xl  "
                        >
                          {plansArray[day - 1].meals.breakfast.name}
                        </Label>
                      </div>
                    </div>
                  </div>

                  <div className="mb-5">
                    <h1 className="font-semibold text-xl sm:text-2xl mb-2">
                      Lunch
                    </h1>
                    <div className="flex flex-col gap-6">
                      <div className="flex items-center gap-3 ml-5 ">
                        <Checkbox
                          id="lunch"
                          className="border border-black sm:h-6 sm:w-6"
                          checked={lunchStatus}
                          onCheckedChange={(checked) => setLunchStatus(checked)}
                        />
                        <Label htmlFor="lunch" className="text-md sm:text-xl  ">
                          {plansArray[day - 1].meals.lunch.name}
                        </Label>
                      </div>
                    </div>
                  </div>

                  <div className="mb-5">
                    <h1 className="font-semibold text-xl sm:text-2xl mb-2">
                      Snacks
                    </h1>
                    <div className="flex flex-col gap-6">
                      <div className="flex items-center gap-3 ml-5 ">
                        <Checkbox
                          id="terms"
                          className="border border-black sm:h-6 sm:w-6"
                          checked={snacksStatus}
                          onCheckedChange={(checked) =>
                            setSnacksStatus(checked)
                          }
                        />
                        <Label htmlFor="terms" className="text-md sm:text-xl  ">
                          {plansArray[day - 1].meals.snacks.name} -{" "}
                        </Label>
                      </div>
                    </div>
                  </div>

                  <div className="mb-5">
                    <h1 className="font-semibold text-xl sm:text-2xl mb-2">
                      Dinner
                    </h1>
                    <div className="flex flex-col gap-6">
                      <div className="flex items-center gap-3 ml-5 ">
                        <Checkbox
                          id="terms"
                          className="border border-black sm:h-6 sm:w-6"
                          checked={dinnerStatus}
                          onCheckedChange={(checked) =>
                            setDinnerStatus(checked)
                          }
                        />
                        <Label htmlFor="terms" className="text-md sm:text-xl  ">
                          {plansArray[day - 1].meals.dinner.name}
                        </Label>
                      </div>
                    </div>
                  </div>

                  <div className="font-semibold text-2xl sm:text-3xl mb-5">
                    <h1>Workout</h1>
                  </div>

                  <div className="flex flex-col gap-6 mb-2">
                    <div className="flex items-center gap-3 ml-5 ">
                      <Checkbox
                        id="terms"
                        className="border border-black sm:h-6 sm:w-6"
                        checked={workout1Status}
                        onCheckedChange={(checked) =>
                          setWorkout1Status(checked)
                        }
                      />
                      <Label htmlFor="terms" className="text-md sm:text-xl  ">
                        {plansArray[day - 1].workout[0].name}
                      </Label>
                    </div>
                  </div>

                  <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-3 ml-5 ">
                      <Checkbox
                        id="terms"
                        className="border border-black sm:h-6 sm:w-6"
                        checked={workout2Status}
                        onCheckedChange={(checked) =>
                          setWorkout2Status(checked)
                        }
                      />
                      <Label htmlFor="terms" className="text-md sm:text-xl  ">
                        {plansArray[day - 1].workout[1].name}
                      </Label>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <button
                      disabled={dayComplete}
                      className="px-4 py-2 mt-5 rounded-2xl text-lg sm:text-2xl bg-[#2f5941] text-white cursor-pointer"
                      onClick={handleComplete}
                    >
                      {dayComplete ? "Completed" : "Submit"}
                    </button>
                  </div>
                </div>

                {dayComplete ? (
                  <div className="bg-[#000000d3] absolute inset-0 flex justify-center items-center rounded-xl sm:rounded-4xl ">
                    <h1 className=" text-white text-2xl text-center  ">
                      You’ve completed today’s plan. See you tomorrow!!”
                    </h1>
                  </div>
                ) : (
                  ""
                )}
              </div>
            ) : (
              <PlanLoader />
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-screen  text-center px-4">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-2">
              Welcome! Let’s get started on your fitness journey. First, we need
              a few details about you so we can create your personalized plan
            </h2>
            <p className="text-gray-600 mb-6">
              Your fitness journey begins here. Click the button below to fill
              in your details.
            </p>
            <button
              onClick={handleClick}
              className="bg-[#2f5941] text-white px-6 py-3 rounded-xl text-lg sm:text-xl cursor-pointer"
            >
              Fill Your Details
            </button>
          </div>
        )}
      </BlurFade>
    </>
  );
}

export default Home;
