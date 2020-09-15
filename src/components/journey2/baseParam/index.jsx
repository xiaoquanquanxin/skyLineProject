import React from 'react';
import style from './index.module.less';

export const BaseParam = ({
    data
}) => {
    let list;
    if (data && data.list && data.list.length) {
        list = data.list.map((item, index) => {
            return (
                <BaseParamItem data={item} key={index}/>
            );
        });
    }
    return (
        <div className={style.baseParam}>
            <div className={style.baseParamIn}>
                <p className={style.baseParamTitle}>{data.title}</p>
                <ul className={style.baseParamList}>
                    {list}
                </ul>
            </div>
        </div>
    );
};

const BaseParamItem = ({
    data,
}) => {
    return (
        <li className={style.baseParamItem}>
            <label className={style.label}>{data.label}</label>
            <div className={style.c} dangerouslySetInnerHTML={{ __html: data.desc }}/>
        </li>
    );
};