//  Reducers 指定了应用状态的变化如何响应 actions 并发送到 store 的，
import { combineReducers } from 'redux';

import { REDUCER_BROWSER_INFO } from './browserInfo';
import { REDUCER_NEWS_TAB_BOX } from '@store/newsInfo';
import { REDUCER_ABOUT_US_MAP } from '@store/aboutUs';

const AppRedux = combineReducers({
    REDUCER_BROWSER_INFO,
    REDUCER_NEWS_TAB_BOX,
    REDUCER_ABOUT_US_MAP
});
export default AppRedux;

