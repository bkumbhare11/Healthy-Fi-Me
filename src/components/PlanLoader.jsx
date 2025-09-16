import { useState, useEffect } from "react";

function PlanLoader() {
  const tips = [
    "Stay hydrated 💧",
    "Consistency is the key 🔑",
    "Eat more protein 🍳",
    "Take small steps daily 🚶",
    "Rest is also progress 🛌",
    "Warm up before workouts 🔥",
    "Track your progress 📊",
    "Stretch after exercise 🧘",
    "Sleep well for recovery 🛏️",
    "Set realistic goals 🎯",
    "Celebrate small wins 🎉",
    "Focus on form, not speed 🏋️",
    "Eat fruits and veggies 🍎🥦",
    "Keep a workout journal 📓",
    "Challenge yourself every week 💪",
  ];

  const [tip, setTip] = useState(0);

  useEffect(() => {
    let interval = setInterval(() => {
      let number = Math.floor(Math.random() * tips.length);
      setTip(number);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      {/* Spinner */}
      <div className="w-14 h-14 border-4 border-gray-300 border-t-[#2f5941] rounded-full animate-spin"></div>

      {/* Loading text */}
      <p className="mt-4 text-lg sm:text-2xl font-semibold text-gray-700">
        Generating your plan... ⏳
      </p>

      {/* Fitness tips */}
      <p className="mt-2 text-md sm:text-xl text-gray-500 italic animate-pulse">
        {tips[tip]}
      </p>
    </div>
  );
}

export default PlanLoader;
