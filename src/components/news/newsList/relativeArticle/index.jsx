import React from 'react';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '@store/reduxMap';
import { matchReg, transformDateType } from '@components/news/common/newsCommon';
import style from './index.module.less';

//  右侧列表相关文章

export const RelativeArticle = ({
    data
}) => {
    //  console.log(data);
    return (
        <dd className={style.relativeItem}>
            <div className={style.imgBox}>
                <img src={data.img} className={style.img} alt=''/>
            </div>
            <div className={style.contentBox}>
                <p className={style.title}>{data.title}</p>
                <p className={style.date}>{transformDateType(data.publish_date)}</p>
            </div>
        </dd>
    );
};