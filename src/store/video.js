//  是否打开播放器
export const VIDEO_IS_OPEN = 'VIDEO_IS_OPEN';

/**
 * 是否打开播放器
 * @param {boolean} videoIsOpen
 * */
export function setVideoOpenStatus(videoIsOpen){
    return { type: VIDEO_IS_OPEN, videoIsOpen };
}

//  播放器
export function REDUCER_VIDEO(state = {}, action){
    const { type, videoIsOpen } = action;
    switch (type) {
        case VIDEO_IS_OPEN:
            return Object.assign({}, state, { videoIsOpen });
        default:
            return state;
    }
}