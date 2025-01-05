import { useContext, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import "./EditProfileModal.css";
import '../Modal/Modal.css';

function EditProfileModal(props) {
    const currentUser = useContext(CurrentUserContext);
    const [ name, setName ] = useState(currentUser.name);
    const [ avatar, setAvatar ] = useState(currentUser.avatar);
    
    function handleSubmit(e) {
        e.preventDefault();

        props.onSubmit({ name: name, avatar: avatar });
    }

    return (
        <ModalWithForm form='editProfile' buttonText="Save changes" buttonStyle="edit-profile__button"
            handleOnSubmit={handleSubmit} handleCloseButtonClick={props.handleCloseButtonClick}>
            <h2 className="edit-profile__form-title">Change profile data</h2>
            <label htmlFor="name" className='modal__label'>Name *</label>
            <input type="text" name="name" id="name" className='modal__input' value={name} onChange={(evt) => { setName( evt.target.value )}} defaultValue={name}/>
            <label htmlFor="avatar" className='modal__label'>Avatar *</label>
            <input type="text" name="avatar" id="avatar" className='modal__input' value={avatar} onChange={(evt) => { setAvatar( evt.target.value )}} defaultValue={avatar}/>
        </ModalWithForm>
    )
}

export default EditProfileModal;