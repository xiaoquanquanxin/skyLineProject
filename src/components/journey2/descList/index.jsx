
import React from 'react';
import style from './index.module.less';

export const DescList = ({
    data
}) => {
    if (!data) {
        return '';
    }

    const list = data.map((item, index) => {
        if (index > 0 && index % 2) {
            return (
                <li key={index} className={style.item}>
                    <div className={style.line}/>
                </li>

            );
        }
        return (
            <li key={index} className={style.item}>
                <label className={style.label}>运算功率</label>
                <div className={style.c}>
                    <b><s>2</s></b>
                    <span>w</span>
                </div>
            </li>
        );
    });
    return (
        <ul className={style.descUl}>
            {list}
        </ul>
    );
};
