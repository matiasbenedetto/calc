import React from 'react';
import { shallow, configure } from 'enzyme';
import Index from './index';
import Calc from '../components/Calc';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe ('Index page component', () => {
  it('renders Calc component in the Index page', () => {
    const wrapper = shallow(
      <Index />
    );
    const calc = wrapper.find(Calc);
    expect(calc.length).toBe(1);
  });
});