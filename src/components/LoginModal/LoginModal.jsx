import { useRef, useState } from 'react';

import '../Modal/Modal.css';
import '../ModalWithForm/ModalWithForm.css';
import './LoginModal.css';
import '../../assets/projectStyles.css';
import ModalWithForm from '../ModalWithForm/ModalWithForm';


export function LoginModal(props) {
    const [ validPassword, setValidPassword ] = useState(true);

    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    const handleSubmit = (evt) => {
        evt.preventDefault();
        props.handleAuthorization(email, password)
        .catch((err) => {
            console.error(err);
            setValidPassword(false);
        })
    }

    return (
        <ModalWithForm handleCloseButtonClick={props.handleCloseButtonClick} handleOnSubmit={handleSubmit} title={"Log in"} buttonStyle={'login-modal__hide-default-button'}>
            <label htmlFor="email" className='modal__label'>email</label>
            <input type="email" id="email" placeholder='email' value={email} onChange={(evt) => { setEmail(evt.target.value) }} className='modal__input'/>
            <label htmlFor="password" className={`modal__label ${!validPassword && 'modal__invalid'}`}>password</label>
            <input type="password" id="password" placeholder='password' value={password} onChange={(evt) => { setPassword(evt.target.value) }} className={`modal__input ${!validPassword && 'modal__invalid'}`}/>
            <div className='login-modal__submit-bar'>
                <button className='login-modal__submit project__button' type='submit'> Log in</button>
                <button className='project__contrast-button' onClick={props.handleToggleClick} type='button'>or Sign Up</button>
            </div>
        </ModalWithForm>
    )
}