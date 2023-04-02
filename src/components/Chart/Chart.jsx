import React, { useEffect, useRef, useState } from "react";
import { Chart as ChartJS } from "chart.js/auto";

import Modal from "../UI/Modal/Modal";

// import ChartConfig from "./ChartConfig";
import useActualTimeLabel from "../../hooks/useActualTimeLabel";
import useDataCity from "../../hooks/useDataCity";

import Card from "../UI/StyledElements/Card";
import classes from "./Chart.module.css";

function Chart({ city, onDataChangeHandler }) {
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);

  const [isOpen, setIsOpen] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  //Configure gloabl chart
  ChartJS.defaults.color = "#9cafbb";
  ChartJS.defaults.borderColor = "#5e6c77";

  const updateChart = (chart, label, firstData, secondData) => {
    //this function will add data to the chart
    chart.data.labels.push(label);
    if (firstData) {
      chart.data.datasets[0].data.push(firstData);
    }
    if (secondData) {
      chart.data.datasets[1].data.push(secondData);
    }
    chart.update();
  };

  const dataFromContext = (chart, dataFromContext) => {
    //this function will add data to the chart
    console.log(dataFromContext);
    chart.data.labels = dataFromContext.data.map((data) => data.time);
    console.log(chart.data.labels);
    chart.data.datasets[0].data = dataFromContext.data.map(
      (data) => data.data.temp
    );
    chart.data.datasets[1].data = dataFromContext.data.map(
      (data) => data.data.humidity
    );
    chart.update();
  };

  async function renderChart(city, dataReverted) {
    try {
      const data = await useDataCity(city);
      if (data.status === "error") throw new Error(data.message);

      let timeArr = [];
      let tempArr = [];
      let humidityArr = [];

      if (dataReverted) {
        timeArr = dataReverted.map((data) => data.time);
        tempArr = dataReverted.map((data) => data.data.temp);
        humidityArr = dataReverted.map((data) => data.data.humidity);
      }

      timeArr.push(useActualTimeLabel());
      tempArr.push(data.temp);
      humidityArr.push(data.humidity);

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

      setIsLoaded(true);

      return () => {
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }
      };
    } catch (error) {
      console.error(error);
      setIsLoaded(true);
      setIsError(true);
    }
  }

  useEffect(() => {
    // if are stored data render the chart with the stored data
    if (city.data) {
      renderChart(city.name, city.data);
    } else if (!city.data) renderChart(city.name);

    setInterval(async function () {
      //monitor the city data, download the new data and update the chart
      const data = await useDataCity(city.name);
      const time = useActualTimeLabel();
      updateChart(chartInstance.current, time, data.temp, data.humidity);
      // dataFromContext(chartInstance.current, city);
      onDataChangeHandler({ time, data }, city.id);
    }, 60 * 1000);
  }, []);

  return (
    <>
      <Card className={classes.chart}>
        <p className={classes.title}>{city.name}</p>
        {/* {isError && (
          <Modal>
            <h3>Wrong City name</h3>
            <button onClick={onCloseHandler}>No</button>
          </Modal>
        )} */}
        {!isLoaded && <div>Loading data...</div>}
        <canvas ref={chartContainer}></canvas>
      </Card>
    </>
  );
}

export default Chart;
