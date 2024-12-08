import { useRef } from 'react';

import '../Modal/Modal.css';
import '../ModalWithForm/ModalWithForm.css';
import './LoginModal.css';
import '../../assets/projectStyles.css';


export function LoginModal(props) {
    const emailRef = useRef();
    const passwordRef = useRef();

    const handleSubmit = (evt) => {
        evt.preventDefault();
        props.handleAuthorization(emailRef.current.value, passwordRef.current.value);
    } 

    return (
        <div className="modal form-modal">
            <button onClick={props.handleCloseButtonClick} className="modal__close-button form-modal__close-button"></button>
            <h1 className="form-modal__title">Log In</h1>
            <form id="login-in" className='form-modal__form login-modal__form' onSubmit={handleSubmit}>
                <label htmlFor="email" className='modal__label'>email</label>
                <input type="email" id="email" placeholder='email' className='modal__input'/>
                <label htmlFor="password" className='modal__label'>password</label>
                <input type="password" id="password" placeholder='password' className='modal__input'/>
                <div className='login-modal__submit-bar'>
                    <button className='login-modal__submit project__button' type='submit'> Log in</button>
                    <button className='project__contrast-button'>or Sign Up</button>
                </div>
            </form>
        </div>
    )
}