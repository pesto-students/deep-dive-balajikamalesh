import React from 'react';
import Enzyme, { shallow, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Snake from './snake';

Enzyme.configure({ adapter: new Adapter() });

describe('snake', () => {
  it('snake length', () => {
    let snakeArray = [...Array(5).keys()].map(x => [0, 2*x]);
    const wrapper = render(<Snake snakeSquares={snakeArray}/>);
    const snakelength = wrapper['0'].children.length;
    expect(snakelength).toBe(5);
  })

  it('snake head', () => {
    let snakeArray = [...Array(5).keys()].map(x => [0, 2*x]);
    const wrapper = render(<Snake snakeSquares={snakeArray}/>);
    const headCLass = wrapper['0'].children[wrapper['0'].children.length - 1].attribs.class;
    expect(headCLass).toBe('snake-head');
  })

  it('snake body', () => {
    let snakeArray = [...Array(5).keys()].map(x => [0, 2*x]);
    const wrapper = render(<Snake snakeSquares={snakeArray}/>);
    const bodyClass = wrapper['0'].children[0].attribs.class;
    expect(bodyClass).toBe('snake-body-1');
  })
}); 