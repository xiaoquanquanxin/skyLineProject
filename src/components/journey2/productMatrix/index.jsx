import React from 'react';
import style from './index.module.less';
//  地平线智能驾驶产品矩阵
export const ProductMatrix = ({
    data
}) => {
    data = data || {};
    return (
        <div className={style.productMatrix}>
            <div className={style.productMatrixIn}>
                <p className={style.title}>{data.title}</p>
                <div className={style.desc}>{data.desc}</div>
                <img className={style.img} src={data.img} alt=''/>
            </div>
        </div>
    );
};