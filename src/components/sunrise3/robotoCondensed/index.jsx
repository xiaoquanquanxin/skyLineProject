import React from 'react';
import style from './index.module.less';

export const RobotoCondensed = ({
    data
}) => {
    return (
        <li className={style.robotoCondensed}>
            <label className={style.label}>Effective AI performance</label>
            <div className={style.c}>
                <b className={style.b}>5</b>
                <span className={style.span}>TOPS</span>
            </div>
        </li>
    );
};

export const RobotoCondensedLine = ({
    data
}) => {
    return (
        <li className={style.robotoCondensedLine}>
            <div className={style.line}/>
        </li>
    );
};