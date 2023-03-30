import React, { useRef, useEffect, useState } from "react";

function AddCity({ onCancel, onAddCity }) {
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState(null);

  useEffect(() => {
    const delayInput = setTimeout(() => {
      console.log('check vaild')
    },1000)

    return() => {
      clearTimeout(delayInput);
      console.log('clearInterval')
    }
  }, [inputValue]);

  const handleChange =(e) => {
    setInputValue(e.target.value)
  }

  const sumbitHandler = (event) => {
    event.preventDefault();
    if (!validationCheck(inputRef.current.value)) {
      alert(`City name is required`);
      return onCancel();
    }
    const cityData = {
      name: inputRef.current.value,
      id: Math.floor(Math.random() * 1000),
    };
    onAddCity(cityData);
    onCancel();
  };

  const validationCheck = (input) => {
    return input.trim().length === 0 ? false : true;
  };

  return (
    <form onSubmit={sumbitHandler}>
      <p>
        <label htmlFor="city">City</label>
        <input
          type="text"
          name="city"
          id="city"
          autoFocus={true}
          onChange={handleChange}
          ref={inputRef}
        />
      </p>
      <p>
        <button type="reset" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit">Submit</button>
      </p>
    </form>
  );
}

export default AddCity;
