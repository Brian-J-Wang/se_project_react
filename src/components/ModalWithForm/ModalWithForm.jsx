import './ModalWithForm.css';
import { useEffect } from 'react';
import { useState } from 'react';

function ModalWithForm(props) {
    const [activeModal, setActiveModal] = useState(null);

    useEffect(() => {
        document.addEventListener('keydown', props.handleEscPress)

        return () => {
            document.removeEventListener('keydown', props.handleEscPress);
        }
    }, [])

    useEffect(() => {
        if (props.form == 'addClothes') {
            setActiveModal((
            <>
                <label htmlFor="name" className='form-modal__label'>Name</label>
                <input type="text" name="name" id="name" placeholder='Name' className='form-modal__input'/>
                <label htmlFor="image" className='form-modal__label'>Image</label>
                <input type="text" name="image" id="image" placeholder='Image URL' className='form-modal__input'/>
                <h2 className='form-modal__field-header'>Select the weather type</h2>
                <div className="form-modal__radio-selection">
                    <label htmlFor="hot" className='form-modal__radio-element'>
                        <input type="radio" name="weather-type" id="hot" className='form-modal__radio-button'/> Hot
                    </label>
                    <label htmlFor="warm" className='form-modal__radio-element'>
                        <input type="radio" name="weather-type" id="warm" className='form-modal__radio-button'/> Warm
                    </label>
                    <label htmlFor="cold" className='form-modal__radio-element'>
                        <input type="radio" name="weather-type" id="cold" className='form-modal__radio-button'/> Cold
                    </label>
                </div>
            </>
            ))
        }
    }, [])

    return(
        <div className="form-modal">
            <button onClick={props.handleCloseButtonClick} className="form-modal__close-button"></button>
            <h1 className="form-modal__title">{props.title}</h1>
            <form name={props.name} className='form-modal__form'>
                {activeModal}
                <button className="form-modal__submit">{props.buttonText}</button>
            </form>
            
        </div>
    )
}

export default ModalWithForm;