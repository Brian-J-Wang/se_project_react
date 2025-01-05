import { useState } from 'react';

import '../Modal/Modal.css';
import '../ModalWithForm/ModalWithForm.css';
import './RegisterModal.css';
import '../../assets/projectStyles.css';
import ModalWithForm from '../ModalWithForm/ModalWithForm';

export function RegisterModal(props) {

    const [ name, setName ] = useState("");
    const [ avatar, setAvatar ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    function handleSubmit(evt) {
        evt.preventDefault();
        props.handleRegistration(name, avatar, email, password);
    }

    return (
        <ModalWithForm handleCloseButtonClick={props.handleCloseButtonClick} title={"Register"} handleOnSubmit={handleSubmit} buttonStyle={'register-modal__hide-default-button'}>
            <label htmlFor="email" className='modal__label'>Email*</label>
            <input type="email" id="email" className='modal__input' placeholder='email' value={email} onChange={(evt) => { setEmail(evt.target.value)}}/>
            <label htmlFor="password" className='modal__label'>Password*</label>
            <input type="password" id="password" className='modal__input' placeholder='password' value={password} onChange={(evt) => { setPassword(evt.target.value)}}/>
            <label htmlFor="name" className='modal__label'>Name*</label>
            <input type="text" id="name" className='modal__input' placeholder='name' value={name} onChange={(evt) => { setName(evt.target.value)}}/>
            <label htmlFor="avatar" className='modal__label'>AvatarURL*</label>
            <input type="url" id="avatar" className='modal__input' placeholder='avatar URL' value={avatar} onChange={(evt) => { setAvatar(evt.target.value)}}/>
            <div className='login-modal__submit-bar register-modal__bottom-buttons'>
                <button className='login-modal__submit project__button' type='submit'>Sign Up</button>
                <button className='project__contrast-button' onClick={props.handleToggleClick} type='button'>or Log In</button>
            </div>
        </ModalWithForm>
    )
}