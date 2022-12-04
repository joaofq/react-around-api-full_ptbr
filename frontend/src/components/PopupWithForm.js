import closeIcon from '../images/close-icon.svg';

function PopupWithForm(props) {
  return (
    <div
      className={`popup popup_type_${props.name} ${
        props.isOpen ? 'popup_opened' : ''
      }`}
    >
      <form
        name={props.name}
        className="popup__container popup__form"
        onSubmit={props.onSubmit}
        noValidate
      >
        <img
          src={closeIcon}
          className="popup__close-icon"
          alt="Close Icon"
          onClick={props.onClose}
        />
        <h1 className="popup__title">{props.title}</h1>
        {props.children}
        <button
          type="submit"
          className={`popup__button ${props.button}`}
          name="button"
        >
          {props.textButton}
        </button>
      </form>
    </div>
  );
}

export default PopupWithForm;
