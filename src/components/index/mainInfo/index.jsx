import React, { Component } from 'react';
import style from './index.module.less';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '@store/reduxMap';
import { isValidHTTPString } from '@utils/utils';

export const MainInfo = connect(
    mapStateToProps,
    mapDispatchToProps
)(
    CSSModules(
        ({
            //  信息
            info,
            //  文字的位置
            textPosition,
            //  浏览器信息，来源于redux
            REDUCER_BROWSER_INFO
        }) => {
            info = info || {};
            const { isRelativeWide } = REDUCER_BROWSER_INFO;
            if (!isRelativeWide) {
                info.video = null;
            }
            let extraClassName = '';
            switch (textPosition) {
                case 'left':
                    extraClassName = 'left';
                    break;
                case 'right':
                    break;
                default:
                    throw new Error(`错误的文字位置,${textPosition}`);
            }
            //  判断url对不对
            if (!isValidHTTPString(info.url)) {
                info.url = null;
            }
            return (
                <div className={`${style.container} ${style[extraClassName]}`}>
                    {info.video
                        ? <video className={style.bgVideo}
                                 src={info.video}
                                 autoPlay="autoplay" muted="muted" loop="loop" preload="auto" playsInline={true}
                                 webkit-playsinline="true" x5-video-player-type="h5"
                                 x5-video-orientation="portraint"
                                 x5-video-player-fullscreen="true"
                        />
                        : <img className={style.bgGif} alt={info.title} src={info.img}/>
                    }
                    <div className={style.content}>
                        <p className={style.title}
                           dangerouslySetInnerHTML={{ __html: info.title }}/>
                        <div className={style.description}>
                            {info.url
                                ? <a href={info.url}
                                     dangerouslySetInnerHTML={{ __html: info.desc }}/>
                                : <span
                                    dangerouslySetInnerHTML={{ __html: info.desc }}/>}
                        </div>
                    </div>
                </div>
            );
        }
    )
);