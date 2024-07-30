import { useEffect } from "react";

function Modal({ name, onClose, children}) {
    const handleEscape = (e) => {
        if (e.key === "escape") {
            onClose();
        }

        document.addEventListener('keydown', handleEscape);

        return () => {
            document.removeEventListener('keydown', handleEscape);
        }
    }

    const handleOverlay = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }

    return (
        <div className={`modal modal_type${name}`} onClick={handleOverlay}>
            <div className="modal__container">
                {children}
            </div>
        </div>
    )
}