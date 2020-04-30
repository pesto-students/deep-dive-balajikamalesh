import React, { useState } from 'react';
import Modal from './modal/modal';
import Backdrop from './backdrop/backdrop';
import './App.css';
import { navigate } from '@reach/router';

function App() {
  
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isMyBioOpen, setIsMyBioOpen] = useState(false);

  const close = () => {
    setIsSignupOpen(false); 
    setIsLoginOpen(false);
    setIsMyBioOpen(false);
  }

  const redirect = () => {
    navigate('/dashboard');
  }

  return (
    <div className="App">
      {(isLoginOpen || isSignupOpen || isMyBioOpen) && <Backdrop onCancel={close}/>}
      
      <button id="login" className="button" onClick={() => { setIsLoginOpen(!isLoginOpen); setIsSignupOpen(false); setIsMyBioOpen(false); }}>Login</button>
      <button id="signup" className="button" onClick={() => { setIsSignupOpen(!isSignupOpen); setIsLoginOpen(false); setIsMyBioOpen(false); }}>Sign up</button>
      <button id="mybio" className="button" onClick={() => { setIsMyBioOpen(!isMyBioOpen); setIsLoginOpen(false); setIsSignupOpen(false); }}>My Bio</button>

      {isLoginOpen && <Modal 
                      title="Login" 
                      confirmActionName="Login" 
                      onCancel={close}
                      onConfirm={redirect}>
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

      {isSignupOpen && <Modal 
                        title="Signup" 
                        confirmActionName="Sign Up" 
                        onCancel={close} 
                        onConfirm={redirect}>
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
                            <input type="password" id="repassword" placeholder=""/>
                          </div>
                        </form>
                      </Modal>}

      {isMyBioOpen && <Modal 
                        title="My Bio" 
                        confirmActionName="Add" 
                        onCancel={close} 
                        onConfirm={redirect}>
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
