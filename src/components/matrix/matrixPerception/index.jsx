import React from 'react';
import style from './index.module.less';
import { Sunrise3basicTitleDesc } from '@components/sunrise3/sunrise3basicTitleDesc';

//  高性能图像感知能力
export const MatrixPerception = ({
    perceptionData
}) => {
    perceptionData = perceptionData || {};
    let list;
    if (perceptionData.list) {
        list = perceptionData.list.map((item, index) => {
            return (
                <MatrixPerceptionItem key={index} data={item}/>
            );
        });
    }
    return (
        <div className={style.perception}>
            <Sunrise3basicTitleDesc data={perceptionData} widthType={620}/>
            <ul className={style.suite}>{list}</ul>
            <div className={style.bottomDesc} style={{ backgroundImage: `url(${perceptionData.img})` }}/>
        </div>
    );
};
//  每一项
const MatrixPerceptionItem = ({
    data,
}) => {
    return (
        <li className={style.item}>
            <div className={style.imgCenter2} style={{ backgroundImage: `url(${data.img})` }}/>
            <p className={style.name} dangerouslySetInnerHTML={{ __html: data.name }}/>
            <div className={style.nameDesc} dangerouslySetInnerHTML={{ __html: data.nameDesc }}/>
        </li>
    );
};