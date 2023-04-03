import React from "react";

import classes from "./Button.module.css";

const Button = ({ children, type, onClick, disabled }) => {
  return (
    <button
      className={classes.button}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
