import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { fetchDailyData } from "../api";

const AreaChart = ({ country }) => {
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    const fetchCountryDailyData = async () => {
      const data = await fetchDailyData(country);
      setDailyData(data);
    };
    fetchCountryDailyData();
  }, [country]);

  return (
    <div id="chart">
      <Chart
        options={{
          chart: {
            type: "area",
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: "smooth",
          },
          xaxis: {
            type: "datetime",
            categories: dailyData.map((item) => item.Date),
          },
          colors: ["#3366ff", "#40ff00", "#ff0000"],
          tooltip: {
            x: {
              format: "dd/MM/yy",
            },
          },
        }}
        series={[
          {
            name: "Cases",
            data: dailyData.map((item) => item.Confirmed),
          },
          {
            name: "Recovered",
            data: dailyData.map((item) => item.Recovered),
          },
          {
            name: "Deaths",
            data: dailyData.map((item) => item.Deaths),
          },
        ]}
        style={{ marginTop: "40px" }}
        height={350}
      ></Chart>
    </div>
  );
};

export default AreaChart;
