import React from 'react';
import style from './index.module.less';

export const AboutUsBasic = ({
    aboutUsInfo
}) => {
    return (
        <div className={style.aboutUsBanner}>
            <div id="tab1"/>
            <div className={style.aboutUs} dangerouslySetInnerHTML={{ __html: aboutUsInfo && aboutUsInfo.desc }}/>
            <div className={style.aboutUsImgWrap}>
                <img className={style.img} src={aboutUsInfo && aboutUsInfo.img} alt=''/>
                <div className={style.text} dangerouslySetInnerHTML={{ __html: aboutUsInfo && aboutUsInfo.content }}/>
            </div>
        </div>
    );
};