import React from 'react';
import style from './index.module.less';
import layout from '@css/layout.module.less';
import { BasicTitleDesc } from '@components/basicTitleDesc';

//  特色与优势
export const Advantages = ({
    advantagesData
}) => {
    advantagesData = advantagesData || {};
    let list;
    if (advantagesData.list) {
        list = advantagesData.list.map((item, index) => {
            return (
                <AdvantagesItem key={index} data={item}/>
            );
        });
    }
    return (
        <div className={style.advantages}>
            <div className={style.advantagesIn}>
                <BasicTitleDesc data={advantagesData} isLight={true}/>
                <ul className={`${style.list} ${layout.clearfix}`}>
                    {list}
                </ul>
            </div>
        </div>
    );
};

//  每一项
const AdvantagesItem = ({
    data,
}) => {

    return (
        <li className={style.item}>
            <div className={style.imgBox}>
                <img src={data.img} alt='' style={style.img}/>
            </div>
            <p className={style.title} dangerouslySetInnerHTML={{ __html: data.title }}/>
            <div className={style.desc} dangerouslySetInnerHTML={{ __html: data.desc }}/>
        </li>
    );
};