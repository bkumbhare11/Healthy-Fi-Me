import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getUser } from "@/redux/userSlice";
import { useUser } from "@clerk/clerk-react";
import { useSelector } from "react-redux";
import AIplan from "@/components/AIplan";
import { useNavigate } from "react-router-dom";
import DataLoader from "@/components/DataLoader";
import { BlurFade } from "@/components/ui/blur-fade";

function Profile() {
  let url =
    "https://healthy-fi-me-default-rtdb.asia-southeast1.firebasedatabase.app/";

  const dispatch = useDispatch();
  const { user } = useUser();
  const usersData = useSelector((state) => state.user.usersData);
  const [succes, setSucces] = useState(false);
  const navigate = useNavigate();
  const uid = user.id;
  console.log(usersData);

  const plans = useSelector((state) => state.plan.planData);
  console.log(plans);
  let currentPlan = plans.find((p) => p.id == uid);
  console.log(currentPlan);

  function genratePlan() {
    console.log("Button Clicked");
    setSucces(true);
    navigate("/AIplan");
  }

  useEffect(() => {
    axios.get(`${url}/users.json`).then((res) => {
      const tempusers = [];
      for (let key in res.data) {
        tempusers.push({ id: key, ...res.data[key] });
      }
      dispatch(getUser(tempusers));
    });
  }, []);

  const currentUser = usersData.find((u) => u.uid == uid);

  return (
    <>
      <BlurFade delay={0.25} inView>
        <div className="w-[90%] sm:w-[50%]    mx-auto mt-10">
          {currentUser ? (
            <div>
              <p className=" font-semibold text-xl sm:text-3xl  p-3 rounded-xl bg-[#fffdf3] mb-2">
                Name :{" "}
                <span className="font-normal my-2"> {currentUser.name}</span>
              </p>

              <p className=" font-semibold text-xl sm:text-3xl  p-3 rounded-xl bg-[#fffdf3] mb-2 ">
                Age : <span className="font-normal"> {currentUser.age}</span>
              </p>

              <p className=" font-semibold text-xl sm:text-3xl  p-3 rounded-xl bg-[#fffdf3] mb-2">
                Gender :{" "}
                <span className="font-normal"> {currentUser.gender}</span>
              </p>

              <p className=" font-semibold text-xl sm:text-3xl  p-3 rounded-xl bg-[#fffdf3] mb-2">
                Height :
                <span className="font-normal"> {currentUser.height}ft</span>
              </p>

              <p className=" font-semibold text-xl sm:text-3xl  p-3 rounded-xl bg-[#fffdf3] mb-2">
                Weight :
                <span className="font-normal"> {currentUser.weight}kg</span>
              </p>

              <p className=" font-semibold text-xl sm:text-3xl  p-3 rounded-xl bg-[#fffdf3] mb-2">
                Goal : <span className="font-normal"> {currentUser.goal}</span>
              </p>

              <p className=" font-semibold text-xl sm:text-3xl  p-3 rounded-xl bg-[#fffdf3] mb-2">
                Target Weight :{" "}
                <span className="font-normal">
                  {" "}
                  {currentUser.targetWeight}kg
                </span>
              </p>

              <p className=" font-semibold text-xl sm:text-3xl  p-3 rounded-xl bg-[#fffdf3] mb-2">
                Diet : <span className="font-normal"> {currentUser.diet}</span>
              </p>

              <p className=" font-semibold text-xl sm:text-3xl  p-3 rounded-xl bg-[#fffdf3] mb-2">
                Activity Level :{" "}
                <span className="font-normal">
                  {" "}
                  {currentUser.activityLevel}
                </span>
              </p>

              <div className="flex justify-center">
                {currentPlan ? (
                  ""
                ) : (
                  <button
                    className="text-xl  sm:text-3xl rounded-xl my-3 text-white py-2 px-3  bg-[#2f5941]"
                    onClick={genratePlan}
                  >
                    Genrate {currentUser.goal} plan
                  </button>
                )}
              </div>
            </div>
          ) : (
            <DataLoader />
          )}
          {succes && <AIplan />}
        </div>
      </BlurFade>
    </>
  );
}

export default Profile;
