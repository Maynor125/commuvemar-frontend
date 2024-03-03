import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

interface WaveformChartProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor: string;
      fill: boolean;
    }[];
  };
}

const FormChartLines: React.FC<WaveformChartProps> = ({ data }) => {
  return <Line data={data} />;
};

export default FormChartLines;