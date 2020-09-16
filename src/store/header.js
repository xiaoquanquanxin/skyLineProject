//  头部信息
//  数据
export const NAV_LIST_DATA = 'NAV_LIST_DATA';

//  设置头部数据
export const setNavListData = (navListData) => {
    return { type: NAV_LIST_DATA, navListData };
};

export function REDUCER_HEADER_DATA(state = {
    //  刚开始没数据
    navListData: null,
}, action){
    const { type, navListData } = action;
    switch (type) {
        case NAV_LIST_DATA:
            Object.assign({}, state, { navListData });
            break;
        default:
            return state;
    }
}