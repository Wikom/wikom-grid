import {connect} from 'react-redux'
import GridFilterDetailTemplateComponent from './GridFilterDetailTemplateComponent'
import {mapState, mapDispatch} from './helpers'

const GridFilterDetailTemplateContainer = connect(mapState, mapDispatch)(GridFilterDetailTemplateComponent);

export default GridFilterDetailTemplateContainer