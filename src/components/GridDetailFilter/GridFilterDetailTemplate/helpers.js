import {replace} from 'react-router-redux'
import queryString from 'query-string'

export const mapState = ({routing: {location: {search}}}) => ({
    withDetailFilter: queryString.parse(search).withDetailFilter === '1'
});

export const toggleDetailFilter = withDetailFilter => (dispatch, getState) => {
    const location = getState().routing.location;
    const url = location.pathname;
    const queryParams = queryString.parse(location.search);

    queryParams.withDetailFilter = withDetailFilter;

    return dispatch(replace({pathname: url, search: queryString.stringify(queryParams)}))
};

export const mapDispatch = dispatch => ({
    showDetailFilter: () => dispatch(toggleDetailFilter('1')),
    hideDetailFilter: () => dispatch(toggleDetailFilter('0'))
});
