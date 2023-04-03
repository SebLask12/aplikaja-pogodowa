import React, { useEffect, useRef, useState } from "react";
import { Chart as ChartJS } from "chart.js/auto";

const ChartRender = ({ initialData, newData }) => {
  const [prevData, setPrevData] = useState(null);

  const chartContainer = useRef(null);
  const chartInstance = useRef(null);

  ChartJS.defaults.color = "#9cafbb";
  ChartJS.defaults.borderColor = "#5e6c77";

  const updateChart = (chart, newData) => {
    //this function will add data to the chart
    chart.data.labels.push(newData.time);
    if (newData.data.temp) {
      chart.data.datasets[0].data.push(newData.data.temp);
    }
    if (newData.data.humidity) {
      chart.data.datasets[1].data.push(newData.data.humidity);
    }
    chart.update();
  };

  if (prevData !== newData) {
    updateChart(chartInstance.current, newData);
    setPrevData(newData);
  }

  useEffect(() => {
    let timeArr = [];
    let tempArr = [];
    let humidityArr = [];

    if (initialData) {
      timeArr = initialData.map((data) => data.time);
      tempArr = initialData.map((data) => data.data.temp);
      humidityArr = initialData.map((data) => data.data.humidity);
    }

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const chartConfig = {
      type: "line",
      data: {
        labels: timeArr,
        datasets: [
          {
            label: "Temperature [℃]",
            data: tempArr,
            pointRadius: 5,
            pointHoverRadius: 6,
          },
          {
            label: "Humidity [%]",
            data: humidityArr,
            pointRadius: 5,
            pointHoverRadius: 6,
          },
        ],
      },
    };
    const context = chartContainer.current.getContext("2d");
    chartInstance.current = new ChartJS(context, chartConfig);

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return <canvas ref={chartContainer}></canvas>;
};

export default ChartRender;
