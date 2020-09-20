import React from 'react';
import style from './index.module.less';
import layout from '@css/layout.module.less';
import { BasicTitleDesc } from '@components/basicTitleDesc';
//  方案优势
export const PlanAdvantage = ({
    planAdvantageData
}) => {
    planAdvantageData = planAdvantageData || {};
    let list;
    if (planAdvantageData.list) {
        list = planAdvantageData.list.map((item, index) => {
            return (
                <PlanAdvantageItem key={index} data={item}/>
            );
        });
    }
    return (
        <div className={style.programAdvantages}>
            <div className={style.programAdvantagesIn}>
                <BasicTitleDesc data={planAdvantageData} isLight={true}/>
                <ul className={style.list}>
                    {list}
                </ul>
            </div>
        </div>
    );
};
const PlanAdvantageItem = ({ data }) => {
    return (
        <li className={style.item}>
            <div className={`${style.imgCenter2} ${layout.imgCenter2}`}
                 style={{ backgroundImage: `url(${data.img})` }}
            />
            <p className={style.name} dangerouslySetInnerHTML={{ __html: data.title }}/>
            <div className={style.desc} dangerouslySetInnerHTML={{ __html: data.desc }}/>
        </li>
    );
};