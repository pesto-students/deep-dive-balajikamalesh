import React, { useState, useEffect } from 'react';
import Modal from './modal/modal';
import Backdrop from './backdrop/backdrop';
import './App.css';

function App() {
  
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isMyBioOpen, setIsMyBioOpen] = useState(false);

  useEffect(() => {
    document.onkeydown = onKeyDown;
  },[onkeydown])

  const close = () => {
    setIsSignupOpen(false); 
    setIsLoginOpen(false);
    setIsMyBioOpen(false);
  }

  const onKeyDown = (event) => {
    let modal = document.querySelector('.modal');
    let focusableElementsString = `a[href], area[href], input:not([disabled]), button:not([disabled]), 
                                    iframe, object, embed, [tabindex="0"], [contendeditable]`;

    let focusableElements = (modal !== null) ? modal.querySelectorAll(focusableElementsString) :
                                               document.querySelectorAll(focusableElementsString);
    focusableElements = Array.prototype.slice.call(focusableElements);
    let firstElement = focusableElements[0];
    let lastElement = focusableElements[focusableElements.length - 1];

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

    if(event.keyCode === 27 && modal !== null) {
      close();
    }
  }

  return (
    <div className="App">
      {(isLoginOpen || isSignupOpen || isMyBioOpen) && <Backdrop onCancel={close}/>}
      
      <button id="login" className="button" onClick={() => { setIsLoginOpen(!isLoginOpen); setIsSignupOpen(false); setIsMyBioOpen(false); }}>Login</button>
      {isLoginOpen && <Modal title="Login" confirmActionName="Login" onCancel={close} onConfirm={close}>
                        <form>
                          <div className="form-input">
                            <label htmlFor="username">Username</label>
                            <input type="text" id="username" placeholder=""/>
                          </div>
                          <div className="form-input">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" placeholder=""/>
                          </div>
                          <div className="form-input">
                            <label htmlFor="remember">Remember Me</label>
                            <input type="checkbox" id="remember"/>
                          </div>
                        </form>
                      </Modal>}

      <button id="signup" className="button" onClick={() => { setIsSignupOpen(!isSignupOpen); setIsLoginOpen(false); setIsMyBioOpen(false); }}>Sign up</button>
      {isSignupOpen && <Modal title="Signup" confirmActionName="Sign Up" onCancel={close} onConfirm={close}>
                        <form>
                          <div className="form-input">
                            <label htmlFor="username">Username</label>
                            <input type="text" id="username" placeholder=""/>
                          </div>
                          <div className="form-input">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" placeholder=""/>
                          </div>
                          <div className="form-input">
                            <label htmlFor="repassword">Re enter Password</label>
                            <input type="text" id="repassword" placeholder=""/>
                          </div>
                        </form>
                      </Modal>}

      <button id="mybio" className="button" onClick={() => { setIsMyBioOpen(!isMyBioOpen); setIsLoginOpen(false); setIsSignupOpen(false); }}>My Bio</button>
      {isMyBioOpen && <Modal title="My Bio" confirmActionName="Add" onCancel={close} onConfirm={close}>
                        <form>
                          <div className="form-input">
                            <label htmlFor="firstname">First Name</label>
                            <input type="text" id="firstname" placeholder=""/>
                          </div>
                          <div className="form-input">
                            <label htmlFor="lastname">Last Name</label>
                            <input type="text" id="lastname" placeholder=""/>
                          </div>
                          <div className="form-input">
                            <label htmlFor="dateofbirth">Date of Birth</label>
                            <input type="date" id="dateofbirth" placeholder=""/>
                          </div>
                        </form>
                      </Modal>}
    </div>
  );
}

export default App;
