import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import RecipeFile from './RecipeFile';
import classes from './RecipeFile.module.css';

configure({ adapter: new Adapter() });

describe('<RecipeDescription />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(
            <RecipeFile
                file={''}
                onChange={() => { }} />
        );
    })

    it('shoudn\'t render upload button if readonly', () => {
        wrapper.setProps({ readOnly: true })
        expect(wrapper.find(`.${classes.cardBody}`)).toHaveLength(0);
    });

    it('shoud render upload button if !readonly', () => {
        wrapper.setProps({ readOnly: false })
        expect(wrapper.find(`.${classes.cardBody}`)).toHaveLength(1);
    });
})

