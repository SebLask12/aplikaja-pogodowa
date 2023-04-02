import React, {useState} from "react";

import DeleteCity from "./DeleteCity";

import Card from "./../StyledElements/Card";
import classes from "./City.module.css";

function city({ city, onDelete }) {
  const [isClicked, setIsClicked] = useState(false);

  const onClickHnadler = (e) => {
    e.preventDefault();
    setIsClicked(true);
  };

  const onDeleteHandler = (e) => {
    e.preventDefault();
    onDelete(city.id);
    onClose();
  };

  const onClose = () => {
    setIsClicked(false);
  };

  return (
    <Card className={classes.city}>
      <li className={classes.button}>
        <div>{city.name}</div>
        <button
          onClick={onClickHnadler}
          className={classes.delete}
        >
          🗑
        </button>
      </li>
      {isClicked && (
        <DeleteCity
          cityName={city.name}
          onCloseHandler={onClose}
          onDeleteHandler={onDeleteHandler}
        />
      )}
    </Card>
  );
}
export default city;
