import React from 'react';
import style from './index.module.less';
import { requestGetBannerByType } from '@api/index';

export const Journey2Video = class extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            videoData: null,
            //  视频是否播放
            videoDisplay: false
        };
    }

    componentDidMount(){
        const { videoType } = this.props;
        requestGetBannerByType(videoType)
            .then(v => {
                const videoData = v.data[0];
                if (!videoData) {
                    throw new Error(`requestGetBannerByType 请求有误 ${videoData}`);
                }
                this.setState(() => {
                    return {
                        videoData,
                    };
                });
            });
    }

    //  点击播放
    playAndStopClick(){
        const { videoDisplay } = this.state;
        this.setState(() => {
            return {
                videoDisplay: !videoDisplay
            };
        });
    }

    render(){
        const { videoData, videoDisplay } = this.state;
        if (!videoData) {
            return '';
        }
        return (
            <div className={style.videoShow}>
                <div className={style.videoBox}>
                    <p className={style.videoTitle}>视频展示</p>
                    <div className={style.videoCover} style={{ backgroundImage: `url(${videoData.img})` }}
                         onClick={() => {this.playAndStopClick();}}
                    />
                    <p className={style.videoSTitle}>基于征程2 的单目前视解决方案（ADAS）</p>
                </div>
                {/*播放器，fixed定位*/}
                <div className={style.popVideoWrap} style={{ display: videoDisplay ? 'flex' : 'none' }}>
                    <div className={style.popVideoMain}>
                        <video autoPlay="autoplay" preload="auto" controls="controls" playsInline={true}
                               webkit-playsinline="true"
                               x5-video-player-type="h5" x5-video-orientation="portraint"
                               x5-video-player-fullscreen="true"
                               src="http://horizon.wx.h5work.com/upload/202009/04/781851599220146.mp4"
                               className={style.popVideo}
                        />
                        <div className={style.iconClose} onClick={() => {this.playAndStopClick();}}/>
                    </div>
                </div>
            </div>
        );
    }
};