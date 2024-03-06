import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'Ene', activos: 10, inactivos: 5 },
  { name: 'Feb', activos: 15, inactivos: 3 },
  { name: 'Mar', activos: 5, inactivos: 8 },
  { name: 'Abr', activos: 8, inactivos: 2 },
  { name: 'May', activos: 18, inactivos: 7 },
  { name: 'Jun', activos: 12, inactivos: 10 },
];

const LineChartComponent: React.FC = () => {
  return (
    <LineChart width={600} height={235} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="activos" stroke="#4FBD55" strokeWidth={2} name="Activos" />
      <Line type="monotone" dataKey="inactivos" stroke="#FF0000" strokeWidth={2} name="Inactivos" />
    </LineChart>
  );
};

export default LineChartComponent;