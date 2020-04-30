import React, {useState, useEffect } from 'react';
import './modal.css';

export default (props) => {

  const [initiallyFocussedElement, setInitiallyFocussedElement] = useState(document.activeElement);

  useEffect(() => {
    document.onkeydown = onKeyDown;
  })

  const onKeyDown = (event) => {
    let modal = document.querySelector('.modal');
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
        props.onCancel();
        initiallyFocussedElement.focus();
      }
    }
  }

  return(
    <div className="modal" role="modal" aria-labelledby="modal_title">
        <header className="modal-header">
            <a href="/" aria-label="Close" className="close" onClick={props.onCancel}/>
            <h1 tabIndex="-1" id="modal_title">{props.title}</h1>
        </header>
        <section className="modal-content">
            {props.children}
        </section>
        <section className="modal-actions">
            <button className="button-action" onClick={props.onCancel}>Cancel</button>
            <button className="button-action" onClick={props.onConfirm}>{props.confirmActionName}</button>
        </section>
    </div>
  )
}