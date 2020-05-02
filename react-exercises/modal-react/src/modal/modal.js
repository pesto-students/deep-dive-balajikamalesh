import React, { useEffect } from 'react';
import './modal.css';

export default (props) => {
  let { title, 
        isOpen, 
        children, 
        confirmActionName,
        backDropClassName,
        modalStyleClassName,
        currentFocusedElement,
        onCancel, 
        onConfirm, 
        onBackDropClick } = props;

  if(isOpen === undefined){
    isOpen = true;
  }

  if(title === undefined){
    title = 'Default Title';
  }

  if(children === undefined){
    children = `Pass HTML Attribute to the modal`;
  }

  if(backDropClassName === undefined){
    backDropClassName = 'default-backdrop';
  }
  
  if(modalStyleClassName === undefined){
    modalStyleClassName = {};
    modalStyleClassName.modal = 'modal';
    modalStyleClassName.modalHeader = 'modal-header';
    modalStyleClassName.modalContent = 'modal-content';
    modalStyleClassName.modalAction = 'modal-actions';
  }

  if(confirmActionName === undefined){
    confirmActionName = 'OK';
  }

  if(currentFocusedElement === undefined){
    currentFocusedElement = document.activeElement;
  }

  if(onCancel === undefined){
    onCancel = () => {
      window.location.reload();
    }
  }

  if(onConfirm === undefined){
    onConfirm = () => {
      window.location.reload();
    }
  }

  if(onBackDropClick === undefined){
    onBackDropClick = () => {
      window.location.reload();
    }
  }

  useEffect(() => {
    document.onkeydown = onKeyDown;
  })

  const onKeyDown = (event) => {
    let modal = document.querySelector(`.${modalStyleClassName.modal}`);
    let focusableElementsString = `a[href], area[href], input:not([disabled]), button:not([disabled]), 
                                    iframe, object, embed, [tabindex="0"], [contendeditable]`;
    if(modal !== null){
      let focusableElements = modal.querySelectorAll(focusableElementsString);
      focusableElements = Array.prototype.slice.call(focusableElements);

      let firstElement = focusableElements[0];
      let lastElement = focusableElements[focusableElements.length - 1];

      if(!focusableElements.includes(document.activeElement)){
        firstElement.focus();
      }

      if(event.keyCode === 9) {
          if(event.shiftKey){
            if(document.activeElement === firstElement ){
                event.preventDefault();
                lastElement.focus();
            }
          } else {
            if(document.activeElement === lastElement ){
              event.preventDefault();
              firstElement.focus();
            }
          }
      }

      if(event.keyCode === 27) {
        onCancel();
        currentFocusedElement.focus();
      }
    }
  }

  if (isOpen){
    return(
      <div>
        <div className={backDropClassName} onClick={onBackDropClick}/>
        <div className={modalStyleClassName.modal} role="modal" aria-labelledby="modal_title">
            <header className={modalStyleClassName.modalHeader}>
                <a href="/" aria-label="Close" className="close" onClick={onCancel}/>
                <h1 tabIndex="-1" id="modal_title">{title}</h1>
            </header>
            <section className={modalStyleClassName.modalContent}>
                {children}
            </section>
            <section className={modalStyleClassName.modalAction}>
                <button className="button-action" onClick={onCancel}>Cancel</button>
                <button className="button-action" onClick={onConfirm}>{confirmActionName}</button>
            </section>
        </div>
      </div>
    )
  } else {
    return(
      <div></div>
    )
  } 
}
