import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { getLog } from "@/redux/logSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useUser } from "@clerk/clerk-react";
import { BarChart } from "@mui/x-charts/BarChart";
import { updateUser } from "@/redux/userSlice";
import { BlurFade } from "@/components/ui/blur-fade";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function Logs() {
  const { user } = useUser();
  const dispatch = useDispatch();
  const uid = user.id;
  let dailylogData = useSelector((state) => state.log.logsData);
  const usersData = useSelector((state) => state.user.usersData);
  let [logArray, setLogArray] = useState([]);
  let [xp, setXp] = useState(0);

  let url =
    "https://healthy-fi-me-default-rtdb.asia-southeast1.firebasedatabase.app/";

  useEffect(() => {
    axios.get(`${url}/logs.json`).then((res) => {
      console.log(res.data);
      let tempLogs = [];
      for (let key in res.data) {
        tempLogs.push({
          id: key,
          ...res.data[key],
        });
      }
      dispatch(getLog(tempLogs));
      console.log(tempLogs);
    });
  }, []);

  useEffect(() => {
    if (dailylogData && dailylogData.length > 0) {
      let currentUserLog = dailylogData.find((log) => log.id == uid);
      console.log(currentUserLog);

      if (currentUserLog) {
        const log = Object.entries(currentUserLog)
          .filter(([key]) => key !== "id") // skip id
          .map(([key, value]) => ({ day: key, ...value }));
        setLogArray(log);
      } else {
        console.log("No log found for current user");
        setLogArray([]); // ya phir empty array
      }
    }
  }, [dailylogData, uid]);

  console.log(logArray);

  const chartData = logArray.map((log) => ({
    day: log.day,
    targetCalories: log.targetCalories,
    caloriesConsumed: log.caloriesConsumed,
    caloriesBurned: log.caloriesBurned,
    adherence: log.adherence,
    xp: log.xp,
  }));

  const chartSetting = {
    yAxis: [
      {
        label: "Calories/Adherence",
        width: 60,
      },
    ],
    height: 300,
  };

  useEffect(() => {
    if (usersData.length > 0 && chartData.length > 0) {
      const user = usersData.find((u) => u.uid === uid);

      const totalxp = chartData.reduce((acc, d) => acc + d.xp, 0);
      setXp(totalxp);

      if (user.xp !== totalxp) {
        axios
          .patch(`${url}/users/${user.id}.json`, { xp: totalxp })
          .then(() => {
            dispatch(updateUser({ id: user.id, xp: totalxp }));
            console.log("User XP Updated");
          });
      }
    }
  }, [usersData, chartData, uid]);

  return (
    <>
      <BlurFade delay={0.25} inView>
        <div className=" w-[90%] sm:w-[80%]  mx-auto ">
          <h1 className="text-center my-5 font-semibold text-2xl sm:text-4xl">
            {" "}
            Daily Progress Overview
          </h1>

          <div className="flex justify-end">
            <p className="font-semibold bg-[#fffdf3] px-3 py-2 text-lg rounded-xl ">
              Total XP : {xp}🔥
            </p>
          </div>

          <div className="bg-[#fffdf3]  my-5 p-2 rounded-xl sm:rounded-4xl">
            <BarChart
              dataset={chartData}
              xAxis={[{ dataKey: "day" }]}
              series={[
                { dataKey: "targetCalories", label: "Target Calories" },
                { dataKey: "caloriesConsumed", label: "Calories Consumed" },
                { dataKey: "caloriesBurned", label: "Calories Burned" },
                { dataKey: "adherence", label: "Adherence" },
              ]}
              {...chartSetting}
            />
          </div>
        </div>

        <div className="bg-[#fffdf3] w-[90%] sm:w-[80%] my-5 mx-auto p-2 rounded-xl sm:rounded-4xl">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-semibold text-center">Day</TableHead>
                <TableHead className="font-semibold text-center">
                  Target Calories
                </TableHead>
                <TableHead className="font-semibold text-center">
                  Calories Consumed
                </TableHead>
                <TableHead className="font-semibold text-center">
                  Calories Burned
                </TableHead>
                <TableHead className="font-semibold text-center">
                  Adherence
                </TableHead>

                <TableHead className="font-semibold text-center">
                  XP Gain
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {chartData.map((data, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium text-center">
                    {index + 1}
                  </TableCell>
                  <TableCell className="text-center">
                    {data.targetCalories}
                  </TableCell>
                  <TableCell className="text-center">
                    {data.caloriesConsumed}
                  </TableCell>
                  <TableCell className="text-center">
                    {data.caloriesBurned}
                  </TableCell>
                  <TableCell className="text-center">
                    {data.adherence}%
                  </TableCell>

                  <TableCell className="text-center">{data.xp}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </BlurFade>
    </>
  );
}

export default Logs;
