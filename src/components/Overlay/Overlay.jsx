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
        } else {
            document.removeEventListener('keydown', props.handleEscPress);
        }

        return () => {
            document.removeEventListener('keydown', props.handleEscPress);
        }
    }, [isActive]);


    return (
        <div id='overlay' className={`overlay ${isActive ? 'overlay_state_active' : ''}`} onMouseDown={props.handleOverlayClick}>
            <div className="overlay__content">
                {props.children}
            </div>
        </div>
    )
}

export default Overlay;