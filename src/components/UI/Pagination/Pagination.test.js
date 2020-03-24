import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import PaginationComponent from './Pagination';

configure({ adapter: new Adapter() });

describe('<Pagination />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(<PaginationComponent
            step={6}
            active={1}
            onClick={() => { }}
        />);
    })

    it('shoud not render <Pagination.Item /> at all', () => {
        wrapper.setProps({ recipesCount: 0 });
        expect(wrapper.find('li')).toHaveLength(0);
    });

    it('shoud not render <Pagination.Item /> at all', () => {
        wrapper.setProps({ recipesCount: 1 });
        expect(wrapper.find('li')).toHaveLength(0);
    });

    it('shoud not render <Pagination.Item /> at all', () => {
        wrapper.setProps({ recipesCount: 6 });
        expect(wrapper.find('li')).toHaveLength(0);
    });

    it('shoud render two <Pagination.Item />', () => {
        wrapper.setProps({ recipesCount: 7 });
        expect(wrapper.find('li')).toHaveLength(2);
    });

    it('shoud render four <Pagination.Item />', () => {
        wrapper.setProps({ recipesCount: 24 });
        expect(wrapper.find('li')).toHaveLength(4);
    });

    it('shoud render five <Pagination.Item />', () => {
        wrapper.setProps({ recipesCount: 25 });
        expect(wrapper.find('li')).toHaveLength(5);
    });
})

