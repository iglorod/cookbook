import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import RecipeName from './RecipeName';

configure({ adapter: new Adapter() });

describe('<RecipeName />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<RecipeName onChange={() => {}} name={'test'} />);
    })

    it('shoudn\'t render texstarea if readonly', () => {
        wrapper.setProps({ readOnly: true })
        expect(wrapper.find('input')).toHaveLength(0);
    });

    it('shoud render texstarea if !readonly', () => {
        wrapper.setProps({ readOnly: false })
        expect(wrapper.find('input')).toHaveLength(1);
    });
})

