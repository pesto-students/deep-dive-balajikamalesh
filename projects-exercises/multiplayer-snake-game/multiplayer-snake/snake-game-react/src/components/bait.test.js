import React from 'react';
import Enzyme, { shallow, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Bait from './bait';

Enzyme.configure({ adapter: new Adapter() });

describe('bait', () => {
  it('bait position', () => {
    let baitPos = [20, 30];
    const wrapper = shallow(<Bait dot={baitPos} isNear={true}/>);
    const style = wrapper.find('div').prop('style')
    expect(style).toHaveProperty('top', '20%');
    expect(style).toHaveProperty('left', '30%');
  })
}); 