import React, { useState, useEffect } from "react";

export const WeatherDataContext = React.createContext({
  weatherData: [],
  // isLoadedData: false,
  addCity: () => {},
  removeCity: (id) => {},
  newMeasure: (id, data) => {},
  loadWeatherData: () => {},
});

const WeatherDataContextProvider = (props) => {
  const [weatherData, setWeatherData] = useState([]);
  const [isLoadedData, setIsLoadedData] = useState(false);

  useEffect(()=> {
    console.log('mount store')
  },[])

  useEffect(() => {
    if (isLoadedData) {
      saveWehatherDataToLocalHandler(weatherData);
    }
  }, [weatherData]);

  const loadWeatherDataHandler = () => {
    //this is a function that returns a list of cities
    const weatherDataS = JSON.parse(localStorage.getItem("weatherData"));
    setIsLoadedData(true);
    if (!weatherDataS) return;
    setWeatherData(weatherDataS);
  };

  const addCityHandler = (data) => {
    //this is a function that adds a new city to the list, saves it to local storage
    console.log(data);
    setWeatherData((prevState) => {
      if (prevState === null) {
        return [data];
      } else {
        return prevState.concat(data);
      }
    });
  };
  const remvoeCityHandler = (id) => {
    //this is a function that deletes a city from the list, saves it to local storage
    setWeatherData((prevState) => prevState.filter((city) => city.id !== id));
  };

  const newMeasureHandler = (data, cityId) => {
    //this is a function that updates the weather data for a city, saves it to local storage
    setWeatherData((prevState) => {
      console.log(prevState, data, cityId);
      return prevState.map((city) => {
        if (cityId === city.id) {
          return {
            name: city.name,
            id: city.id,
            data: [data],
          };
        } else {
          return city;
        }
      });
    });
  };

  const saveWehatherDataToLocalHandler = (data) => {
    //this is a function that saves a list of cities to local storage
    localStorage.setItem("weatherData", JSON.stringify(data));
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
