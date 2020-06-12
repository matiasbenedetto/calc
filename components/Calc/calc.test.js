import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Calc from './index';
import Button from '../Button';
import Viewr from '../Viewr';

configure({ adapter: new Adapter() });

describe ('Calc component', () => {
  it('renders inner components', () => {
    const wrapper = shallow(
      <Calc />
    );
    const buttons = wrapper.find(Button);
    expect(buttons.length).toBe(16);
    const viewr = wrapper.find(Viewr);
    expect(viewr.length).toBe(1);
  });
});