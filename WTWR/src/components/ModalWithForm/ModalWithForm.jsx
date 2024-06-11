import './ModalWithForm.css';
import { useEffect } from 'react';

function ModalWithForm(props) {
    useEffect(() => {
        document.addEventListener('keydown', props.handleEscPress)

        return () => {
            document.removeEventListener('keydown', props.handleEscPress);
        }
    }, [])

    return(
        <div className="form-modal">
            <button onClick={props.handleCloseButtonClick} className="form-modal__close-button"></button>
            <h1 className="form-modal__title">{props.title}</h1>
            <form name={props.name} className='form-modal__form'>
                {props.children}
            </form>
            <button className="form-modal__submit">{props.buttonText}</button>
        </div>
    )
}

export default ModalWithForm;