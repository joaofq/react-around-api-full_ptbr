import React from 'react';
import PopupWithForm from './PopupWithForm';

function InfoTooltip(props) {
  return (
    <PopupWithForm
      name="login"
      isOpen={props.isOpen}
      onClose={props.onClose}
      action={`Login ${props.valid ? 'success' : 'Failure'}`}
      button="popup__button_infotooltip"
    >
      <div
        className={`popup__icon ${
          props.valid ? 'success-icon' : 'failure-icon'
        }`}
      ></div>
      <p className="popup__text">
        {props.valid
          ? 'Vitória! Cadastro realizado com sucesso!'
          : 'Ops, algo saiu errado! Por favor, tente novamente.'}
      </p>
    </PopupWithForm>
  );
}

export default InfoTooltip;
