import React from 'react';
import CSSModules from 'react-css-modules';
import style from './index.less';
import BasicBannerGif from '@images/basicBanner/basic-banner.gif';
import BasicBannerMp4 from '@images/basicBanner/basic-banner.mp4';
//  脚部信息
export const BasicBanner = CSSModules(
    function ({ xx }){
        return (
            <div className={style.basicBanner}>
                <img src={BasicBannerGif}
                     className={style.basicBannerGif}/>
                <div className={style.theTitle}>
                    <h1 >AI 赋能万物 共创智能未来</h1>
                    <p className="desc">AI on Horizon, Journey Together</p>
                </div>
            </div>
        );
    }, style, { allowMultiple: true });
