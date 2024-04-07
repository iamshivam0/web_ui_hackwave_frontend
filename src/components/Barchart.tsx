import React from "react";
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
interface chartprop {
  xlabel: string;
  //   ylabel: string;
  title: string;
  data: any[];
}
const Barchart: React.FC<chartprop> = ({ xlabel, title, data }) => {
  return (
    <>
      <h1>{title}</h1>
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
        <XAxis dataKey={xlabel} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="power"
          fill="#8884d8"
          activeBar={<Rectangle fill="pink" stroke="blue" />}
        />
      </BarChart>
    </>
  );
};

export default Barchart;
