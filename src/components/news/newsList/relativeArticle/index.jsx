import React from 'react';
import { transformDateType } from '@utils/utils';
import style from './index.module.less';

//  右侧列表相关文章

export const RelativeArticle = ({
    data
}) => {
    //  console.log(data);
    return (
        <dd className={style.relativeItem}>
            <div className={style.relativeItemInner}>
                <div className={style.imgBox}>
                    <img src={data.thumb} className={style.img} alt=''/>
                </div>
                <div className={style.contentBox}>
                    <p className={style.title}>{data.title}</p>
                    <p className={style.date}>{transformDateType(data.publish_date)}</p>
                </div>
            </div>
        </dd>
    );
};
