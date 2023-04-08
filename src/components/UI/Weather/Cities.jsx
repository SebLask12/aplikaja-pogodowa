import React, { useState } from "react";

import classes from "./Cities.module.css";

import City from "./City";
import AddCity from "./AddCity";
import Button from "./../StyledElements/Button";
import Card from "./../StyledElements/Card";

const Cities = ({ cityList }) => {
  const [isAddingCity, setIsAddingCity] = useState(false);

  const stopAddingCity = () => setIsAddingCity(false);

  const startAddingCity = () => setIsAddingCity(true);

  return (
    <>
      <Card className={classes.cities}>
        <h1>Cities</h1>
        <ul className={classes.list}>
          {cityList.map((city) => (
            <City
              key={city.id}
              city={city}
            />
          ))}
        </ul>
        {!isAddingCity && <Button onClick={startAddingCity}>Add City</Button>}
        {isAddingCity && <AddCity onCancel={stopAddingCity} />}
      </Card>
    </>
  );
};

export default Cities;
