//  Reducers 指定了应用状态的变化如何响应 actions 并发送到 store 的，
import { combineReducers } from 'redux';

import { REDUCER_BROWSER_INFO } from './windowResize';

const AppRedux = combineReducers({
    REDUCER_BROWSER_INFO
});
export default AppRedux;

