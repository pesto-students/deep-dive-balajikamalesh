import React from 'react';
import './modal.css';

export default (props) => {
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