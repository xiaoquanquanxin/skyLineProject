import React from 'react';
import style from './index.module.less';
import layout from '@css/layout.module.less';
import { stopPropagation } from '@utils/eventListener';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '@store/reduxMap';

export const SiteInfo = connect(
    mapStateToProps,
    mapDispatchToProps
)(
    ({
        qrCodeShowIndex,
        qrCodeClick,
        //  获取浏览器信息，来源于redux
        REDUCER_BROWSER_INFO,
    }) => {
        //  浏览器足够宽
        const { isRelativeWide } = REDUCER_BROWSER_INFO;
        return (
            <div className={style.siteInfo}>
                <div className={`${style.siteInfoInner} ${layout.clearfix}`}>
                    <div
                        className={`${style.buttonGroups} ${layout.clearfix} ${isRelativeWide ? layout.right : ''}`}>
                        <button className={`${style.button} ${layout.inlineBlock}`}
                                onClick={() => {qrCodeClick(0);}}
                                onBlur={() => {qrCodeClick(0, true);}}
                        >
                            <div className={style.icon}/>
                            <span>地平线官微</span>
                            <img src={require('@media/basicFooter/QrCodeOfficialWeChat.jpg')}
                                 alt='地平线官微' onClick={(e) => stopPropagation(e)}
                                 className={`${style.qrCode} ${qrCodeShowIndex === 0 ? layout.block : layout.none}`}/>
                        </button>
                        <button className={`${style.button} ${layout.inlineBlock}`}
                                onClick={() => {qrCodeClick(1,);}}
                                onBlur={() => {qrCodeClick(1, true);}}
                        >
                            <div className={style.icon}/>
                            <span>地平线招聘号</span>
                            <img src={require('@media/basicFooter/QrCodeRecruitment.jpg')}
                                 alt='地平线招聘号' onClick={(e) => stopPropagation(e)}
                                 className={`${style.qrCode} ${qrCodeShowIndex === 1 ? layout.block : layout.none}`}/>
                        </button>
                    </div>
                    <div className={`${style.siteInfoMsg} ${isRelativeWide ? layout.left : ''} `}>
                        Copyright © 2019-2020 地平线官网 粤ICP备17098896号-1
                    </div>
                </div>
            </div>
        );
    }
);