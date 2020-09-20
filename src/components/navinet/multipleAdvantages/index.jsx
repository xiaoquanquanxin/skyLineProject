import React from 'react';
import style from './index.module.less';
import { BasicTitleDesc } from '@components/basicTitleDesc';

//  方案优势
export const MultipleAdvantages = ({
    maData
}) => {
    maData = maData || {};
    const { maDataNormal, maDataHover } = maData;
    if (!maDataNormal) {
        return '';
    }
    const list = maDataNormal.map((item, index) => {
        const hoverData = maDataHover[index];
        return (
            <li className={style.item} key={index}
                style={{ backgroundImage: `url(${item.img})` }}>
                <div className={style.thumb}
                     style={{ backgroundImage: `url(${hoverData.img})` }}>
                    <p className={style.name} dangerouslySetInnerHTML={{ __html: item.title }}/>
                    <div className={style.desc} dangerouslySetInnerHTML={{ __html: hoverData.desc }}/>
                </div>
            </li>
        );
    });
    return (
        <div className={style.multipleAdvantages}>
            <div className={style.multipleAdvantagesIn}>
                <BasicTitleDesc data={{ title: '方案优势' }} isLight={true}/>
                <ul className={style.list}>
                    {list}
                </ul>
            </div>
        </div>
    );
};