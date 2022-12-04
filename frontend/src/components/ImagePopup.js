import closeIcon from "../images/close-icon.svg";

function ImagePopup(props) {
  return (
    <div className={`popup popup_type_image ${props.isOpen && "popup_opened"}`}>
      <div className="popup__container popup__container_img">
        <figure className="figure">
          <img
            src={closeIcon}
            className="popup__close-icon"
            alt="Close Icon"
            onClick={props.onClose}
          />
          <img
            src={props.card.link}
            alt={props.card.name}
            className="popup__image-view"
          />
          <figcaption className="popup__caption">{props.card.name}</figcaption>
        </figure>
      </div>
    </div>
  );
}

export default ImagePopup;
