import React, { useEffect, useRef } from "react";
import { Chart as ChartJS } from "chart.js/auto";

const ChartRender = ({ data }) => {
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);

  ChartJS.defaults.color = "#9cafbb";
  ChartJS.defaults.borderColor = "#5e6c77";

  const updateChart = () => {
    if (data) {
      chartInstance.current.data.labels = data.map((label) => label.time);
      chartInstance.current.data.datasets[0].data = data.map(
        (data) => data.data.temp
      );
      chartInstance.current.data.datasets[1].data = data.map(
        (data) => data.data.humidity
      );
      chartInstance.current.update();
    }
  };

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const chartConfig = {
      type: "line",
      data: {
        labels: [],
        datasets: [
          {
            label: "Temperature [℃]",
            data: [],
            pointRadius: 5,
            pointHoverRadius: 6,
          },
          {
            label: "Humidity [%]",
            data: [],
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

  useEffect(() => {
    updateChart();
  }, [data]);

  return <canvas ref={chartContainer}></canvas>;
};

export default ChartRender;
