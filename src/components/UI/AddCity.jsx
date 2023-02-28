import React from "react";

function AddCity({ onCancel, onAddCity }) {
  const sumbitHandler = (event) => {
    event.preventDefault();
    const cityData = {
      name: event.target.city.value,
      id: Math.floor(Math.random() * 1000),
    };
    onAddCity(cityData);
    onCancel();
  };

  return (
    <form onSubmit={sumbitHandler}>
      <p>
        <label htmlFor="city">City</label>
        <input
          type="text"
          name="city"
          id="city"
        />
      </p>
      <p>
        <button
          type="cancel"
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
