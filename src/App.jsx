import "./App.css";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import Navbar from "./components/Navbar";
import Intro from "./pages/Intro";
import UserDetails from "./components/UserDetails";
import Home from "./pages/Home";
import Error from "./pages/Error";
import { Route, Routes } from "react-router-dom";
import Plan from "./pages/Plan";
import Logs from "./pages/Logs";
import Leaderboard from "./pages/Leaderboard";
import Profile from "./pages/Profile";
import AIplan from "./components/AIplan";

function App() {
  return (
    <>
      <header>
        <SignedOut>
          <Intro />
        </SignedOut>
        <SignedIn>
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/userDetails" element={<UserDetails />}></Route>
            <Route path="/plans" element={<Plan />}></Route>
            <Route path="/logs" element={<Logs />}></Route>
            <Route path="/AIplan" element={<AIplan />}></Route>
            <Route path="/leaderboard" element={<Leaderboard />}></Route>
            <Route path="*" element={<Error />}></Route>
          </Routes>
        </SignedIn>
      </header>
    </>
  );
}

export default App;
