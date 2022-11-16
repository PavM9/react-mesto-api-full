import React from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfilePopup ({ isOpen, onClose, onUpdateUser}) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen])

  const onChangeName = (event) => {
    setName(event.target.value)
  }
  const onChangeDescription = (event) => {
    setDescription(event.target.value)
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    onUpdateUser({
      name,
      about: description,
    })
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      name="edit-profile"
      title="Редактировать профиль"
      submitText="Сохранить"
      >
      <input
        onChange={onChangeName}
        value={name || ""}
        className="popup__form-item popup__form-item_input_name"
        minLength={2}
        maxLength={40}
        required
        type="text"
        name="name"
        id="name-input"
        placeholder="Имя"
      />
      <span className="popup__error name-input-error"></span>
      <input
        onChange={onChangeDescription}
        value={description || ""}
        className="popup__form-item popup__form-item_input_description"
        minLength={2}
        maxLength={200}
        required
        type="text"
        name="description"
        id="description-input"
        placeholder="О себе"
      />
      <span className="popup__error description-input-error"></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup
