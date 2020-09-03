import CSSModules from 'react-css-modules';
import React from 'react';
import style from './index.less';
import layout from '@css/layout.less';
import { stopPropagation } from '@utils/eventListener';

export const SiteInfo = CSSModules(
    ({
        isRelativelyWide,
        qrCodeShowIndex,
        qrCodeClick
    }) => (
        <div className={style.siteInfo}>
            <div className={`${style.siteInfoInner} ${layout.clearfix}`}>
                <div className={`${style.buttonGroups} ${layout.clearfix} ${isRelativelyWide ? layout.right : ''}`}>
                    <button className={`${style.button} ${layout.inlineBlock}`}
                            onClick={() => {qrCodeClick(0)}}
                            onBlur={() => {qrCodeClick(0, true)}}
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
                <div className={`${style.siteInfoMsg} ${isRelativelyWide ? layout.left : ''} `}>
                    Copyright 2020 地平线官网 粤ICP备17020905号
                </div>
            </div>
        </div>
    )
);

