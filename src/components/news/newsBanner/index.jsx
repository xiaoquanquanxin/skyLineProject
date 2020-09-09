import React from 'react';
import style from './index.module.less';

export const NewsBanner = ({
    //  数据
    bannerData,
}) => {
    if (!bannerData) {
        return '';
    }
    return (
        <div className={style.banner}>
            <img className={style.img}
                 src={bannerData.img} alt={bannerData.title}
            />
            <p className={style.title}>{bannerData.title}</p>
        </div>
    );
};