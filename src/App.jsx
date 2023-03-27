import React, { useEffect, useState, useContext } from "react";

import clasess from "./App.module.css";
import Cities from "./components/UI/Cities";
import Chart from "./components/Weather/Chart";
import Card from "./components/UI/Card";

import WeatherDataContextProvider, {
  WeatherDataContext,
} from "./store/weatherData-context";

function App() {
  const [chartData, setChartData] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const WeatherDataCtx = useContext(WeatherDataContext);

  console.log(WeatherDataContext.weatherData);

  useEffect(() => {
    //this function will run when the component mounts
    WeatherDataCtx.loadWeatherData();
    setChartData(
      WeatherDataCtx.weatherData.map((city) => {
        return {
          id: city.id,
          data: city.data,
        };
      })
    );
    setCityList(
      WeatherDataCtx.weatherData.map((city) => {
        return city.name;
      })
    );
  }, []);

  // const loadCityList = () => {
  //   //this is a function that returns a list of cities
  //   const cityList = JSON.parse(localStorage.getItem("cityList"));
  //   return cityList ? cityList : [];
  // };

  // const loadChartData = (cityId) => {
  //   //this is a function that returns the weather data for a city
  //   return JSON.parse(localStorage.getItem(`${cityId}`));
  // };

  return (
    <div className={clasess.App}>
      <WeatherDataContextProvider>
        <Cities
          onAddCity={WeatherDataCtx.addCity}
          cityList={WeatherDataCtx.weatherData}
          className={clasess.cities}
          onDeleteCityHandler={WeatherDataCtx.removeCity}
        />
        {
            WeatherDataCtx.weatherData.length === 0 && (
          <Card>
            <div style={{ color: "white" }}>No Cities Added</div>
          </Card>
        )}
        {!WeatherDataCtx.isLoadedData && <div style={{ color: "black" }}>Loading cities</div>}
        {WeatherDataCtx.isLoadedData && (
            WeatherDataCtx.weatherData.map((city) => (
              <Chart
                key={city.id}
                city={city}
                onDataChangeHandler={WeatherDataCtx.newMeasure}
                chartData={city}
              />
            )))
          }
      </WeatherDataContextProvider>
    </div>
  );
}

export default App;
