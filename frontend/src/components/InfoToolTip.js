function InfoToolTip({ isOpen, image, title, onClose}) {
  function handleCloseClick(){
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
          <img className="popup__status-image" src={image} alt={title}/>
          <h2 className="popup__message">{title}</h2>
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

export default InfoToolTip
