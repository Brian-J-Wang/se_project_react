import '../Modal/Modal.css'
import './ModalWithForm.css';
import { useEffect } from 'react';
import { useState } from 'react';

function ModalWithForm(props) {
    useEffect(() => {
        document.addEventListener('keydown', props.handleEscPress)

        return () => {
            document.removeEventListener('keydown', props.handleEscPress);
        }
    }, [])

    return(
        <div className="modal form-modal">
            <button onClick={props.handleCloseButtonClick} className="modal__close-button form-modal__close-button"></button>
            <h1 className="form-modal__title">{props.title}</h1>
            <form name={props.name} className='form-modal__form'>
                {props.children}
                <button className="form-modal__submit">{props.buttonText}</button>
            </form>
            
        </div>
    )
}

export default ModalWithForm;