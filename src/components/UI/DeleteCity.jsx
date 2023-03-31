import React from "react";

import Modal from './Modal/Modal'

const deleteCity = ({ cityName, onCloseHandler, onDeleteHandler }) => {
  return(
    <Modal onClose={onCloseHandler}>
          <h2>Do you want to remove the city of {cityName} from the list?</h2>
          <button onClick={onDeleteHandler}>Yes</button>
          <button onClick={onCloseHandler}>No</button>
      </Modal>)
}

export default deleteCity;
