import React, { useEffect, useRef, useState } from "react";
import { Chart as ChartJS } from "chart.js/auto";

const ChartRender = ({ data }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!isLoaded) return;
    updateChart(chartInstance.current, data);
  }, [data]);

  const chartContainer = useRef(null);
  const chartInstance = useRef(null);

  ChartJS.defaults.color = "#9cafbb";
  ChartJS.defaults.borderColor = "#5e6c77";

  const updateChart = (chart, data) => {
    if(data !== undefined) {
      chart.data.labels = data.map((label) => label.time);
      chart.data.datasets[0].data = data.map((data) => data.data.temp);
      chart.data.datasets[1].data = data.map((data) => data.data.humidity);
      chart.update();
    }
  };

  useEffect(() => {
    let timeArr = [];
    let tempArr = [];
    let humidityArr = [];

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

    updateChart(chartInstance.current, data);
    setIsLoaded(true);

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return <canvas ref={chartContainer}></canvas>;
};

export default ChartRender;
