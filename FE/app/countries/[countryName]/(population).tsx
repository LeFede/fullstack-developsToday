"use client";
import { LineChart, XAxis, YAxis, CartesianGrid, Line } from "recharts";

interface Records {
  year: number;
  value: number;
}
interface PopulationProps {
  population: Records[];
}

export default function Population({ population }: PopulationProps) {
  return (
    <>
      <h2 className="text-lg font-bold mb-2">Population:</h2>
      <div className="overflow-scroll w-full flex">
        <LineChart width={600} height={300} data={population}>
          <XAxis dataKey="year" />
          <YAxis />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
      </div>
    </>
  );
}
