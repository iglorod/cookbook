import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import RecipeItemsList from './RecipeItemsList';
import ItemsActions from './ItemsActions/ItemsActions';

configure({ adapter: new Adapter() });

describe('<RecipeItemsList />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(
            <RecipeItemsList
                type={'test'}
                items={[1, 2, 3]}
                onAdd={() => { }}
                onRemove={() => { }}
                onChange={() => { }} />
        );
    })

    it('shoudn\'t render items action if readonly', () => {
        wrapper.setProps({ readOnly: true })
        expect(wrapper.find(ItemsActions)).toHaveLength(0);
    });

    it('shoudn render items action if  !readonly', () => {
        wrapper.setProps({ readOnly: false })
        expect(wrapper.find(ItemsActions)).toHaveLength(1);
    });
})

