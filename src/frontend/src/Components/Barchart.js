// App.js or your component file

import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the necessary components with Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const chartData1 = {
  labels: ["User based on comparison of month"],
  datasets: [
    {
      label: "Dataset 1",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      borderColor: "rgba(255, 99, 132, 1)",
      borderWidth: 1,
    },
  ],
};

const chartData2 = {
  labels: ["Revenue based on comparison of month"],
  datasets: [
    {
      label: "Dataset 2",
      data: [10, 15, 30, 40, 25],
      backgroundColor: "rgba(54, 162, 235, 0.2)",
      borderColor: "rgba(54, 162, 235, 1)",
      borderWidth: 1,
    },
  ],
};

const App = () => {
  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      <div style={{ width: "50%", height: "200px" }}>
        <Bar data={chartData1} />
      </div>
      <div style={{ width: "50%", height: "200px" }}>
        <Bar data={chartData2} />
      </div>
    </div>
  );
};

export default App;
