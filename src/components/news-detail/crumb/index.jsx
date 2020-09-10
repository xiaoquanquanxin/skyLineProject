import React from 'react';
import style from './index.module.less';

export const Crumb = ({
    a,
}) => {
    return (
        <div className={style.crumb}>
            <a href="./news.html" className={style.link}>新闻中心</a>
            <span className={style.arrows}>&gt;</span>
            <a href='./news.html' className={style.subLink}>生态合作</a>
            <span className={style.arrows}>&gt;</span>
            <span className={style.arrows} style={{ marginLeft: 0 }}>地平线再度赋能小米打造多款智能设备</span>
        </div>
    );
};