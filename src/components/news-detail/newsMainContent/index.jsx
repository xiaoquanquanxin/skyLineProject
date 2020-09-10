import React from 'react';
import style from './index.module.less';
import { transformDateType } from '@utils/utils';

export const NewsMainContent = ({ mainData }) => {
    if (mainData === null) {
        return '';
    }
    //  todo    未完成
    return (
        <div className={style.mainContent}>
            <div className={style.mainBanner}>
                <img className={style.thumb} src={mainData.thumb} alt=''/>
                <div className={style.imgDes}>
                    <div className={style.iconType}>
                        {/*用那个数据*/}
                        <img alt='' className={style.icon}/>
                        <span className={style.type}>{111}</span>
                    </div>
                    <p className={style.title}>{mainData.title}</p>
                    <p className={style.date}>{transformDateType(mainData.publish_date)}</p></div>
            </div>
            <div className={style.mainText} dangerouslySetInnerHTML={{ __html: mainData.content }}/>
        </div>
    );
};