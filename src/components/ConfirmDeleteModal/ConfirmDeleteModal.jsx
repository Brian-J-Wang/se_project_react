import "./ConfirmDeleteModal.css"

const ConfirmDeleteModal = (props) => {
    return (
        <div className="delete-modal">
            <button className="item-modal__close" onClick={props.handleCloseButtonClick}></button>
            <p className="delete-modal__text">
                Are you sure you want to delete this item?
                This action is irreversible.
            </p>
            <div className="delete-modal__button-group">
                <button onClick={props.onConfirm} className="delete-modal__button delete-modal__button-type_confirm">
                    Yes, delete item
                </button>
                <button onClick={props.onCancel} className="delete-modal__button delete-modal__button-type_cancel">
                    Cancel
                </button>
            </div>
        </div>
    )   
}

export default ConfirmDeleteModal;