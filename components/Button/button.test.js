import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Button from './index';

configure({ adapter: new Adapter() });

const mockProps = {
  char: '9',
  onClick: jest.fn(),
  color: 'red',
  disabled: false,
};

describe('Buttton component', () => {
  it('renders button', () => {
    const wrapper = shallow(
      <Button {...mockProps} />
    );
    const button = wrapper.find('button');
    expect(button.length).toBe(1);
    expect(button.prop('disabled')).toBe(false);
  });

  it('renders button disabled', () => {
    const wrapper = shallow(
      <Button {...mockProps} disabled={true} />
    );
    const button = wrapper.find('button');
    expect(button.prop('disabled')).toBe(true);
  });

  it('calls onClick on click event', () => {
    const wrapper = shallow(
      <Button {...mockProps} disabled={true} />
    );
    const button = wrapper.find('button');
    button.simulate("click");
    expect(button.prop('onClick')).toHaveBeenCalled();
  });
});