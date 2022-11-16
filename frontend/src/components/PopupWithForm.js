function PopupWithForm({ isOpen, name, title, children, submitText, onClose, onSubmit }) {
  function handleCloseClick() {
    onClose()
  }

  return (
    <section
      className={`popup ${isOpen && `popup_is-opened`}`}
      onClick={handleCloseClick}
    >
      <div
        className="popup__container"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <div className="popup__content">
          <h2 className="popup__title">{title}</h2>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              onSubmit(event);
            }}
            className="popup__form-container"
            name={name}
          >
            {children}
            <button
              className="popup__submit-button"
              type="submit"
            >
              {submitText}
            </button>
          </form>
        </div>
        <button
          className="popup__close-button"
          type="button"
          onClick={handleCloseClick}
        />
      </div>
    </section>
  );
}

export default PopupWithForm
