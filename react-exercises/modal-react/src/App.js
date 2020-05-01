import React, { useState } from 'react';
import Modal from './modal/modal';
import './App.css';
import { navigate } from '@reach/router';

function App() {
  
  const [activeModal, setActiveModal] = useState('');

  const close = () => {
    setActiveModal('');
  }

  const redirect = () => {
    navigate('/dashboard', { state: { fromApp: true }});
  }

  return (
    <div className="App">
      
      <button id="login" className="button" onClick={() => { setActiveModal('login') }}>Login</button>
      <button id="signup" className="button" onClick={() => { setActiveModal('signup')}}>Sign up</button>
      <button id="default" className="button" onClick={() => { setActiveModal('default')}}>Default</button>

      { activeModal === 'login' &&  
                      <Modal 
                      isOpen={activeModal === 'login'}
                      title="Login" 
                      confirmActionName="Login"
                      backDropClassName="backdrop"
                      onBackDropClick={close} 
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

      { activeModal === 'signup' &&
                        <Modal 
                        isOpen={activeModal === 'signup'}
                        title="Signup" 
                        confirmActionName="Sign Up" 
                        backDropClassName="backdrop" 
                        onBackDropClick={close}
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
          
        { activeModal === 'default' && 
                            <Modal isOpen={activeModal === 'default'} 
                                   onCancel={close}></Modal>
        }
    </div>
  );
}

export default App;
