import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link } from "react-router-dom";

function Hamburger() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="bg-transparent text-black border-none outline-none text-2xl">
          ☰
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-[#e6d7ca]">
        <SheetHeader>
          <SheetTitle></SheetTitle>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <div className="grid gap-3">
            <SheetClose asChild>
              <Link to={"/"} className="font-semibold text-md">
                {" "}
                <h1>Home</h1>{" "}
              </Link>
            </SheetClose>
          </div>

          <div className="grid gap-3">
            <SheetClose asChild>
              <Link to={"/profile"} className="font-semibold text-md">
                {" "}
                <h1>Profile</h1>{" "}
              </Link>
            </SheetClose>
          </div>

          <div className="grid gap-3">
            <SheetClose asChild>
              <Link to={"/plans"} className="font-semibold text-md">
                {" "}
                <h1>Plan</h1>{" "}
              </Link>
            </SheetClose>
          </div>

          <div className="grid gap-3">
            <SheetClose asChild>
              <Link to={"/logs"} className="font-semibold text-md">
                {" "}
                <h1>Log</h1>{" "}
              </Link>
            </SheetClose>
          </div>

          <div className="grid gap-3">
            <SheetClose asChild>
              <Link to={"/leaderboard"} className="font-semibold text-md">
                {" "}
                <h1>Leaderboard</h1>{" "}
              </Link>
            </SheetClose>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default Hamburger;
