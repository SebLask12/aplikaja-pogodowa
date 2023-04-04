import React, { useRef, useContext, useEffect, useReducer } from "react";

import Modal from "../Modal/Modal";
import Button from "../StyledElements/Button";
import useDataCity from "../../../hooks/useDataCity";

import { WeatherDataContext } from "./../../../store/weatherData-context";

import classes from "./AddCity.module.css";

const initialState = {
  isError: false,
  message: null,
  inputValue: null,
  loading: false,
  valid: null,
};

const AddCityReducer = (state, action) => {
  switch (action.type) {
    case "EMPTY_INPUT":
      return {
        ...state,
        isError: true,
        message: "Empty city name",
      };

    case "INVALID_NAME":
      return {
        ...state,
        isError: true,
        message: "Invalid city name",
      };

    case "CITY_NOT_FOUND":
      return {
        ...state,
        isError: true,
        message: "City not found",
      };
    case "UPDATE_INPUT":
      return {
        ...state,
        inputValue: action.payload,
      };
    case "LOADING_CITY":
      return {
        ...state,
        loading: true,
      };

    case "LOADING_COMPLETE":
      return {
        ...state,
        loading: false,
      };
    case "VALIDATED":
      return {
        ...state,
        valid: classes.vailidityOk,
      };
    case "NOT_VALIDATED":
      return {
        ...state,
        valid: classes.validityNotOk,
      };
    case "ALREADY_EXIST":
      return {
        ...state,
        isError: true,
        message: "City was already added",
      };
    default:
      return { ...state };
  }
};

const AddCity = ({ onCancel }) => {
  const [state, dispatch] = useReducer(AddCityReducer, initialState);

  const inputRef = useRef(null);

  const weatherCtx = useContext(WeatherDataContext);

  useEffect(() => {
    const delayInput = setTimeout(() => {
      if (state.inputValue !== null) {
        if (validationCheck(state.inputValue)) {
          dispatch({ type: "VALIDATED" });
        } else {
          dispatch({ type: "NOT_VALIDATED" });
        }
      }
    }, 500);

    return () => {
      clearTimeout(delayInput);
    };
  }, [state.inputValue]);

  const handleChange = (e) => {
    dispatch({ type: "UPDATE_INPUT", payload: e.target.value });
  };  

  const sumbitHandler = async (event) => {
    event.preventDefault();

    if (state.inputValue === null) {
      return dispatch({ type: "EMPTY_INPUT" });
    }

    if (!validationCheck(state.inputValue)) {
      return dispatch({ type: "INVALID_NAME" });
    }

    dispatch({ type: "LOADING_CITY" });
    const res = await useDataCity(state.inputValue);

    if (res.status === "error") {
      return dispatch({ type: "CITY_NOT_FOUND" });
    }
    if (weatherCtx.weatherData.some(city => city.id === res.id)) {
      return dispatch({ type: "ALREADY_EXIST" });
    }

    dispatch({ type: "LOADING_COMPLETE" });

    const cityData = {
      name: res.name,
      id: res.id,
    };

    weatherCtx.addCity(cityData);
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
      {state.isError && (
        <Modal onClose={onCancel}>
          <h3>{state.message}</h3>
          <Button onClick={onCancel}>Close</Button>
        </Modal>
      )}
      {state.loading && <p> Checking city in database... </p>}
      <form onSubmit={sumbitHandler}>
        <p>
          <label className={classes.label} htmlFor="city">
            City
          </label>
          <input
            className={`${classes.input} ${state.valid}`}
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
          <Button type="submit" disabled={state.loading}>
            Submit
          </Button>
        </p>
      </form>
    </React.Fragment>
  );
};

export default AddCity;
