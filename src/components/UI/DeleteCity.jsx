import React, { Fragment } from "react";
import ReactDOM from "react-dom";

import Card from "./Card";
import classes from "./DeleteCity.module.css";

function deleteCity({ cityName, onCloseHandler, onDeleteHandler }) {
  return (
    <Fragment>
      {ReactDOM.createPortal(<div className={classes.backdrop}></div>,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <Card className={classes.modal}>
          <h2>Do you want to remove the city of {cityName} from the list?</h2>
          <button onClick={onDeleteHandler}>Yes</button>
          <button onClick={onCloseHandler}>No</button>
        </Card>, document.getElementById("modal-root")
        
      )}
    </Fragment>
  );
}

export default deleteCity;
