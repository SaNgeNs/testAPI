import { combineReducers } from 'redux';
import list from './list';
import links from './links';

export default combineReducers({
  list,
  links,
});
