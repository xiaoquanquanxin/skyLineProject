import React from 'react';
import style from './index.module.less';

import performanceMain from '@media/technology/performanceMain.png';
//  性能
export const TechnologyPerformance = ({
    performanceData
}) => {
    let list;
    if (!performanceData) {
        return '';
    }
//    if (performanceData.list) {
//        list = performanceData.list.map((item, index) => {
//            return (
//                <li className={style.item} key={index}>
//                    <i className={style.icon}/>
//                    文字文字文字文字
//                </li>
//            );
//        });
//    }
    return (
        <div className={style.performance}>
            <div className={style.performanceIn}>
                <p className={style.title}>{performanceData.title}</p>
                <div className={style.descBtn}>
                    <div className={style.desc}>
                        <span className={style.span}>地平线最新一代 AI 芯片 MAPS（在精度有保障范围内的平均处理速度值）高达 416FPS ，远超主流 AI 芯片。下图为在 ImageNet 图像分类 75 ~  80.5% 精度范围内， MAPS 评估方式下的主流芯片测试结果；右一蓝色折线为地平线最新一代芯片测试结果。</span>
                        <div className={style.btn}>
                            {/*//	todo	逻辑*/}
                            <span className={style.open}>展开</span>
                            <b className={style.close}>收起</b>
                            <i className={style.arrow}/>
                        </div>
                    </div>
                </div>
                <div className={style.chartDescItem}>
                    <img src={performanceMain} className={style.img}/>
                {/*    <ul className={style.list}>{list}</ul>*/}
                </div>
            </div>
        </div>
    );
};