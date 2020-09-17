import React from 'react';
import style from './index.module.less';

//  四个一块的
export const FourBlocks = ({
    data,
    //  是浅色背景？
    isLight
}) => {
    let list;
    if (data && data.length) {
        list = data.map((item, index) => {
            return (
                <FourBlocksItem key={index} data={item}/>
            );
        });
    }
    return (
        <ul className={`${style.cdrb} ${isLight ? style.isLight : ''}`}>
            {list}
        </ul>
    );
};

//  每一项
const FourBlocksItem = ({
    data,
}) => {
    return (
        <li className={style.item}>
            <img className={style.imgCenter2} src={data.img} alt=""/>
            <p className={style.name}>{data.name}</p>
        </li>
    );
};