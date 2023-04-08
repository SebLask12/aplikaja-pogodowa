import React, { useEffect, useContext } from "react";

import classes from "./App.module.css";
import Cities from "./components/UI/Weather/Cities";
import Chart from "./components/Chart/Chart";
import { WeatherDataContext } from "./store/weatherData-context";

function App() {
  const weatherCtx = useContext(WeatherDataContext);

  useEffect(() => {
    weatherCtx.loadWeatherData();
  }, []);

  const renderCharts = () => {
    if (!weatherCtx.isLoadedData) {
      return (
        <div style={{ color: "black" }}>
          Loading cities from local storage..
        </div>
      );
    }
    return weatherCtx.weatherData.map((city) => (
      <Chart
        key={city.id}
        city={city}
      />
    ));
  };

  return (
    <div className={classes.App}>
      <Cities
        cityList={weatherCtx.weatherData}
        className={classes.cities}
      />
      {renderCharts()}
    </div>
  );
}

export default App;
