import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import RecipeDescription from './RecipeDescription';

configure({ adapter: new Adapter() });

describe('<RecipeDescription />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<RecipeDescription onChange={() => {}} description={'test'} />);
    })

    it('shoudn\'t render texstarea if readonly', () => {
        wrapper.setProps({ readOnly: true })
        expect(wrapper.find('textarea')).toHaveLength(0);
    });

    it('shoud render texstarea if !readonly', () => {
        wrapper.setProps({ readOnly: false })
        expect(wrapper.find('textarea')).toHaveLength(1);
    });
})

