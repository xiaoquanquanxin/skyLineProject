import React from 'react';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '@store/reduxMap';
import { matchReg, transformDateType } from '@components/news/common/newsCommon';
import style from './index.module.less';
//  每一项
export const MainListItem = connect(
    mapStateToProps,
    mapDispatchToProps
)(({
    data,
    REDUCER_ABOUT_TAB_BOX,
}) => {
    const { newsCategoryDataMap } = REDUCER_ABOUT_TAB_BOX;
    if (newsCategoryDataMap === null) {
        return '';
    }
    const categoryData = newsCategoryDataMap[data.category_id];
    //  console.log(newsCategoryDataMap[data.category_id].img);
    return (
        <li key={data.id} className={style.mainListItem}>
            <div className={style.imgBox}>
                <img src={data.img} className={style.mainImg} alt={data.span}/>
                <div className={style.belongType}>
                    <img src={categoryData.img} className={style.belongTypeImg}
                         alt={data.span}/>
                    <span className={style.span}>{categoryData.name || ''}</span>
                </div>
            </div>
            <div className={style.titleDateDesc}>
                <p className={style.title}>{data.title}</p>
                <p className={style.date}>{transformDateType(data.publish_date)}</p>
                <div className={style.desc}>
                    {'⚠️这个不对' + matchReg(data.content) + '...'}
                </div>
            </div>
        </li>
    );
});