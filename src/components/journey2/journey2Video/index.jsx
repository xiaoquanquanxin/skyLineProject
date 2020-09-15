import React from 'react';
import style from './index.module.less';
import { requestGetBannerByType } from '@api/index';
import { VideoWrap } from '@components/video';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '@store/reduxMap';

export const Journey2Video = connect(
    mapStateToProps,
    mapDispatchToProps
)(
    class extends React.Component {
        constructor(props){
            super(props);
            this.state = {
                videoData: null,
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
            this.props.setVideoOpenStatus(true);
        }

        render(){
            const { videoData } = this.state;
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
                        <VideoWrap/>
                    </div>
                </div>
            );
        }
    }
);