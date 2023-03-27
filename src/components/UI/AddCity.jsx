import React, {useState} from "react";

function AddCity({ onCancel, onAddCity }) {

  
  const sumbitHandler = (event) => {
    event.preventDefault();
    const cityName = event.target.city.value;
    if (!validationCheck(cityName)) {
      alert(`City name is required`);
      return onCancel();
    }
    const cityData = {
      name: cityName,
      id: Math.floor(Math.random() * 1000),
      data: [],
    };
    onAddCity(cityData);
    onCancel();
  };

  const validationCheck = (input) => {
    return input.trim().length === 0 ? false : true;
  }

  return (
    <form onSubmit={sumbitHandler}>
      <p>
        <label htmlFor="city">City</label>
        <input
          type="text"
          name="city"
          id="city"
          autoFocus={true}
        />
      </p>
      <p>
        <button
          type="reset"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button type="submit">Submit</button>
      </p>
    </form>
  );
}

export default AddCity;
