import { useState } from "react";
import { useEffect } from "react";
import './Overlay.css'

function Overlay(props) {
    const [isActive, setIsActive] = useState(false);
    useEffect(() => {
        console.log(props.children);
        if (props.children != null) {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [props.children])

    return (
        <div onClick={props.handleOverlayClick} className={`overlay ${isActive ? 'overlay_state_active' : ''}`} >
            <div className="overlay__content">
                {props.children}
            </div>
        </div>
    )
}

export default Overlay;