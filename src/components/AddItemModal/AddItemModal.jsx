import ModalWithForm from "../ModalWithForm/ModalWithForm"
import { useState, useEffect } from "react";

function AddItemModal(props) {
    // declare state for each input field
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [weatherType, setWeatherType] = useState("");

    //active modal is recreated when reactivated.

    // create onChange handlers corresponding to each state variable
    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleImageChange(e) {
        setImage(e.target.value);
    }

    function handleWeatherTypeChange(e) {
        setWeatherType(e.target.id);
    }

    function handleSubmit(e) {
        e.preventDefault();

        const shirt = {
            name: name,
            weather: weatherType,
            imageUrl: image
        }

        props.onAddItem(shirt);
    }
    
    return (
        <ModalWithForm title='New garment' name="new garment" buttonText="Add garment" form='addClothes' 
        handleCloseButtonClick={props.handleCloseButtonClick} handleOnSubmit={handleSubmit}>
            <label htmlFor="name" className='modal__label' >Name</label>
            <input type="text" name="name" id="name" placeholder='Name' className='modal__input' value={name} onChange={handleNameChange}/>
            <label htmlFor="image" className='modal__label' >Image</label>
            <input type="url" name="image" id="image" placeholder='Image URL' className='modal__input' value={image} onChange={handleImageChange}/>
            <h2 className='form-modal__field-header'>Select the weather type</h2>
            <div className="form-modal__radio-selection">
                <label htmlFor="hot" className='form-modal__radio-element'>
                    <input type="radio" name="weather-type" id="hot" className='form-modal__radio-button' onChange={handleWeatherTypeChange}/> Hot
                </label>
                <label htmlFor="warm" className='form-modal__radio-element'>
                    <input type="radio" name="weather-type" id="warm" className='form-modal__radio-button' onChange={handleWeatherTypeChange}/> Warm
                </label>
                <label htmlFor="cold" className='form-modal__radio-element'>
                    <input type="radio" name="weather-type" id="cold" className='form-modal__radio-button' onChange={handleWeatherTypeChange}/> Cold
                </label>
            </div>
        </ ModalWithForm>
    );
}

export default AddItemModal