import React from "react";

import Modal from './../Modal/Modal'

import Button from "./../StyledElements/Button";

const deleteCity = ({ cityName, onCloseHandler, onDeleteHandler }) => {
  return(
    <Modal onClose={onCloseHandler}>
          <h2>Do you want to remove the city of {cityName} from the list?</h2>
          <Button onClick={onDeleteHandler}>Yes</Button>
          <Button onClick={onCloseHandler}>No</Button>
      </Modal>)
}

export default deleteCity;
