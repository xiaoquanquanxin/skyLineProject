import { BASIC_COMPARE_WIDTH } from '@utils/constant';
//  浏览器宽度够宽
export const IS_RELATIVE_WIDE = 'IS_RELATIVE_WIDE';

/**
 * 设置宽度
 * @param {boolean} isRelativeWide 是够宽
 * */
export function setRelativeWide(isRelativeWide){
    return { type: IS_RELATIVE_WIDE, isRelativeWide };
}

//  浏览器信息
export function REDUCER_BROWSER_INFO(state = {
    isRelativeWide: window.innerWidth > BASIC_COMPARE_WIDTH
}, action){
    const { type, isRelativeWide } = action;
    if (type === IS_RELATIVE_WIDE) {
//        console.log(type, isRelativeWide);
//        console.log(Object.assign({}, state, { isRelativeWide }));
        return Object.assign({}, state, { isRelativeWide });
    }
    return state;
}