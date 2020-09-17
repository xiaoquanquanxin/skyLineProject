import React from 'react';
import style from './index.module.less';

export const Sunrise3basicTitleDesc = ({
    data,
}) => {
    return (
        <div className={style.sunrise3basicTitleDesc}>
            <p className={style.title} dangerouslySetInnerHTML={{ __html: data.title }}/>
            <div className={style.desc} dangerouslySetInnerHTML={{ __html: data.desc }}/>
        </div>
    );
};