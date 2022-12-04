import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
    avatarRef.current.value = '';
  }

  return (
    <PopupWithForm
      name="editavatar"
      title="Alterar a foto de perfil"
      textButton="Salvar"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="url"
        id="avatar-input"
        name="avatarurl"
        placeholder="Link da imagem"
        className="popup__input popup__input-avatar"
        ref={avatarRef}
        required
      />
      <span className="avatar-input-error popup__error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
