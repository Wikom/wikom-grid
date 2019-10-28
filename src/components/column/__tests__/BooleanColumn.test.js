/**
 * Created by marvin.ruppelt on 22.09.17.
 */

import React from 'react'
import {mount, shallow} from 'enzyme'
import BooleanColumn from '../BooleanColumn'
import Symbol from '@wikom/react-symbol'

const trueString = 'ja';
const falseString = 'nein';
const nullString = 'unbekannt';
const defaultTrueLabel = shallow(<Symbol symbol="check-square-o"/>);
const defaultFalseLabel = shallow(<Symbol symbol="square-o"/>);
const defaultNullLabel = shallow(<Symbol symbol={{symbol: 'question', className: 'text-muted'}}/>);

describe('components', () => {
    describe('BooleanColumn', () => {
        it('should render boolean from string ("true", "false")', () => {
            const falseRowData = {
                id: 1,
                foo: 'false'
            };

            const falseCol = mount(<table>
                <tbody>
                <tr>
                    <BooleanColumn name="" rowData={falseRowData} idx="foo" trueLabel="ja" falseLabel="nein"/>
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
                    <BooleanColumn name="" rowData={trueRowData} idx="foo" trueLabel="ja" falseLabel="nein"/>
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
                    <BooleanColumn name="" rowData={falseRowData} idx="foo" trueLabel="ja" falseLabel="nein"/>
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
                    <BooleanColumn name="" rowData={trueRowData} idx="foo" trueLabel="ja" falseLabel="nein"/>
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
                    <BooleanColumn name="" rowData={falseRowData} idx="foo" trueLabel="ja" falseLabel="nein"/>
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
                    <BooleanColumn name="" rowData={trueRowData} idx="foo" trueLabel="ja" falseLabel="nein"/>
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
                    <BooleanColumn name="" rowData={falseRowData} idx="foo" trueLabel="ja" falseLabel="nein"/>
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
                    <BooleanColumn name="" rowData={trueRowData} idx="foo" trueLabel="ja" falseLabel="nein"/>
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
                    <BooleanColumn name="" rowData={falseRowData} idx="foo"/>
                </tr>
                </tbody>
            </table>);
            expect(falseCol.find('td').find('i').html()).toBe(defaultFalseLabel.html());

            const trueRowData = {
                id: 1,
                foo: 'j'
            };

            const trueCol = mount(<table>
                <tbody>
                <tr>
                    <BooleanColumn name="" rowData={trueRowData} idx="foo"/>
                </tr>
                </tbody>
            </table>);
            expect(trueCol.find('td').find('i').html()).toBe(defaultTrueLabel.html());
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
                        <BooleanColumn name="" rowData={falseRowData} idx="foo" trueLabel="ja" falseLabel="nein" nullLabel="unbekannt" withNull={true}/>
                    </tr>
                    </tbody>
                </table>
            );
            expect(falseCol.find('td').text()).toBe(nullString);

            const trueRowData = {
                id: 1,
                foo: '-1'
            };

            const trueCol = mount(
                <table>
                    <tbody>
                    <tr>
                        <BooleanColumn name="" rowData={trueRowData} idx="foo" trueLabel="ja" falseLabel="nein" nullLabel="unbekannt" withNull={true}/>
                    </tr>
                    </tbody>
                </table>
            );
            expect(trueCol.find('td').text()).toBe(nullString);
        });

    });
});