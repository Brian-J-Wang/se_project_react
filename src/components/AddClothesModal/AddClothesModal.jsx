import ModalWithForm from "../ModalWithForm/ModalWithForm"

function AddClothesModal(props) {
    return (
        <ModalWithForm title='New garment' name="new garment" buttonText="Add garment" form='addClothes' handleCloseButtonClick={props.handleCloseButtonClick}>
            <label htmlFor="name" className='modal__label'>Name</label>
            <input type="text" name="name" id="name" placeholder='Name' className='modal__input'/>
            <label htmlFor="image" className='modal__label'>Image</label>
            <input type="text" name="image" id="image" placeholder='Image URL' className='modal__input'/>
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
        </ ModalWithForm>
    );
}

export default AddClothesModal