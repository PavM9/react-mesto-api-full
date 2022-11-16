import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup ({ isOpen, onClose, onSubmit}) {
  const [name, setName] = React.useState("");
	const [link, setLink] = React.useState("");

  React.useEffect(() => {
    setName('');
    setLink('');
  }, [isOpen]);


  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={() => {
				onSubmit({ name, link });
			}}
      name="add-card"
      title="Новое место"
      submitText="Создать"
    >
      <input
        onChange={(event) => {
          setName(event.target.value);
        }}
        value={name}
        className="popup__form-item popup__form-item_card_title"
        minLength={2}
        maxLength={30}
        required
        type="text"
        name="name"
        id="title-input"
        placeholder="Название"
      />
      <span className="popup__error title-input-error"></span>
      <input
        onChange={(event) => {
          setLink(event.target.value);
        }}
        value={link}
        className="popup__form-item popup__form-item_card_link"
        required
        type="url"
        name="link"
        id="link-input"
        placeholder="Ссылка на картинку"
      />
      <span className="popup__error link-input-error"></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup
