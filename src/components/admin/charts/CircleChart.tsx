"use client";

import { useTheme } from "@mui/material";
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface Props {
  percentage: number;
}

const CircleEfectivityChart: React.FC<Props> = ({ percentage }) => {
  const theme = useTheme();

  const data = [
    { name: "Efectividad", value: percentage },
    { name: "Resto", value: 100 - percentage },
  ];

  const COLORS = [
    "#00A2DC",
    theme.palette.background.paper,
    "#FFBB28",
    "#FF8042",
  ]; // Colores para las secciones de la rueda

  return (
    <ResponsiveContainer width={200} height={200}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
          startAngle={90}
          endAngle={450}
          
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CircleEfectivityChart;
