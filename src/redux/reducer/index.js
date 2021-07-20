import {combineReducers} from 'redux';
import theme from './theme';
import joinedList from './joinedList';
import recruitList from './recruitList';
import taskItem from './taskItem';
import user from './user';

/**
 * 1. 合并reducer
 */
const index = combineReducers({
    theme,
    joinedList,
    recruitList,
    taskItem,
    user,
});

export default index;
