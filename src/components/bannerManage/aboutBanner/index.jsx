import React from 'react';
import style from './index.module.less';
import './index.less';
//  关于我们，轮播每一项
export const AboutBannerSliderItem = ({
    data
}) => {
    return (
        <div className={style.bannerSlider}>
            <img className={style.bannerImg} src={data.img} alt={data.title || ''}/>
            <p className={style.bannerTitle}>{data.title}</p>
        </div>
    );
};