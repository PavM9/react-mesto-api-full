function ImagePopup({ card, onClose }) {
  return (
    <section
      className={`popup popup_type_image-fullscreen ${card ? 'popup_is-opened' : ''}`}
      onClick={() => {
        onClose();
      }}
    >
    {card && (
      <figure
        className="popup__image-container"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <img
          className="popup__image"
          src={card.link}
          alt={card.name}
        />
        <figcaption className="popup__image-caption">
          {card.name}
        </figcaption>
        <button
          className="popup__close-button"
          type="button"
          onClick={() => {
            onClose();
          }}
        />
      </figure>
    )}
    </section>
  );
}

export default ImagePopup
