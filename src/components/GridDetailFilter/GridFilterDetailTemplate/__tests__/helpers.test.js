import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import queryString from 'query-string'
import {CALL_HISTORY_METHOD} from 'react-router-redux'
import {toggleDetailFilter, mapDispatch, mapState} from '../helpers'

const setup = storeData => {
    const mockStore = configureStore([thunk])(storeData);
    return {
        mockStore
    }
};

describe('GridFilterDetailTemplate', () => {
    describe('helpers', () => {
        it('should toggle detail filters', () => {
            const {mockStore} = setup({
                routing: {
                    location: {
                        pathname: 'http://localhost',
                        search: ''
                    }
                }
            });

            mockStore.dispatch(toggleDetailFilter('1'));

            expect(mockStore.getActions().length).toBe(1);
            expect(mockStore.getActions()[0].type).toBe(CALL_HISTORY_METHOD);
        });

        it('should map dispatch to toggle functions', () => {
            const {mockStore} = setup({
                routing: {
                    location: {
                        pathname: 'http://localhost',
                        search: ''
                    }
                }
            });
            const mockDispatch = mapDispatch(mockStore.dispatch);

            mockDispatch.showDetailFilter();

            expect(mockStore.getActions().length).toBe(1);
            expect(mockStore.getActions()[0].type).toBe(CALL_HISTORY_METHOD);
            expect(mockStore.getActions()[0].payload.args[0].search).toBe('withDetailFilter=1');

            mockDispatch.hideDetailFilter();

            expect(mockStore.getActions().length).toBe(2);
            expect(mockStore.getActions()[1].type).toBe(CALL_HISTORY_METHOD);
            expect(mockStore.getActions()[1].payload.args[0].search).toBe('withDetailFilter=0');
        });

        it('should map state to withDetailFilter prop false', () => {
            const search = queryString.stringify({withDetailFilter: '0'});
            const state = {
                routing: {
                    location: {
                        search
                    }
                }
            };
            const result = mapState(state);
            expect(result).toEqual({withDetailFilter: false});
        });

        it('should map state to withDetailFilter prop true', () => {
            const search = queryString.stringify({withDetailFilter: '1'});
            const state = {
                routing: {
                    location: {
                        search
                    }
                }
            };
            const result = mapState(state);
            expect(result).toEqual({withDetailFilter: true});
        });
    })
});