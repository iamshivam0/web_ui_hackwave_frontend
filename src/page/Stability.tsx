import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import backgroundImage from "@/assets/windmills-alternative-energy.jpg"; // Import your background image

const PowerPrediction = () => {
  const [formData, setFormData] = useState({
    month: "",
    day: "",
    time: "",
    p1: "",
    p2: "",
    p3: "",
    c1: "",
    c2: "",
    c3: "",
    Total_Power: "",
  });
  const [prediction, setPrediction] = useState<any>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8000/predict/power/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    setPrediction(data.power_prediction);
  };

  const handleGoBack = () => {
    // Navigate to the home page
    window.location.href = "/";
  };

  const getTime = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const currentDate = new Date();
    const currentHour = currentDate.getHours(); // Get the current hour
    const currentMonth = currentDate.getMonth() + 1; // Get the current month (0-11, so adding 1 to make it 1-12)
    const currentDay = currentDate.getDate(); // Get the day of the month (1-31)

    const currentTime = {
      month: currentMonth.toString(), // Convert to string
      day: currentDay.toString(), // Convert to string
      time: currentHour.toString(), // Convert to string
    };

    setFormData((prevState) => ({
      ...prevState,
      month: currentTime.month,
      day: currentTime.day,
      time: currentTime.time,
    }));
  };

  return (
    <div
      className="h-screen bg-center bg-cover"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="py-40">
        <div className="flex items-center justify-center text-center">
          <h2 className="text-3xl font-bold text-center">
            Power Generation Prediction
          </h2>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex items-center justify-center px-8 py-6"
        >
          <Card className=" w-[42vh] bg-gray-300 text-gray-800 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-30">
            <CardHeader>
              <CardTitle>Input Data</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                {Object.entries(formData).map(([key, value]) => (
                  <div key={key} className="flex flex-col space-y-1.5">
                    <Label htmlFor={key}>{key}</Label>
                    <Input
                      id={key}
                      type="text"
                      value={value}
                      onChange={handleChange}
                      name={key}
                      placeholder={`Enter ${key}`}
                    />
                  </div>
                ))}
              </div>
            </CardContent>

            <CardFooter className="flex justify-end">
              <Button type="submit">Predict</Button>
              <Button onClick={(e) => getTime(e)}>Current Time</Button>
            </CardFooter>
          </Card>
        </form>
        {prediction !== "" && (
          <div className="flex items-center justify-center mt-8">
            <Card className="w-[36vh] bg-gray-300 text-gray-800 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30">
              <CardContent>
                <p className="text-lg font-normal text-center ">
                  Predicted Power: {prediction}
                </p>
              </CardContent>
            </Card>
          </div>
        )}
        {prediction === 0 && (
          <div className="flex items-center justify-center mt-8">
            <Card className="w-[36vh] bg-gray-300 text-gray-800 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30">
              <CardContent>
                <p className="flex items-center justify-center text-lg font-normal ">
                  Enter valid data
                </p>
              </CardContent>
            </Card>
          </div>
        )}
        <div className="flex items-center justify-center mt-8">
          <Button
            className="p-5 m-3 text-gray-800 bg-gray-300 border rounded bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 hover:bg-gray-400"
            onClick={handleGoBack}
          >
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PowerPrediction;
