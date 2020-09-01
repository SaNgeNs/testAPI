import withErrorHandler from 'Components/withErrorHandler';
import loadable from '@loadable/component';
import { withRouter } from 'react-router-dom';

const List = loadable(() => import(/* webpackChunkName: "list_component" */'./List'));

export default withRouter(withErrorHandler(List));
