import { mount } from 'enzyme';
import React from 'react';

test('Button renders correctly', () => {
  const wrapper = mount(<button>This is hotpink.</button>);
  expect(wrapper).toMatchSnapshot();
});
