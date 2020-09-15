//  是否打开form表单
export const POP_FORM_IS_OPEN = 'POP_FORM_IS_OPEN';

/**
 * 是否打开form表单
 * @param {boolean} popFormIsOpen
 * */
export function setPopFormOpenStatus(popFormIsOpen){
    return { type: POP_FORM_IS_OPEN, popFormIsOpen };
}

//  form表单提交
export function REDUCER_POP_FORM(state = {}, action){
    const { type, popFormIsOpen } = action;
    switch (type) {
        case POP_FORM_IS_OPEN:
            return Object.assign({}, state, { popFormIsOpen });
        default:
            return state;
    }
}