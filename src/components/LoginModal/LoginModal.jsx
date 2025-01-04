import { useRef, useState } from 'react';

import '../Modal/Modal.css';
import '../ModalWithForm/ModalWithForm.css';
import './LoginModal.css';
import '../../assets/projectStyles.css';
import ModalWithForm from '../ModalWithForm/ModalWithForm';


export function LoginModal(props) {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [ validPassword, setValidPassword ] = useState(true);

    const handleSubmit = (evt) => {
        evt.preventDefault();
        props.handleAuthorization(emailRef.current.value, passwordRef.current.value)
        .catch((err) => {
            console.error(err);
            setValidPassword(false);
        })
    } 

    return (
        <ModalWithForm handleCloseButtonClick={props.handleCloseButtonClick} handleOnSubmit={handleSubmit} title={"Log in"} buttonStyle={'login-modal__hide-default-button'}>
            <label htmlFor="email" className='modal__label'>email</label>
            <input type="email" id="email" placeholder='email' ref={emailRef} className='modal__input'/>
            <label htmlFor="password" className={`modal__label ${!validPassword && 'modal__invalid'}`}>password</label>
            <input type="password" id="password" placeholder='password' ref={passwordRef} className={`modal__input ${!validPassword && 'modal__invalid'}`}/>
            <div className='login-modal__submit-bar'>
                <button className='login-modal__submit project__button' type='submit'> Log in</button>
                <button className='project__contrast-button' onClick={props.handleToggleClick}>or Sign Up</button>
            </div>
        </ModalWithForm>
    )
}