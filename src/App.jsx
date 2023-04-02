import React, { useEffect, useContext } from "react";

import clasess from "./App.module.css";
import Cities from "./components/UI/Weather/Cities";
import Chart from "./components/Chart/Chart";

import { WeatherDataContext } from "./store/weatherData-context";

function App() {
  const weatherCtx = useContext(WeatherDataContext);

  useEffect(() => {
    //this function will run when the component mounts
    weatherCtx.loadWeatherData();
  }, []);


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
            />
          ))}
    </div>
  );
}

export default App;
