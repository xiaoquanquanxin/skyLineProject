import React from 'react';
import style from './index.module.less';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '@store/reduxMap';

export const Crumb = connect(
    mapStateToProps,
    mapDispatchToProps,
)(
    ({ REDUCER_ABOUT_TAB_BOX, mainData }) => {
        const { newsCategoryDataMap } = REDUCER_ABOUT_TAB_BOX;
        //  redux里有数据 并且数据请求拿到了
        if (!mainData || !newsCategoryDataMap) {
            return '';
        }
        //  这是新闻菜单数据
        const data = newsCategoryDataMap[mainData.id];
        //  console.log(data);
        return (
            <div className={style.crumb}>
                <a href={`./news.html`} className={style.link}>新闻中心</a>
                <span className={style.arrows}>&gt;</span>
                <a href={`./news.html?id=${mainData.id}`} className={style.subLink}>{data.name}</a>
                <span className={style.arrows}>&gt;</span>
                <span className={style.arrows} style={{ marginLeft: 0 }}>{mainData.title}</span>
            </div>
        );
    }
);