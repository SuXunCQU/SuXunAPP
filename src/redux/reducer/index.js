import {combineReducers} from 'redux';
import theme from './theme';
import joinedList from './joinedList';
import taskItem from './taskItem';

/**
 * 1. 合并reducer
 */
const index = combineReducers({
    theme: theme,
    joinedList: joinedList,
    taskItem: taskItem,
});
export default index;
