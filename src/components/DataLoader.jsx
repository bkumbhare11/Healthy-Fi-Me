import { useState, useEffect } from "react";

function DataLoader() {
  const tips = [
    "Fetching your fitness data 📊",
    "Almost ready! ⏳",
    "Stay patient 💪",
    "Good things take time 🌟",
  ];

  const [tip, setTip] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const number = Math.floor(Math.random() * tips.length);
      setTip(number);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      {/* Spinner */}
      <div className="w-14 h-14 border-4 border-gray-300 border-t-[#2f5941] rounded-full animate-spin"></div>

      {/* Loading text */}
      <p className="mt-4 text-lg sm:text-2xl font-semibold text-gray-700">
        Loading your data... ⏳
      </p>

      {/* tip */}
      <p className="mt-2 text-md sm:text-xl text-gray-500 italic animate-pulse">
        {tips[tip]}
      </p>
    </div>
  );
}

export default DataLoader;
