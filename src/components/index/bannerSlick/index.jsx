import React from 'react';
import { Slick } from '@components/slick';
import style from './index.module.less';
import { isValidHTTPString, isValidResourceString } from '@utils/utils';
import { preventDefaultFn } from '@utils/eventListener';

//  slick的最内部展示组件
export const BannerSlider = ({
    //  视频
    video,
    //  图片地址
    img,
    //  title
    title,
    //  描述
    desc,
    //  链接
    url,
}) => {
    //  如果不是合法视频地址
    if (!isValidHTTPString(video) && !isValidResourceString(video)) {
        video = null;
    }
    //  如果不是合法链接
    if (!isValidHTTPString(url)) {
        url = null;
    }

    return (
        <div>
            {/*视频优先*/}
            {video ?
                <video autoPlay='autoplay' muted='muted' loop='loop' preload='auto' playsInline={true}
                       webkit-playsinline='true' x5-video-player-type='h5' x5-video-orientation='portraint'
                       x5-video-player-fullscreen='true'
                       src={video} className={style.sliderItemVideo}/>
                :
                <img src={img} alt={desc} className={style.sliderItemImg}/>
            }
            <div className={style.sliderItemText}>
                <p className={style.title}>{title}</p>
                <div className={style.description}>{desc}</div>
            </div>
            {/*全局遮罩，放置拖拽*/}
            {url ? <a href={url} onDragStart={preventDefaultFn} className={style.link}/> : <span
                className={style.link}/>}
        </div>
    );
};

//  本组件暴露
export const BannerSlick = ({
    swiperData
}) => {
    return (
        <div className={style.bannerSlick}>
            <div className={style.container}>
                <Slick swiperData={swiperData}
                       sliderItemType={1}
                />
            </div>
        </div>
    );
};
