import React from 'react';
import { render } from '@testing-library/react';
import Modal from './modal';

test('Modal Default render mode', () => {
  const { getByText } = render(<Modal isOpen={true}></Modal>);
  const linkElement = getByText(/Pass HTML Attribute to the modal/i);
  expect(linkElement).toBeInTheDocument();
});

test('Modal with form render mode', () => {
    const { getByLabelText } = render(<Modal isOpen={true}><form>
            <div className="form-input">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" placeholder=""/>
            </div>
            <div className="form-input">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" placeholder=""/>
            </div>
        </form></Modal>)

    const linkElement1 = getByLabelText(/Username/i);
    const linkElement2 = getByLabelText(/Password/i);
    expect(linkElement1).toBeInTheDocument();
    expect(linkElement2).toBeInTheDocument();
  });

  test('Modal with form and title render mode', () => {
    const { getByLabelText } = render(<Modal isOpen={true} title="sample"><form>
            <div className="form-input">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" placeholder=""/>
            </div>
            <div className="form-input">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" placeholder=""/>
            </div>
        </form></Modal>)

    const linkElement1 = getByLabelText(/sample/i);
    expect(linkElement1).toBeInTheDocument();
  });

  test('Modal with form, title render mode and confirmation button', () => {
    const { getByText } = render(<Modal isOpen={true} title="sample" confirmActionName="Login"><form>
            <div className="form-input">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" placeholder=""/>
            </div>
            <div className="form-input">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" placeholder=""/>
            </div>
        </form></Modal>)

    const linkElement1 = getByText(/Login/i);
    expect(linkElement1).toBeInTheDocument();
  });
