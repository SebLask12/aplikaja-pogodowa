import React, { useEffect, useRef, useState } from "react";
import { Chart as ChartJS } from "chart.js/auto";

import Card from "../UI/Card";
import classes from "./Chart.module.css";

function Chart({ city, onDataChangeHandler, chartData }) {
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);

  const [isLoaded, setIsLoaded] = useState(false);
  const [dataChart, setDataChart] = useState([]);
  const [isError, setIsError] = useState(false);

  //Configure gloabl chart
  ChartJS.defaults.color = "#9cafbb";
  ChartJS.defaults.borderColor = "#5e6c77";

  useEffect(() => {
    //this function will run when array is updated and lift up the dataChart to app.jsx
    onDataChangeHandler(dataChart, city.id);
  }, [dataChart]);

  const storeData = (time, data) => {
    //this function will store the data in the array
    setDataChart((prevData) => [...prevData, { time, data }]);
  }

  const addData = (chart, label, data) => {
    //this function will add data to the chart
    const tempIndex = 0;
    const humidityIndex = 1;

    chart.data.labels.push(label);
    chart.data.datasets[tempIndex].data.push(data.temp);
    chart.data.datasets[humidityIndex].data.push(data.humidity);
    chart.update();
  }

  const getTimeLabel = () => {
    //this function will return the time label
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes < 10 ? `0${minutes}` : minutes}`;
  }

  async function getChartData(city) {
    //this function will get the data from the API
    try {
      if (!city) throw new Error("City is required");

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9fda02f1840193b81e28ff9fa5b755c2`
      );

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      return { temp: data.main.temp - 273.15, humidity: data.main.humidity };
    } catch (error) {
      console.error(error);
      setIsError(true);
      setIsLoaded(true);
    }
  }

  async function renderChart(city, dataReverted) {
    try {
      const data = await getChartData(city);

      if (!data) throw new Error("Failed to download data");

      let timeArr = [];
      let tempArr = [];
      let humidityArr = [];

      if (dataReverted) {
        timeArr = dataReverted.data.map((data) => data.time);
        tempArr = dataReverted.data.map((data) => data.data.temp);
        humidityArr = dataReverted.data.map((data) => data.data.humidity);
      }

      timeArr.push(getTimeLabel());
      tempArr.push(data.temp);
      humidityArr.push(data.humidity);

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

      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
      const context = chartContainer.current.getContext("2d");
      chartInstance.current = new ChartJS(context, chartConfig);

      setIsLoaded(true);

      return () => {
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }
      };
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {

    // if are stored data render the chart with the stored data
    if (chartData) {
      renderChart(city.name, chartData);
      setDataChart(chartData.data);
    } else if (!chartData) renderChart(city.name);

    setInterval(async function () {
      //monitor the city data, download the new data and update the chart
      const data = await getChartData(city.name);
      const time = getTimeLabel();
      addData(chartInstance.current, time, data);
      storeData(time, data);
    }, 60 * 1000);
  }, []);

  return (
    <>
      <Card className={classes.chart}>
        <p className={classes.title}>{city.name}</p>
        {isError && <h3>Failed to download data</h3>}
        {!isLoaded && <div>Loading data...</div>}
        <canvas ref={chartContainer}></canvas>
      </Card>
    </>
  );
}

export default Chart;
