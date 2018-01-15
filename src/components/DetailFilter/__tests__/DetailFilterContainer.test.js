import queryString from 'query-string'
import {mapState} from '../DetailFilterContainer'

describe('DetailFilterContainer', () => {
    it('should map query param 1 from location to prop withDetailFilter', () => {
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

    it('should map query param 0 from location to prop withDetailFilter', () => {
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

    it('should map query without param from location to prop withDetailFilter', () => {
        const search = queryString.stringify({foo: 'bar'});
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
});