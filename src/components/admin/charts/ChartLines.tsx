import React from 'react';
import FormChartLines from './FormChartLines';


const ChartLines: React.FC = () => {
  const data = {
    labels: Array.from({ length: 10 }, (_, i) => i.toString()),
    datasets: [
      {
        label: 'Line 1',
        data: Array.from({ length: 10 }, () => Math.random() * 10),
        borderColor: '#4FBD55',
        borderWidth: 3,
        borderRadius: 50,
        fill: false,
      },
      {
        label: 'Line 2',
        data: Array.from({ length: 10 }, () => Math.random() * 10),
        borderColor: '#E83D21',
        borderWidth: 3,
        fill: false,
      },
    ],
  };

  return <FormChartLines data={data} />;
};

export default ChartLines;