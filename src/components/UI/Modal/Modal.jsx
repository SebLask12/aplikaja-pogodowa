import React, { Fragment } from "react";
import ReactDOM from "react-dom";

import Card from "../Card";
import classes from "./Modal.module.css";

const Modal = ({children, onClose}) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <div className={classes.backdrop} onClick={onClose}></div>,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <Card className={classes.modal}>{children}</Card>,
        document.getElementById("modal-root")
      )}
    </Fragment>
  );
};

export default Modal;
