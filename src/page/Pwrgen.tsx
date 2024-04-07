import React, { useEffect, useState } from "react";
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
import Chart from "chart.js/auto";
import backgroundImage from "@/assets/windmills-alternative-energy.jpg"; // Import your background image
import Barchart from "@/components/Barchart";
// import { Bar } from "react-chartjs-2";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Pwrgen = () => {
  const [formData, setFormData] = useState({
    Air_temperature: "",
    Pressure: "",
    Wind_speed: "",
  });
  const [prediction, setPrediction] = useState<any>("");
  const [data, setData] = useState<any>([]);
  const [render, setRender] = useState<any>(0);
  const [power, setPower] = useState<any>([]);
  const [pressure, setPressure] = useState<any>([]);
  const [temp, setTemp] = useState<any>([]);
  const [wind, setWind] = useState<any>([]);
  const [pvt, setPvt] = useState<any>([]);
  const [pvp, setPvp] = useState<any>([]);
  const [pvw, setPvw] = useState<any>([]);

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8000/predict/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    setPrediction(data.power);

    const powerdata = {
      formData,
      power: data.power,
    };

    const res = await fetch("http://localhost:8004/api/power/savepower", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(powerdata),
    });
    setRender(render + 1);
  };
  const handleGoBack = () => {
    // Navigate to the home page
    window.location.href = "/";
  };

  useEffect(() => {
    fetch("http://localhost:8004/api/power/getpower", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res: any) => {
        // console.log(res?.msg);
        setData(res?.data);
        const p = res?.data?.map((item: any) => item.power);
        // console.log(p);
        setPower([...p]);
        const t = res?.data?.map((item: any) => item.temperature);
        setTemp([...t]);
        const w = res?.data?.map((item: any) => item.windSpeed);
        setWind([...w]);
        const pr = res?.data?.map((item: any) => item.pressure);
        setPressure([...pr]);
        // console.log(p, t, w, pr);
        let x: any = [];
        res?.data?.map((item: any) => {
          x = [
            ...x,
            {
              temp: item.temperature,
              power: item.power,
            },
          ];
        });

        let y: any = [];
        res?.data?.map((item: any) => {
          y = [
            ...y,
            {
              pressure: item.pressure,
              power: item.power,
            },
          ];
        });

        let z: any = [];

        res?.data?.map((item: any) => {
          z = [
            ...z,
            {
              windspeed: item.windSpeed,
              power: item.power,
            },
          ];
        });

        setPvt(x);
        setPvp(y);
        setPvw(z);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // console.log(data);

  // useEffect(() => {
  //   if (data?.length === 0) return;

  //   const ctx = document.getElementById(
  //     "temperaturePressureChart"
  //   ) as HTMLCanvasElement;

  //   // const gtx = document.getElementById("pressureChart") as HTMLCanvasElement;
  //   const myChart = new Chart(ctx, {
  //     type: "bar",
  //     data: {
  //       labels: data?.map((item: any) => item.temperature),
  //       datasets: [
  //         {
  //           label: "Temperature vs power",
  //           data: data?.map((item: any) => item.power),
  //           backgroundColor: "rgba(54, 162, 235, 0.2)",
  //           borderColor: "rgba(54, 162, 235, 1)",
  //           borderWidth: 1,
  //         },
  //       ],
  //     },
  //     options: {
  //       scales: {
  //         y: {
  //           beginAtZero: true,
  //         },
  //       },
  //     },
  //   });

  //   // const pressureChart = new Chart(gtx, {
  //   //   type: "bar",
  //   //   data: {
  //   //     labels: data?.map((item: any) => item.pressure),
  //   //     datasets: [
  //   //       {
  //   //         label: "Temperature vs power",
  //   //         data: data?.map((item: any) => item.power),
  //   //         backgroundColor: "rgba(54, 162, 235, 0.2)",
  //   //         borderColor: "rgba(54, 162, 235, 1)",
  //   //         borderWidth: 1,
  //   //       },
  //   //     ],
  //   //   },
  //   //   options: {
  //   //     scales: {
  //   //       y: {
  //   //         beginAtZero: true,
  //   //       },
  //   //     },
  //   //   },
  //   // });

  //   return () => {
  //     myChart.destroy(); // Cleanup chart instance to prevent memory leaks
  //   };
  // }, [data, render, setRender]);

  return (
    <div
      className="h-screen bg-center bg-cover"
      style={{ backgroundImage: `url(${backgroundImage})` }}
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
          <Card className="w-[42vh] bg-gray-300 text-gray-800 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-30">
            <CardHeader>
              <CardTitle>Input Data</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid items-center w-full gap-4 ">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="Air_temperature">Air Temperature (°C)</Label>
                  <Input
                    id="Air_temperature"
                    type="text"
                    value={formData.Air_temperature}
                    onChange={handleChange}
                    name="Air_temperature"
                    placeholder="Enter air temperature"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="Pressure">Pressure (atm)</Label>
                  <Input
                    id="Pressure"
                    type="text"
                    value={formData.Pressure}
                    onChange={handleChange}
                    name="Pressure"
                    placeholder="Enter pressure"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="Wind_speed">Wind Speed (m/s)</Label>
                  <Input
                    className="rounded "
                    id="Wind_speed"
                    type="text"
                    value={formData.Wind_speed}
                    onChange={handleChange}
                    name="Wind_speed"
                    placeholder="Enter wind speed"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button type="submit">Predict</Button>
            </CardFooter>
          </Card>
        </form>
        {prediction && (
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
            className="p-5 m-3 text-gray-800 bg-gray-300 border rounded bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 hover:bg-gray-400" // Add hover:bg-gray-400 class
            onClick={handleGoBack}
          >
            Go Back
          </Button>
        </div>
        {/* <div className="flex items-center justify-center mt-8">
          <canvas id="temperaturePressureChart" width="50" height="80"></canvas>
        </div> */}
        <div className="flex">
          <div className="py-12">
            <div className="max-w-xl mx-auto sm:px-6 lg:px-8">
              <div className="overflow-hidden bg-white shadow-xl sm:rounded-lg">
                <div>
                  <Barchart
                    xlabel="temp"
                    title="Temperature vs Power"
                    data={pvt}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="py-12">
            <div className="max-w-xl mx-auto sm:px-6 lg:px-8">
              <div className="overflow-hidden bg-white shadow-xl sm:rounded-lg">
                <div>
                  <Barchart
                    xlabel="pressure"
                    title="Pressure vs Power"
                    data={pvp}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="py-12">
            <div className="max-w-xl mx-auto sm:px-6 lg:px-8">
              <div className="overflow-hidden bg-white shadow-xl sm:rounded-lg">
                <div>
                  <Barchart
                    xlabel="windspeed"
                    title="Wind Speed vs Power"
                    data={pvw}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={data} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="pressure"
              fill="#8884d8"
              activeBar={<Rectangle fill="pink" stroke="blue" />}
            />
            <Bar
              dataKey="temperature"
              fill="#8884d8"
              activeBar={<Rectangle fill="pink" stroke="blue" />}
            />{" "}
            <Bar
              dataKey="windSpeed"
              fill="#8884d8"
              activeBar={<Rectangle fill="pink" stroke="blue" />}
            />
          </BarChart>
        </div>
      </div>
    </div>
  );
};

export default Pwrgen;
