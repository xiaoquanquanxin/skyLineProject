//  Reducers 指定了应用状态的变化如何响应 actions 并发送到 store 的，
import { combineReducers } from 'redux';

import { REDUCER_BROWSER_INFO } from './windowResize';
import { REDUCER_ABOUT_TAB_BOX } from '@store/newsInfo';

const AppRedux = combineReducers({
    REDUCER_BROWSER_INFO,
    REDUCER_ABOUT_TAB_BOX
});
export default AppRedux;

