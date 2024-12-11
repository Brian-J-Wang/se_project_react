function Modal({ name, onClose, children}) {
    const handleEscape = (e) => {
        if (e.key === "escape") {
            onClose();
        }
    }

    const handleOverlay = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }

    return (
        <div className={`modal modal_type${name}`} onClick={handleOverlay} onKeyDown={handleEscape}>
            <div className="modal__container">
                {children}
            </div>
        </div>
    )
}

export default Modal