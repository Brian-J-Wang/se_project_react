import { useRef } from 'react';

import '../Modal/Modal.css';
import '../ModalWithForm/ModalWithForm.css';
import './RegisterModal.css';
import '../../assets/projectStyles.css';

export function RegisterModal(props) {
    const nameRef = useRef();
    const avatarRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    function handleSubmit(evt) {
        evt.preventDefault();
        props.handleRegistration(nameRef.current.value, avatarRef.current.value, emailRef.current.value, passwordRef.current.value);
    }

    return (
        <div className="modal form-modal">
            <button onClick={props.handleCloseButtonClick} className="modal__close-button form-modal__close-button"></button>
            <h1 className="form-modal__title">Log In</h1>
            <form id="login-in" className='form-modal__form register-modal__form' onSubmit={handleSubmit}>
                <label htmlFor="email" className='modal__label'>Email*</label>
                <input type="email" id="email" className='modal__input' placeholder='email' ref={emailRef}/>
                <label htmlFor="password" className='modal__label'>Password*</label>
                <input type="password" id="password" className='modal__input' placeholder='password' ref={passwordRef}/>
                <label htmlFor="name" className='modal__label'>Name*</label>
                <input type="text" id="name" className='modal__input' placeholder='name' ref={nameRef}/>
                <label htmlFor="avatar" className='modal__label'>AvatarURL*</label>
                <input type="url" id="avatar" className='modal__input' placeholder='avatar URL' ref={avatarRef}/>
                <div className='login-modal__submit-bar register-modal__bottom-buttons'>
                    <button className='login-modal__submit project__button' type='submit'>Sign Up</button>
                    <button className='project__contrast-button'>or Log In</button>
                </div>
            </form>
        </div>
    )
}