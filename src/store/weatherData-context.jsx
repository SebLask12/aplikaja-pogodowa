import React, { useState, useEffect, createContext } from "react";

export const WeatherDataContext = createContext({
  weatherData: [],
  isLoadedData: false,
  addCity: () => {},
  removeCity: (id) => {},
  newMeasure: (id, data) => {},
  loadWeatherData: () => {},
  clearDataCity: () => {},
});

const WeatherDataContextProvider = (props) => {
  const [weatherData, setWeatherData] = useState([]);
  const [isLoadedData, setIsLoadedData] = useState(false);

  useEffect(() => {
    if (isLoadedData) {
      saveWeahtherDataToLocalHandler(weatherData);
    }
  }, [weatherData]);

  const loadWeatherDataHandler = async () => {
    const res = await JSON.parse(localStorage.getItem("weatherData"));
    setIsLoadedData(true);
    if (!res) return;
    setWeatherData(res);
  };

  const addCityHandler = (data) => {
    setWeatherData((prevState) => {
      if (prevState === null) {
        return [data];
      } else {
        return prevState.concat(data);
      }
    });
  };
  const removeCityHandler = (id) => {
    setWeatherData((prevState) => prevState.filter((city) => city.id !== id));
  };

  const newMeasureHandler = (data, cityId) => {
    setWeatherData((prevState) => {
      return prevState.map((city) => {
        if (cityId === city.id && !city.data) {
          return {
            name: city.name,
            id: city.id,
            data: [data],
          };
        } else if (cityId === city.id) {
          return {
            name: city.name,
            id: city.id,
            data: city.data.concat(data),
          };
        } else {
          return city;
        }
      });
    });
  };

  const saveWeahtherDataToLocalHandler = (data) => {
    localStorage.setItem("weatherData", JSON.stringify(data));
  };

  const clearDataCityHandler = (id) => {
    setWeatherData((prevState) =>
      prevState.map((city) => {
        if (city.id === id) {
          return {
            name: city.name,
            id: city.id,
            data: [],
          };
        } else return city;
      })
    );
  };

  const contextValue = {
    weatherData,
    isLoadedData,
    addCity: addCityHandler,
    removeCity: removeCityHandler,
    newMeasure: newMeasureHandler,
    loadWeatherData: loadWeatherDataHandler,
    clearDataCity: clearDataCityHandler,
  };

  return (
    <WeatherDataContext.Provider value={contextValue}>
      {props.children}
    </WeatherDataContext.Provider>
  );
};

export default WeatherDataContextProvider;
