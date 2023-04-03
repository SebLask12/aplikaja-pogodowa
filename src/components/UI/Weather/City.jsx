import React, { useState, useContext } from "react";

import DeleteCity from "./DeleteCity";

import { WeatherDataContext } from "../../../store/weatherData-context";

import Card from "./../StyledElements/Card";
import classes from "./City.module.css";

const City = ({ city }) => {
  const [isClicked, setIsClicked] = useState(false);

  const weatherCtx = useContext(WeatherDataContext);

  const onClickHnadler = (e) => {
    e.preventDefault();
    setIsClicked(true);
  };

  const onDeleteHandler = (e) => {
    e.preventDefault();
    weatherCtx.removeCity(city.id);
    onClose();
  };

  const onClose = () => {
    setIsClicked(false);
  };

  return (
    <React.Fragment>
      <li className={classes.item}>
        <Card className={classes.city}>
          <h3>{city.name}</h3>
          <button
            onClick={onClickHnadler}
            className={classes.delete}
          >
            🗑
          </button>
        </Card>
      </li>
      {isClicked && (
        <DeleteCity
          cityName={city.name}
          onCloseHandler={onClose}
          onDeleteHandler={onDeleteHandler}
        />
      )}
    </React.Fragment>
  );
};
export default City;
