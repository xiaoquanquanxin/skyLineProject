import React from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from '@store/reduxMap';
import sliderItemStyle from '../sliderItem.module.less';
import style from './index.module.less';
import './index.less';
import { isValidHTTPString, isValidResourceString } from '@utils/utils';

//  轮播每一项
export const AboutBannerSliderItem = connect(
    mapStateToProps
)(({
        data,
        REDUCER_BROWSER_INFO,
    }) => {
        const { isRelativeWide } = REDUCER_BROWSER_INFO;
        //  如果不是合法视频地址
        if (!isValidHTTPString(data.video) && !isValidResourceString(data.video)) {
            data.video = null;
        }
        return (
            <div className={`${sliderItemStyle.bannerSlider} ${style.bannerSlider}`}>
                {
                    (data.video && isRelativeWide)
                        ?
                        <video autoPlay='autoplay' muted='muted' loop='loop' preload='auto' playsInline={true}
                               webkit-playsinline='true' x5-video-player-type='h5' x5-video-orientation='portraint'
                               x5-video-player-fullscreen='true'
                               src={data.video} className={style.sliderItemVideo}/>
                        : <img className={style.sliderItemImg} src={data.img} alt={data.title || ''}/>
                }
                <p className={style.sliderTitle}>{data.title}</p>
            </div>
        );
    }
);