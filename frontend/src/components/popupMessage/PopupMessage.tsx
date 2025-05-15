import "./PopupMessage.scss";
import CustomButton from "../CustomButton/CustomButton.tsx";

export function PopupMessage({ isOpen, message, onClose }: { isOpen: boolean; message: string; onClose: () => void }) {
    if (!isOpen) return null;

    return (
        <div className="popup-background">
            <div className="popup-window">
                <p className="popup-message">{message}</p>
                <CustomButton text="Ok" onClick={onClose}/>
            </div>
        </div>
    );
}
