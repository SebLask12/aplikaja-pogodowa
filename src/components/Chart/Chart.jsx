import React, { useEffect, useState } from "react";

// import ChartConfig from "./ChartConfig";
import useActualTimeLabel from "../../hooks/useActualTimeLabel";
import useDataCity from "../../hooks/useDataCity";

import ChartRender from "./ChartRender";

import Card from "../UI/StyledElements/Card";
import classes from "./Chart.module.css";

const Chart = ({ city, onDataChangeHandler }) => {
  const [newData, setNewData] = useState(null);
  const [initialData, setInitialData] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const getData = async () => {
    try {
      const data = await useDataCity(city.name);
      const time = useActualTimeLabel();
      return {
        time: time,
        data: data,
      };
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    (async () => {
      if (city.data) {
        setInitialData(city.data);
        setIsLoaded(true);
      } else if (!city.data) {
        setInitialData([await getData()]);
        setIsLoaded(true);
      }

      setInterval(async () => {
        //monitor the city data, download the new data and update the chart
        const data = await getData();
        setNewData(data);
        onDataChangeHandler(data, city.id);
      }, 60 * 1000);
    })();
  }, []);

  return (
    <Card className={classes.chart}>
      <p className={classes.title}>{city.name}</p>
      {!isLoaded && (<p>Loading chart data...</p>)}
      {isLoaded && (
        <ChartRender
          initialData={initialData}
          newData={newData}
        />
      )}
    </Card>
  );
};

export default Chart;
