import React from 'react';
import trash from '../images/trash.svg';
import like from '../images/like.svg';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = props.card.owner === currentUser._id;

  const cardDeleteButtonClassName = `card__delete-button ${
    isOwn ? 'card__delete-button' : 'card__delete-button_hidden'
  }`;

  const isLiked = props.card.likes.some((i) => i === currentUser._id);

  const cardLikeButtonClassName = `likebutton ${
    isLiked ? 'likebutton_active' : ''
  }`;

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <li className="card">
      <img
        src={trash}
        className={cardDeleteButtonClassName}
        alt="Trash icon"
        onClick={handleDeleteClick}
      />
      <img
        src={props.card.link}
        className="card__image"
        alt={props.card.name}
        onClick={handleClick}
      />
      <div className="card__bottom">
        <p className="card__text">{props.card.name}</p>
        <button className={cardLikeButtonClassName} onClick={handleLikeClick}>
          <img src={like} alt="like heart button" />
          <p className="likebutton__counter">{props.card.likes.length}</p>
        </button>
      </div>
    </li>
  );
}

export default Card;
