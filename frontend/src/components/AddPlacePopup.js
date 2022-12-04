import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [placeName, setPlaceName] = useState("");
  const [link, setLink] = useState("");

  function handleAddPlaceSubmit(e) {
    e.preventDefault();
    props.onAddPlaceSubmit({
      placeName,
      link,
    });
    document.querySelector("#title-input").value = "";
    document.querySelector("#link-input").value = "";
  }

  function handlePlaceNameChange(e) {
    setPlaceName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  return (
    <PopupWithForm
      name="addcard"
      title="Novo local"
      textButton="Salvar"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleAddPlaceSubmit}
    >
      <input
        type="text"
        id="title-input"
        name="title"
        placeholder="Título"
        className="popup__input popup__input-title"
        minLength="2"
        maxLength="30"
        onChange={handlePlaceNameChange}
        required
      />
      <span className="title-input-error popup__error"></span>
      <input
        type="url"
        id="link-input"
        name="link"
        placeholder="Link da imagem"
        className="popup__input popup__input-link"
        onChange={handleLinkChange}
        required
      />
      <span className="link-input-error popup__error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
