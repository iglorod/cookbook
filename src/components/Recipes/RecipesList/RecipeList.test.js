import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import RecipesList from './RecipesList';
import RecipeCard from './RecipeCard/RecipeCard';

configure({ adapter: new Adapter() });

describe('<RecipesList />', () => {
    it('shoud render five <RecipeCard />', () => {
        const wrapper = shallow(<RecipesList recipes={[1, 2, 3, 4, 5]} />);

        expect(wrapper.find(RecipeCard)).toHaveLength(5);
    });
})

