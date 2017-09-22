/**
 * Created by marvin.ruppelt on 22.09.17.
 */

import React from 'react'
import {mount} from 'enzyme'
import BoolColumn from '../BoolColumn'
import configureStore from 'redux-mock-store'
import Symbol from 'react-symbol'

const trueString  = 'ja';
const falseString = 'nein';
const trueSymbol  = mount(<Symbol symbol={{symbol: "check", className: "text-success"}}/>);
const falseSymbol = mount(<Symbol symbol={{symbol: "times", className: "text-danger"}}/>);

describe('components', () => {
    describe('BoolColumn', () => {
        it('should render boolean from string ("true", "false")', () => {
            const falseRowData = {
                id: 1,
                foo: 'false'
            };

            const falseCol = mount(<BoolColumn name="" rowData={falseRowData} idx="foo" type="string" />);
            expect(falseCol.find('td').text()).toBe(falseString);

            const trueRowData = {
                id: 1,
                foo: 'true'
            };

            const trueCol = mount(<BoolColumn name="" rowData={trueRowData} idx="foo" type="string" />);
            expect(trueCol.find('td').text()).toBe(trueString);
        });


        it('should render boolean from bool (true, false)', () => {
            const falseRowData = {
                id: 1,
                foo: false
            };

            const falseCol = mount(<BoolColumn name="" rowData={falseRowData} idx="foo" type="string" />);
            expect(falseCol.find('td').text()).toBe(falseString);

            const trueRowData = {
                id: 1,
                foo: true
            };

            const trueCol = mount(<BoolColumn name="" rowData={trueRowData} idx="foo" type="string" />);
            expect(trueCol.find('td').text()).toBe(trueString);
        });


        it('should render boolean from int (0, 1)', () => {
            const falseRowData = {
                id: 1,
                foo: 0
            };

            const falseCol = mount(<BoolColumn name="" rowData={falseRowData} idx="foo" type="string" />);
            expect(falseCol.find('td').text()).toBe(falseString);

            const trueRowData = {
                id: 1,
                foo: 1
            };

            const trueCol = mount(<BoolColumn name="" rowData={trueRowData} idx="foo" type="string" />);
            expect(trueCol.find('td').text()).toBe(trueString);
        });


        it('should render boolean from string ("n", "j")', () => {
            const falseRowData = {
                id: 1,
                foo: 'n'
            };

            const falseCol = mount(<BoolColumn name="" rowData={falseRowData} idx="foo" type="string" />);
            expect(falseCol.find('td').text()).toBe(falseString);

            const trueRowData = {
                id: 1,
                foo: 'j'
            };

            const trueCol = mount(<BoolColumn name="" rowData={trueRowData} idx="foo" type="string" />);
            expect(trueCol.find('td').text()).toBe(trueString);
        });


        it('should render symbol boolean', () => {
            const falseRowData = {
                id: 1,
                foo: 'n'
            };

            const falseCol = mount(<BoolColumn name="" rowData={falseRowData} idx="foo" />);
            expect(falseCol.find('td').find('i').html()).toBe(falseSymbol.html());

            const trueRowData = {
                id: 1,
                foo: 'j'
            };

            const trueCol = mount(<BoolColumn name="" rowData={trueRowData} idx="foo" />);
            expect(trueCol.find('td').find('i').html()).toBe(trueSymbol.html());
        });


    });
});