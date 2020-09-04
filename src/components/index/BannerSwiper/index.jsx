import React from 'react';
import CSSModules from 'react-css-modules';
import style from './index.less';

export const BannerSwiper = CSSModules(
    ({swiperData}) => {
        console.log(swiperData);
        return (
            <div className={style.bannerSwiper}>fmjaeiwfa[w</div>
        );
    }
);

