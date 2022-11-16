import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function ConfirmDeletePopup({isOpen, onClose, card, onSubmit }) {

  function handleSubmit(evt) {
    evt.preventDefault();
    onSubmit(card);
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      name="confirm"
      title="Вы уверены?"
      submitText="Да"
    />
  );
}

export default ConfirmDeletePopup;
