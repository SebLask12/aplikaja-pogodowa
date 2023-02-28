import React, { useState} from "react";

import classes from "./Cities.module.css";

import Card from "./Card";
import City from "./City";
import AddCity from "./AddCity";

function Cities({
  onAddCity,
  cityList,
  onSelectCityMain,
  onDeleteCityHandler,
}) {
  const [isAddingCity, setIsAddingCity] = useState(false);

  const cancelHandler = () => {
    setIsAddingCity(false);
  };

  const addCityButtonHandler = () => {
    setIsAddingCity(true);
  };

  const addCityHandler = (cityData) => {
    onAddCity(cityData);
    cancelHandler();
  };

  const selectedCityHandler = (city) => {
    onSelectCityMain(city);
  };

  return (
    <>
      <Card className={classes.cities}>
        <h1>Cities</h1>
        <ul className={classes.list}>
          {cityList.map((city) => (
            <City
              key={city.id}
              city={city}
              selectedCity={selectedCityHandler}
              onDelete={onDeleteCityHandler}
            />
          ))}
        </ul>
        {!isAddingCity && (
          <button onClick={addCityButtonHandler}>Add City</button>
        )}
        {isAddingCity && (
          <AddCity
            onAddCity={addCityHandler}
            onCancel={cancelHandler}
          />
        )}
      </Card>
    </>
  );
}

export default Cities;
