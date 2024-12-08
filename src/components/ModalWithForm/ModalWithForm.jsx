import '../Modal/Modal.css'
import './ModalWithForm.css';

function ModalWithForm(props) {

    return(
        <div className="modal form-modal">
            <button onClick={props.handleCloseButtonClick} className="modal__close-button form-modal__close-button"></button>
            <h1 className="form-modal__title">{props.title}</h1>
            <form id={props.name} className='form-modal__form' onSubmit={props.handleOnSubmit}>
                {props.children}
                <button className="form-modal__submit" type='submit' form={props.name}>{props.buttonText}</button>
            </form>
        </div>
    )
}

export default ModalWithForm;