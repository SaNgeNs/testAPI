import { withRouter } from 'react-router-dom';
import withErrorHandler from 'Components/withErrorHandler';
import Main from './Main';

export default withRouter(withErrorHandler(Main));
