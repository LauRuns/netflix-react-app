import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { NavItem } from './NavItem';
import { NavLink } from 'react-router-dom';

configure({ adapter: new Adapter() });

describe('<NavItem />', () => {
	it('should render a <NavItem /> element', () => {
		const item = <NavItem />;
		const wrapper = shallow(item);
		const link = wrapper.setProps({ link: '/tosomewhere' });
		expect(
			wrapper.containsMatchingElement(
				<li>
					<NavLink to={link} />
				</li>
			)
		);
		expect(wrapper.find(NavLink).first().props().to).toEqual('/tosomewhere');
	});
});
