import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { MainNavigation } from './MainNavigation';
import { Navbar, SideDrawer } from '../../components/navigation';

configure({ adapter: new Adapter() });

fdescribe('<MainNavigation />', () => {
	let context;

	beforeEach(() => {
		context = jest.mock('../../shared/hooks/authentication-hook.js', () => ({
			isAuthenticated: true,
			userId: '123abc',
			logout: () => {}
		}));
		return context;
	});

	it('should render the <Navbar /> component', () => {
		const context = { isAuthenticated: true, userId: '123abc', logout: () => {} };
		const wrapper = shallow(<MainNavigation />, { context });
		expect(wrapper.find(Navbar));
	});
});
