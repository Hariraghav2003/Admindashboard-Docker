/* eslint-disable no-unused-vars */
import React from "react";
import { Card } from "antd";
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
import Barchart from "./Barchart.js";

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

function Chart() {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <Card
          title="Total Users"
          bordered={false}
          style={{
            textAlign: "center",
            width: 250,
            height: 200,
            background:
              "linear-gradient(to right,rgb(105, 233, 255),rgb(255, 153, 230))",
            borderRadius: 10,
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          }}
        ></Card>

        <Card
          title="Total Revenue"
          bordered={false}
          style={{
            textAlign: "center",
            width: 250,
            height: 200,
            background:
              "linear-gradient(to right,rgb(105, 255, 205),rgb(235, 255, 153))",
            borderRadius: 10,
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          }}
        ></Card>

        <Card
          title="Total Trainee"
          bordered={false}
          style={{
            textAlign: "center",
            width: 250,
            height: 200,
            background:
              "linear-gradient(to right,rgb(115, 105, 255),rgb(153, 255, 252))",
            borderRadius: 10,
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          }}
        ></Card>

        <Card
          title="Total Course Count"
          bordered={false}
          style={{
            textAlign: "center",
            width: 250,
            height: 200,
            background:
              "linear-gradient(to right,rgb(255, 105, 105),rgb(255, 153, 153))",
            borderRadius: 10,
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          }}
        ></Card>
      </div>
      <br></br> <br></br> <br></br> <br></br>
      <div style={{ marginLeft: "100px" }}>
        <Barchart></Barchart>
      </div>
    </div>
  );
}

export default Chart;
