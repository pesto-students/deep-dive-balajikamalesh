import React from "react";
import Slide from './Slide';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, mount, configure } from "enzyme";

configure({ adapter: new Adapter() });

describe('Fade', () => {
    const fade = (<Slide type="slideDown"></Slide>);
    it('should define slide component', () => {
        expect(shallow(fade)).not.toBeNull();
    })
    it('should pass props to slide', () => {
        const mountedFade = mount(fade);
        expect(mountedFade.props()).toEqual({ type: 'slideDown' });
    })
})