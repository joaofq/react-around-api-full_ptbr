import PopupWithForm from "./PopupWithForm";

function DeletePopup(props) {
  function handleSubmit(e) {
    e.preventDefault();
    props.onDeleteSubmit(props.card);
  }

  return (
    <PopupWithForm
      name="deletecard"
      title="Tem certeza?"
      isOpen={props.isOpen}
      onClose={props.onClose}
      textButton="Sim"
      onSubmit={handleSubmit}
    />
  );
}

export default DeletePopup;
