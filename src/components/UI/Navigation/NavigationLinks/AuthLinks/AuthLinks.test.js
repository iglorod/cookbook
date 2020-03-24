import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

import { AuthLinks } from './AuthLinks';
import NavigationLink from '../NavigationLink/NavigationLink';

configure({ adapter: new Adapter() });

describe('<AuthLinks />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<AuthLinks />);
    })

    it('shoud render two <NavigationLinks /> if not authenticated', () => {
        expect(wrapper.find(NavigationLink)).toHaveLength(2);
    });

    it('shoud not render <NavigationLinks /> at all if authenticated', () => {
        wrapper.setProps({ userEmail: 'test-email', logout: () => { }  })
        expect(wrapper.find(NavigationLink)).toHaveLength(0);
    });

    it('shoud contains signout-icon if authenticated', () => {
        wrapper.setProps({ userEmail: 'test-email', logout: () => { } })
        expect(wrapper.contains(<FontAwesomeIcon icon={faSignOutAlt} />)).toBeTruthy();
    });
})

