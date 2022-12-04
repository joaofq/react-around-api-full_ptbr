import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function EditProfilePopup(props) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }
  return (
    <PopupWithForm
      name="editprofile"
      title="Editar perfil"
      textButton="Salvar"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        id="name-input"
        name="name"
        placeholder={currentUser.name}
        className="popup__input popup__input-name"
        minLength="2"
        maxLength="40"
        onChange={handleNameChange}
        required
      />
      <span className="name-input-error popup__error"></span>
      <input
        type="text"
        id="about-input"
        name="about"
        placeholder={currentUser.about}
        className="popup__input popup__input-about"
        minLength="2"
        maxLength="200"
        onChange={handleDescriptionChange}
        required
      />
      <span className="about-input-error popup__error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
