import React, { useState } from "react";

export const WeatherDataContext = React.createContext({
  weatherData: [],
  isLoadedData: false,
  addCity: () => {},
  removeCity: (id) => {},
  newMeasure: (id, data) => {},
  loadWeatherData: () => {},
});

const WeatherDataContextProvider = (props) => {
  const [weatherData, setWeatherData] = useState([]);
  const [isLoadedData, setIsLoadedData] = useState(false);

  const loadWeatherDataHandler = () => {
    //this is a function that returns a list of cities
    const weatherDataS = JSON.parse(localStorage.getItem("weatherData"));
    console.log(weatherDataS);
    setWeatherData(weatherDataS);
    setIsLoadedData(true);
    console.log(weatherData);
  };

  const addCityHandler = (data) => {
    //this is a function that adds a new city to the list, saves it to local storage
    setWeatherData((prevState) => {
      if (prevState === null) {
        return [data];
      } else {
        return prevState.concat(data);
      }
    });
    saveWehatherDataToLocalHandler();
  };
  const remvoeCityHandler = (id) => {
    //this is a function that deletes a city from the list, saves it to local storage
    setWeatherData((prevState) => prevState.filter((city) => city.id !== id));
    saveWehatherDataToLocalHandler();
  };

  const newMeasureHandler = (data, cityId) => {
    //this is a function that updates the weather data for a city, saves it to local storage
    setWeatherData((prevState) =>
      prevState.filter((city) => {
        if (cityId === city.id) {
          return {
            name: city.name,
            id: city.id,
            data: [...city.data, data],
          };
        } else {
          return city;
        }
      })
    );

    saveWehatherDataToLocalHandler();
  };

  const saveWehatherDataToLocalHandler = () => {
    //this is a function that saves a list of cities to local storage
    localStorage.setItem("weatherData", JSON.stringify(weatherData));
    console.log(weatherData);
  };

  const contextValue = {
    weatherData: weatherData,
    isLoadedData: isLoadedData,
    addCity: addCityHandler,
    removeCity: remvoeCityHandler,
    newMeasure: newMeasureHandler,
    loadWeatherData: loadWeatherDataHandler,
  };

  return (
    <WeatherDataContext.Provider value={contextValue}>
      {props.children}
    </WeatherDataContext.Provider>
  );
};

export default WeatherDataContextProvider;
