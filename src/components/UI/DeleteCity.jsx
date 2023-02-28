import React from "react";

import Card from "./Card";
import classes from "./DeleteCity.module.css";

function deleteCity({ cityName, onCloseHandler, onDeleteHandler }) {
  return (
    <div className={classes.backdrop}>
      <Card className={classes.modal}>
        <h2>Do you want to remove the city of {cityName} from the list?</h2>
        <button onClick={onDeleteHandler}>Yes</button>
        <button onClick={onCloseHandler}>No</button>
      </Card>
    </div>
  );
}

export default deleteCity;
