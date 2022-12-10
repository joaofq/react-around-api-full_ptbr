import React from 'react';
import edit from '../images/edit.svg';
import add from '../images/add.svg';
import Card from '../components/Card';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <main className="main">
        <section className="profile">
          <div className="avatar" onClick={props.onEditAvatarClick}>
            <img
              src={currentUser.avatar}
              alt="Imagem de Perfil"
              className="avatar__image"
            />
            <div className="avatar__overlay">
              <button className="avatar__button"></button>
            </div>
          </div>
          <div className="profile__info">
            <div className="profile__top">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button className="editbutton">
                <img
                  src={edit}
                  alt="Imagem de lápis para editar"
                  className="editbutton__img"
                  onClick={props.onEditProfileClick}
                />
              </button>
            </div>
            <p className="profile__description">{currentUser.about}</p>
          </div>
          <button className="addbutton" onClick={props.onAddPlaceClick}>
            <img src={add} alt="Add signal" />
          </button>
        </section>
        <ul className="elements">
          {props.cards
            .slice(0)
            .reverse()
            .map((card) => {
              return (
                <Card
                  card={card}
                  key={card._id}
                  onCardClick={props.onCardClick}
                  onDeleteCardClick={props.onDeleteCardClick}
                  onCardDelete={props.onCardDelete}
                  onCardLike={props.onCardLike}
                />
              );
            })}
        </ul>

        <template className="cardTemplate"></template>
      </main>
    </CurrentUserContext.Provider>
  );
}

export default Main;
