import React, { useEffect, useContext } from "react";

import clasess from "./App.module.css";
import Cities from "./components/UI/Cities";
import Chart from "./components/Weather/Chart";
import Card from "./components/UI/Card";

import { WeatherDataContext } from "./store/weatherData-context";

function App() {
  const weatherCtx = useContext(WeatherDataContext);

  console.log("renderApp", weatherCtx.weatherData);

  useEffect(() => {
    //this function will run when the component mounts
    weatherCtx.loadWeatherData();
  }, []);

  const whenLoaded = () => {
    if (weatherCtx.weatherData.length >= 1) {
      return weatherCtx.weatherData.map((city) => (
        <Chart
          key={city.id}
          city={city}
          onDataChangeHandler={weatherCtx.newMeasure}
          chartData={city.data && city.data}
        />
      ));
    } else {
      return (
        <Card>
          <div style={{ color: "white" }}>No Cities Added</div>
        </Card>
      );
    }
  };

  return (
    <div className={clasess.App}>
        <Cities
          onAddCity={weatherCtx.addCity}
          cityList={weatherCtx.weatherData}
          className={clasess.cities}
          onDeleteCityHandler={weatherCtx.removeCity}
        />
        {!weatherCtx.isLoadedData && (
          <div style={{ color: "black" }}>Loading cities</div>
        )}
        {/* {dataList} */}
        {weatherCtx.isLoadedData &&
          weatherCtx.weatherData.map((city) => (
            <Chart
              key={city.id}
              city={city}
              onDataChangeHandler={weatherCtx.newMeasure}
              chartData={city.data && city.data}
            />
          ))}
    </div>
  );
}

export default App;
