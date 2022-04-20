import { Component } from "react";
import { createPortal } from "react-dom";
import s from "components/Modal/Modal.module.css";

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeydownClick)
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeydownClick)
  }

  handleKeydownClick = (evt) => {
    if (evt.code==='Escape') {
      this.props.onCloseModal();
    }
  }

  handleBackdropClick = (evt) => {
    if (evt.currentTarget === evt.target) {
      this.props.onCloseModal();
    }
  }
  
  render() {
    const { modalImg } = this.props;
    return createPortal(
      <div className={s.Overlay} onClick={this.handleBackdropClick}>
        <div className={s.Modal}>
          <img src={modalImg.src} alt={modalImg.alt} />
        </div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;