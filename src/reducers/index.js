import { combineReducers } from 'redux';
import dreams from './dreams';
import users from './users';

export default combineReducers({
    dreams,
    users
});