import React from 'react';
import style from './index.module.less';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '@store/reduxMap';

//  视频播放器
export const VideoWrap = connect(
    mapStateToProps,
    mapDispatchToProps
)(({
    REDUCER_VIDEO,
    setVideoOpenStatus,
}) => {
    const { videoIsOpen } = REDUCER_VIDEO;
    return (
        <div className={style.popVideoWrap} style={{ display: videoIsOpen ? 'flex' : 'none' }}>
            <div className={style.popVideoMain}>
                <video autoPlay="autoplay" preload="auto" controls="controls" playsInline={true}
                       webkit-playsinline="true"
                       x5-video-player-type="h5" x5-video-orientation="portraint"
                       x5-video-player-fullscreen="true"
                       src="http://horizon.wx.h5work.com/upload/202009/04/781851599220146.mp4"
                       className={style.popVideo}
                />
                <div className={style.iconClose} onClick={() => {setVideoOpenStatus(false);}}/>
            </div>
        </div>
    );
});