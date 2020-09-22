import React from 'react';
import style from './index.module.less';
import layout from '@css/layout.module.less';
import { BasicTitleDesc } from '@components/basicTitleDesc';

//  应用场景
export const NavinetApplyScene = ({
    nasData
}) => {
    nasData = nasData || {};
    let list;
    if (nasData.list) {
        list = nasData.list.map((item, index) => {
            return (
                <NASItem key={index} data={item}/>
            );
        });
    }
    return (
        <div className={style.applyScene}>
            <BasicTitleDesc data={nasData} isLight={true}/>
            <ul className={style.list}>
                {list}
            </ul>
        </div>
    );
};

const NASItem = ({ data }) => {
    return (
        <li className={style.item}>
            <div className={`${layout.imgCenter2} ${style.imgCenter2}`}
                 style={{ backgroundImage: `url(${data.img || '' })` }}/>
                <p className={style.name} dangerouslySetInnerHTML={{ __html: data.title }}/>
            <div className={style.desc} dangerouslySetInnerHTML={{ __html: data.desc }}/>
        </li>
    );
};