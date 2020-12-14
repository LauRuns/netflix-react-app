import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { NavItems } from './NavItems';
import { NavItem } from '../navItem/NavItem';

configure({ adapter: new Adapter() });

describe('<NavItems />', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = shallow(<NavItems />);
	});

	it('should render one <NavItem /> element if not authenticated', () => {
		wrapper.setProps({ isAuthenticated: false });
		expect(wrapper.find(NavItem)).toHaveLength(1);
	});

	it('should render multiple <NavItem /> elements if authenticated', () => {
		wrapper.setProps({ isAuthenticated: true, navItemsList: [1, 2, 3, 4] });
		expect(wrapper.find(NavItem)).toHaveLength(4);
	});
});
