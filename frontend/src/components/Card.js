import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDislike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);

  const [isLiked, setIsLiked] = React.useState(false)
  const [isOwn, setIsOwn] = React.useState(false)

  const handleCardClick = () => {
    onCardClick(card);
  };

  const handleLike = () => {
    onCardLike(card)
  };

  const handleDislike = () => {
    onCardDislike(card)
  };

	const handleDeleteClick = () => {
    onCardDelete(card)
  };

React.useEffect(() => {
  setIsLiked(() => card.likes.some(i => i === currentUser._id))
  setIsOwn(card.owner === currentUser._id)
}, [currentUser, card])

const cardDeleteButtonVisibility  = (
  `${isOwn ? '' : 'none'}`
);

const cardLikeButtonClassName = (
  `card__like-button ${isLiked ? 'card__like-button_is-active' : ''}`
);

  return (
    <li className="card">
      <img
        className="card__image"
        src={card.link}
        alt={card.name}
        onClick={handleCardClick}
      />
      <div className="card__info">
        <h2 className="card__title">
          {card.name}
        </h2>
        <div className="card__like-container">
        <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={isLiked ? handleDislike : handleLike}
        />
          <span className="card__like-counter">
            {card.likes.length}
          </span>
        </div>
      </div>
      <button
        className="card__delete-button"
        style={{display: `${cardDeleteButtonVisibility}`}}
        onClick={handleDeleteClick}
      />
    </li>
  );
}

export default Card
