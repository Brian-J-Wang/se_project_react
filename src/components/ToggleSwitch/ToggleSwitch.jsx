import { useContext, useState } from 'react';
import { TemperatureUnitContext } from '../../contexts/CurrentTemperatureUnitContext';
import './ToggleSwitch.css'

function ToggleSwitch (props) {
    const temperatureContext = useContext(TemperatureUnitContext);

    return (
        <label htmlFor={'ToggleSwitch'} className={`${props.className} toggle-switch__container`}>
            <input type="checkbox" id={'ToggleSwitch'} className='toggle-switch__input' onChange={temperatureContext.handleToggleSwitchChange}/>
            <div className='toggle-switch__notch'></div>
            <p className={`toggle-switch__label ${temperatureContext.currentTemperatureUnit === 'F' && 'toggle-switch__label_active'}`}>F</p>
            <p className={`toggle-switch__label ${temperatureContext.currentTemperatureUnit === 'C' && 'toggle-switch__label_active'}`}>C</p>
        </label>
        
    );
}

export default ToggleSwitch;