/**
 * Created by marvin.ruppelt on 22.09.17.
 */

import React from 'react'
import {mount} from 'enzyme'
import BoolColumn from '../BoolColumn'
import Symbol from 'react-symbol'

const trueString = 'ja';
const falseString = 'nein';
const trueSymbol = mount(<Symbol symbol={{symbol: "check", className: "text-success"}}/>);
const falseSymbol = mount(<Symbol symbol={{symbol: "times", className: "text-danger"}}/>);

describe('components', () => {
    describe('BoolColumn', () => {
        it('should render boolean from string ("true", "false")', () => {
            const falseRowData = {
                id: 1,
                foo: 'false'
            };

            const falseCol = mount(<table>
                <tbody>
                <tr>
                    <BoolColumn name="" rowData={falseRowData} idx="foo" type="string"/>
                </tr>
                </tbody>
            </table>);
            expect(falseCol.find('td').text()).toBe(falseString);

            const trueRowData = {
                id: 1,
                foo: 'true'
            };

            const trueCol = mount(<table>
                <tbody>
                <tr>
                    <BoolColumn name="" rowData={trueRowData} idx="foo" type="string"/>
                </tr>
                </tbody>
            </table>);
            expect(trueCol.find('td').text()).toBe(trueString);
        });


        it('should render boolean from bool (true, false)', () => {
            const falseRowData = {
                id: 1,
                foo: false
            };

            const falseCol = mount(<table>
                <tbody>
                <tr>
                    <BoolColumn name="" rowData={falseRowData} idx="foo" type="string"/>
                </tr>
                </tbody>
            </table>);
            expect(falseCol.find('td').text()).toBe(falseString);

            const trueRowData = {
                id: 1,
                foo: true
            };

            const trueCol = mount(<table>
                <tbody>
                <tr>
                    <BoolColumn name="" rowData={trueRowData} idx="foo" type="string"/>
                </tr>
                </tbody>
            </table>);
            expect(trueCol.find('td').text()).toBe(trueString);
        });


        it('should render boolean from int (0, 1)', () => {
            const falseRowData = {
                id: 1,
                foo: 0
            };

            const falseCol = mount(<table>
                <tbody>
                <tr>
                    <BoolColumn name="" rowData={falseRowData} idx="foo" type="string"/>
                </tr>
                </tbody>
            </table>);
            expect(falseCol.find('td').text()).toBe(falseString);

            const trueRowData = {
                id: 1,
                foo: 1
            };

            const trueCol = mount(<table>
                <tbody>
                <tr>
                    <BoolColumn name="" rowData={trueRowData} idx="foo" type="string"/>
                </tr>
                </tbody>
            </table>);
            expect(trueCol.find('td').text()).toBe(trueString);
        });


        it('should render boolean from string ("n", "j")', () => {
            const falseRowData = {
                id: 1,
                foo: 'n'
            };

            const falseCol = mount(<table>
                <tbody>
                <tr>
                    <BoolColumn name="" rowData={falseRowData} idx="foo" type="string"/>
                </tr>
                </tbody>
            </table>);
            expect(falseCol.find('td').text()).toBe(falseString);

            const trueRowData = {
                id: 1,
                foo: 'j'
            };

            const trueCol = mount(<table>
                <tbody>
                <tr>
                    <BoolColumn name="" rowData={trueRowData} idx="foo" type="string"/>
                </tr>
                </tbody>
            </table>);
            expect(trueCol.find('td').text()).toBe(trueString);
        });


        it('should render symbol boolean', () => {
            const falseRowData = {
                id: 1,
                foo: 'n'
            };

            const falseCol = mount(<table>
                <tbody>
                <tr>
                    <BoolColumn name="" rowData={falseRowData} idx="foo"/>
                </tr>
                </tbody>
            </table>);
            expect(falseCol.find('td').find('i').html()).toBe(falseSymbol.html());

            const trueRowData = {
                id: 1,
                foo: 'j'
            };

            const trueCol = mount(<table>
                <tbody>
                <tr>
                    <BoolColumn name="" rowData={trueRowData} idx="foo"/>
                </tr>
                </tbody>
            </table>);
            expect(trueCol.find('td').find('i').html()).toBe(trueSymbol.html());
        });

        it('should render boolean null values from string ("n", "j")', () => {
            const falseRowData = {
                id: 1,
                foo: null
            };

            const falseCol = mount(
                <table>
                    <tbody>
                    <tr>
                        <BoolColumn name="" rowData={falseRowData} idx="foo" type="string" withNull={true}/>
                    </tr>
                    </tbody>
                </table>
            );
            expect(falseCol.find('td').text()).toBe('');

            const trueRowData = {
                id: 1,
                foo: '-1'
            };

            const trueCol = mount(
                <table>
                    <tbody>
                    <tr>
                        <BoolColumn name="" rowData={trueRowData} idx="foo" withNull={true}/>
                    </tr>
                    </tbody>
                </table>
            );
            expect(trueCol.find('td').text()).toBe('');
        });

    });
});