import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Viewr from './index';

configure({ adapter: new Adapter() });

const mockProps = {
  result: 100,
  display: '10x10',
  error: null,
  loading: false
}

describe ('Viewr component', () => {
  it('renders Viewr component', () => {
    const wrapper = shallow(
      <Viewr {...mockProps} />
    );
    const result = wrapper.find('h1');
    expect(result.length).toBe(1);
    expect(result.text()).toBe('100');

    const display = wrapper.find('p');
    expect(display.length).toBe(1);
    expect(display.text()).toBe('10x10');

    const loading = wrapper.find('small');
    expect(loading.length).toBe(0);

  });

  it('renders Viewr component with error message', () => {
    const wrapper = shallow(
      <Viewr {...mockProps} error="Error message" />
    );
    const loading = wrapper.find('p');
    expect(loading.text()).toBe('Error message');
  });

  it('renders Viewr component with loading indicator', () => {
    const wrapper = shallow(
      <Viewr {...mockProps} loading={true} />
    );
    const loading = wrapper.find('small');
    expect(loading.length).toBe(1);
  });
});