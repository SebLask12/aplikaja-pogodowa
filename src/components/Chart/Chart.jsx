import React, { useEffect, useContext } from "react";

import useActualTimeLabel from "../../hooks/useActualTimeLabel";
import useDataCity from "../../hooks/useDataCity";

import { WeatherDataContext } from "../../store/weatherData-context";

import ChartRender from "./ChartRender";

import Card from "../UI/StyledElements/Card";
import classes from "./Chart.module.css";

const Chart = ({ city }) => {
  const weatherCtx = useContext(WeatherDataContext);

  const intervalDelay = 60 * 1000; // milliseconds

  const getData = async () => {
    try {
      const data = await useDataCity(city.name);
      const time = useActualTimeLabel();

      weatherCtx.newMeasure({data,time}, city.id);
      
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (!city.data) {
      getData();
    }

    const interval = setInterval(async () => {
      //monitor the city data, download the new data and update the chart
      getData();
    }, intervalDelay);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Card className={classes.chart}>
      <p className={classes.title}>{city.name}</p>
      <ChartRender data={city.data} />
    </Card>
  );
};

export default Chart;
