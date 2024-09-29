"use client"
import React from "react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface OverviewProps {
  data: any[];
}
const Overview: React.FC<OverviewProps> = ({ data }) => {
  return (
    <ResponsiveContainer width={"100%"} height={350}>
      <BarChart data={data}>
      <CartesianGrid strokeDasharray="1 2" />
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          axisLine={false}
          tickLine={false}
          tickFormatter={(value) => `₹${value}`}
        />
           <Tooltip />
        <Bar dataKey="total" fill="#3498db" radius={[4,4,0,4]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Overview;
