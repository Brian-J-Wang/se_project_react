import { useState } from "react";
import { useEffect } from "react";
import './Overlay.css'

function Overlay(props) {
    const [isActive, setIsActive] = useState(false);
    useEffect(() => {
        if (props.children != null) {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [props.children])

    useEffect(() => {
        if (isActive) {
            document.addEventListener('keydown', props.handleEscPress);
            document.getElementById('overlay').addEventListener('mousedown', props.handleOverlayClick);
        } else {
            document.removeEventListener('keydown', props.handleEscPress);
            document.getElementById('overlay').removeEventListener('mousedown', props.handleOverlayClick);
        }
    }, [isActive]);


    return (
        <div id='overlay' className={`overlay ${isActive ? 'overlay_state_active' : ''}`} >
            <div className="overlay__content">
                {props.children}
            </div>
        </div>
    )
}

export default Overlay;