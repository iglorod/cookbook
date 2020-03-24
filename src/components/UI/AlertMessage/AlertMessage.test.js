import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import AlertMessage from './AlertMessage';

configure({ adapter: new Adapter() });

describe('<AlertMessage />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<AlertMessage />);
    })

    it('shoud be empty', () => {
        wrapper.setProps({ errorMessage: null }); //imp
        expect(wrapper.find('div')).toHaveLength(0);
    });

    it('shoud render one <div>', () => {
        wrapper.setProps({ errorMessage: 'test' });
        expect(wrapper.find('div')).toHaveLength(1);
    });

    it('shoud show recived text', () => {
        wrapper.setProps({ errorMessage: 'test' });
        expect(wrapper.find('div').text()).toEqual('test');
    });
})

