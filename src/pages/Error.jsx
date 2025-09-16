import { useNavigate } from "react-router-dom";

function Error() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen  text-center px-4">
      <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
      <h2 className="text-2xl sm:text-3xl font-semibold mb-2">
        Oops! Page not found
      </h2>
      <p className="text-gray-600 mb-6">
        The page you're looking for doesn't exist.
      </p>
      <button
        onClick={() => navigate("/")}
        className="bg-[#2f5941] text-white px-6 py-3 rounded-xl text-lg sm:text-xl cursor-pointer"
      >
        Go Back Home
      </button>
    </div>
  );
}

export default Error;
