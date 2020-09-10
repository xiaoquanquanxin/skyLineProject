
//  选中的index
export const ACTIVE_INDEX = 'ACTIVE_INDEX';

/**
 * 设置激活index
 * @param {number} activeIndex
 * */
export function setTabBoxActiveIndex(activeIndex){
    return { type: ACTIVE_INDEX, activeIndex };
}

//  关于的tab box
export function REDUCER_ABOUT_TAB_BOX(state = {
    //  默认激活0
    activeIndex: 0
}, action){
    const { type, activeIndex } = action;
    if (type === ACTIVE_INDEX) {
        return Object.assign({}, state, { activeIndex });
    }
    return state;
}