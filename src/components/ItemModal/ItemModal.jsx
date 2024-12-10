import { useContext } from 'react';
import './ItemModal.css'
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function ItemModal(props) {
    const currentUser = useContext(CurrentUserContext);
    const isOwn = props.owner == currentUser._id;

    const onDeleteButtonClick = () => {
        props.handleDeleteCard(props.id);
    }

    return (
        <div className="item-modal">
            <button className="item-modal__close" onClick={props.handleCloseButtonClick}></button>
            <div className="item-modal__image-container">
                <img src={props.image} alt={props.name} className="item-modal__item-image" />
                <h1 className='item-modal__item-name'>{props.name}</h1>
            </div>
            <div className="item-modal__description-container">
                <p className="item-modal__weather-type">Weather: {props.weather}</p>
                {
                    isOwn &&  <button className='item-modal__delete-button' onClick={onDeleteButtonClick}>Delete item</button>
                }
            </div>
        </div>
    )
}

export default ItemModal;