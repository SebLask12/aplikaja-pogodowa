import React, { useState } from "react";

import classes from "./Cities.module.css";

import Card from "./Card";
import City from "./City";
import AddCity from "./AddCity";

function Cities({ onAddCity, cityList, onDeleteCityHandler }) {
  const [isAddingCity, setIsAddingCity] = useState(false);

  const stopAddingCity = () => {
    setIsAddingCity(false);
  };

  const startAddingCity = () => {
    setIsAddingCity(true);
  };

  const addCity = (cityData) => {
    onAddCity(cityData);
    stopAddingCity();
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
              onDelete={onDeleteCityHandler}
            />
          ))}
        </ul>
        {!isAddingCity && <button onClick={startAddingCity}>Add City</button>}
        {isAddingCity && (
          <AddCity
            onAddCity={addCity}
            onCancel={stopAddingCity}
          />
        )}
      </Card>
    </>
  );
}

export default Cities;
