import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useForm, Controller } from "react-hook-form";
import DetailsPost from "./DetailsPost";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function UserDetails() {
  let { register, handleSubmit, control } = useForm();
  let [userDetails, setUserDetails] = useState("");
  let navigate = useNavigate();

  function submitDetails(user) {
    console.log(user);
    setUserDetails(user);
    navigate("/profile");
  }

  return (
    <div className=" flex justify-center">
      <Card className="w-full mt-15 max-w-xl  bg-[#faecdb]">
        <CardHeader>
          <CardTitle>Enter your details</CardTitle>
          <CardDescription className="text-red-600">
            Please fill you details carefully once submitted it cannot be
            changed
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(submitDetails)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  className="border-black"
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  required
                  {...register("name")}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  className="border-black"
                  id="age"
                  type="number"
                  placeholder="Enter your age"
                  required
                  {...register("age")}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="gender" className="mb-1">
                  Gender
                </Label>

                <Controller
                  name="gender"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <RadioGroup
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="male"
                          id="male"
                          className="border-black"
                        />
                        <Label htmlFor="male">Male</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="female"
                          id="Female"
                          className="border-black"
                        />
                        <Label htmlFor="female">Female</Label>
                      </div>
                    </RadioGroup>
                  )}
                ></Controller>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="height">Height</Label>
                <Input
                  className="border-black"
                  id="height"
                  step="any"
                  type="number"
                  placeholder="Enter height in cm"
                  required
                  {...register("height")}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="weight">Weight</Label>
                <Input
                  className="border-black"
                  id="weight"
                  step="any"
                  type="number"
                  placeholder="Enter weight in kg"
                  required
                  {...register("weight")}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="goal" className="mb-1">
                  Goal
                </Label>

                <Controller
                  name="goal"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <RadioGroup
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="weight loss"
                          id="weight loss"
                          className="border-black"
                        />
                        <Label htmlFor="weight loss">Weight Loss</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="maintain"
                          id="maintain"
                          className="border-black"
                        />
                        <Label htmlFor="maintain">Maintain</Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="gain"
                          id="gain"
                          className="border-black"
                        />
                        <Label htmlFor="gain">Gain</Label>
                      </div>
                    </RadioGroup>
                  )}
                ></Controller>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="target wieght">Target Weight</Label>
                <Input
                  className="border-black"
                  id="target wieght"
                  type="number"
                  placeholder="Enter target wieght in cm"
                  required
                  {...register("targetWeight")}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="activity level">Activity Level</Label>

                <Controller
                  name="activityLevel"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full border-black">
                        <SelectValue placeholder="Activity Level" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#e6d7ca]">
                        <SelectItem value="sedentary">Sedentary</SelectItem>
                        <SelectItem value="light">light</SelectItem>
                        <SelectItem value="moderate">Moderate</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="very active">Vary Active</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                ></Controller>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="diet preference" className="mb-1">
                  Diet Preference
                </Label>

                <Controller
                  name="diet"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <RadioGroup
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="Veg"
                          id="Veg"
                          className="border-black"
                        />
                        <Label htmlFor="Veg">Veg</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="non-veg"
                          id="non-veg"
                          className="border-black"
                        />
                        <Label htmlFor="non-veg">Non-Veg</Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="both"
                          id="both"
                          className="border-black"
                        />
                        <Label htmlFor="both">Both</Label>
                      </div>
                    </RadioGroup>
                  )}
                ></Controller>
              </div>

              <Button type="submit" className="w-full bg-[#2f5941]">
                Submit Details
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Passing form data as a prop */}
      {userDetails && <DetailsPost userDetails={userDetails} />}
    </div>
  );
}

export default UserDetails;
