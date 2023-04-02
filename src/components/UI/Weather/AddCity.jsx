import React, { useRef, useEffect, useState, useReducer } from "react";

import Modal from "../Modal/Modal";
import Button from "../StyledElements/Button";
import useDataCity from "../../../hooks/useDataCity";

import classes from "./AddCity.module.css";

function AddCity({ onCancel, onAddCity }) {
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState(null);
  const [isWrongInput, setIsWrongInput] = useState(false);
  const [validClass, setValidClass] = useState(null);
  const [isValid, setIsValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const delayInput = setTimeout(() => {
      if (inputValue !== null) {
        if (validationCheck(inputValue)) {
          setValidClass(classes.vailidityOk);
        } else {
          setValidClass(classes.validityNotOk);
        }
      }
    }, 500);

    return () => {
      clearTimeout(delayInput);
    };
  }, [inputValue]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const sumbitHandler = async (event) => {
    event.preventDefault();
    
    if (inputValue === null) {
      setErrorMessage(`Enter city name!`);
      return setIsWrongInput(true);
    }

    if (!validationCheck(inputValue)) {
      setErrorMessage(`Invalid city name! ${inputValue}`);
      return setIsWrongInput(true);
    }

    const res = await useDataCity(inputValue);
    if (res.status === "error") {
      setErrorMessage(`City "${inputValue}" not found`)
      return setIsWrongInput(true);
    }

    const cityData = {
      name: inputValue,
      id: new Date().toISOString(),
    };

    onAddCity(cityData);
    onCancel();
  };

  const validationCheck = (input) => {
    const regex =
      /^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/;
    if (input.trim().length === 0 || !regex.test(input)) return false;
    else return true;
  };

  return (
    <React.Fragment>
      {isWrongInput && (
        <Modal onClose={onCancel}>
          <h3>{errorMessage}</h3>
          <Button onClick={onCancel}>Close</Button>
        </Modal>
      )}
      <form onSubmit={sumbitHandler}>
        <p>
          <label className={classes.label} htmlFor="city">
            City
          </label>
          <input
            className={`${classes.input} ${validClass}`}
            type="text"
            name="city"
            id="city"
            autoFocus={true}
            onChange={handleChange}
            ref={inputRef}
          />
        </p>
        <p>
          <Button type="reset" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Submit</Button>
        </p>
      </form>
    </React.Fragment>
  );
}

export default AddCity;
