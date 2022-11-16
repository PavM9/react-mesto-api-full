import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup ({ isOpen, onClose, onUpdateAvatar}) {
  const avatarRef = React.useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    })
    e.target.reset()
}

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      name="avatar"
      title="Обновить аватар"
      submitText="Сохранить"
    >
      <input
        className="popup__form-item popup__form-item_avatar_link"
        required
        ref={avatarRef}
        type="url"
        name="avatar"
        id="avatar-link-input"
        placeholder="Ссылка на картинку"
      />
      <span className="popup__error avatar-link-input-error"></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup
