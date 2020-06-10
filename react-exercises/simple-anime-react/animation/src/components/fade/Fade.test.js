import React from "react";
import Fade from './Fade';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, mount, configure } from "enzyme";

configure({ adapter: new Adapter() });

describe('Fade', () => {
    const fade = (<Fade type="fadein"></Fade>);
    it('should define fade component', () => {
        expect(shallow(fade)).not.toBeNull();
    })
    it('should pass props to fade', () => {
        const mountedFade = mount(fade);
        expect(mountedFade.props()).toEqual({ type: 'fadein' });
    })
})