import React from 'react';
import style from './index.module.less';

//  四个一块的
export const Journey2cdrb = ({
    data,
}) => {
    let list;
    if (data && data.length) {
        list = data.map((item, index) => {
            return (
                <Journey2cdrbItem key={index} data={item}/>
            );
        });
    }
    return (
        <ul className={style.cdrb}>
            {list}
        </ul>
    );
};

//  每一项
const Journey2cdrbItem = ({
    data,
}) => {
    return (
        <li className={style.item}>
            <img className={style.imgCenter2} src={data.img} alt=""/>
            <p className={style.name}>{data.name}</p>
        </li>
    );
};