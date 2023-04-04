import React, { useEffect, useContext } from "react";

import clasess from "./App.module.css";
import Cities from "./components/UI/Weather/Cities";
import Chart from "./components/Chart/Chart";

import { WeatherDataContext } from "./store/weatherData-context";

function App() {
  const weatherCtx = useContext(WeatherDataContext);

  useEffect(() => {
    weatherCtx.loadWeatherData();
  }, []);


  return (
    <div className={clasess.App}>
        <Cities
          cityList={weatherCtx.weatherData}
          className={clasess.cities}
        />
        {!weatherCtx.isLoadedData && (
          <div style={{ color: "black" }}>Loading cities</div>
        )}
        {weatherCtx.isLoadedData &&
          weatherCtx.weatherData.map((city) => (
            <Chart
              key={city.id}
              city={city}
            />
          ))}
    </div>
  );
}

export default App;
