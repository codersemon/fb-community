import "./Modal.scss";
import { FaTimes } from "react-icons/fa";

const Modal = ({children, title, subtitle, modalControl, className}) => {
  return (
    <>
      <div className={`modal-wrapper ${className}`} >
        <div className="modal-container">
          <div className="modal-header">
            <div className="header-content">
            <h3 className="title">{title}</h3>
            <p className="sub-title">{subtitle}</p>
            </div>
            {/* hide registration modal on button click  */}
            <button className="close-btn" onClick={() => modalControl(false)}><FaTimes /></button>
          </div>
          <div className="modal-body">{children}</div>
        </div>
      </div>
    </>
  );
};

export default Modal;
