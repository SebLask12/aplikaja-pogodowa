import React, { useEffect, useState } from "react";

import clasess from "./App.module.css";
import Cities from "./components/UI/Cities";
import Chart from "./components/Weather/Chart";
import Card from "./components/UI/Card";

function App() {
  const [chartData, setChartData] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    //this function will run when the component mounts
    setCityList(loadCityList());
    loadCityList().forEach((city) => {
      setChartData((prevState) => [
        ...prevState,
        { id: city.id, data: loadChartData(city.id) },
      ]);
    });
    setIsLoaded(true);
  }, []);

  const loadCityList = () => {
    //this is a function that returns a list of cities
    const cityList = JSON.parse(localStorage.getItem("cityList"));
    return cityList ? cityList : [];
  };

  const loadChartData = (cityId) => {
    //this is a function that returns the weather data for a city
    return JSON.parse(localStorage.getItem(`${cityId}`));
  };

  const newCity = (data) => {
    //this is a function that adds a new city to the list, saves it to local storage
    setCityList((prevState) => [...prevState, data]);
    saveCityList([...cityList, data]);
    if (!isLoaded) {
      setIsLoaded(true);
    }
  };

  const saveCityList = (cityList) => {
    //this is a function that saves a list of cities to local storage
    localStorage.setItem("cityList", JSON.stringify(cityList));
  };

  const deleteCity = (id) => {
    //this is a function that deletes a city from the list, saves it to local storage
    setCityList((prevState) => prevState.filter((city) => city.id !== id));
    saveCityList(cityList.filter((city) => city.id !== id));
  };

  const onDataChange = (data, cityId) => {
    //this is a function that updates the weather data for a city, saves it to local storage
    localStorage.setItem(`${cityId}`, JSON.stringify(data));
  };

  return (
    <div className={clasess.App}>
      <Cities
        onAddCity={newCity}
        cityList={cityList}
        className={clasess.cities}
        onDeleteCityHandler={deleteCity}
      />
      {cityList.length === 0 && (
        <Card>
          <div style={{ color: "white" }}>No Cities Added</div>
        </Card>
      )}
      {!isLoaded && <div style={{ color: "black" }}>Loading cities</div>}
      {isLoaded &&
        cityList.map((city) => (
          <Chart
            key={city.id}
            city={city}
            onDataChangeHandler={onDataChange}
            chartData={chartData.find((data) => data.id === city.id)}
          />
        ))}
    </div>
  );
}

export default App;
