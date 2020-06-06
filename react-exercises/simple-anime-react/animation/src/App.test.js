import React from 'react';
//import { render } from '@testing-library/react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure, render } from 'enzyme';
import App from './App';

configure({ adapter: new Adapter() });

describe('App', () => {
    it('renders learn react link', () => {
        const app = shallow(<App />);
        expect(app.find('.App')).toBeDefined();
    });
    it('renders learn react link', () => {
        const app = render(<App />);
        expect(app.find('.child-content').length).toBe(5);
    });
})