import React from 'react';
import style from './index.module.less';
import { BasicTitleDesc } from '@components/basicTitleDesc';

//  赋能模式
export const EnablingMode = ({
    enablingModeData
}) => {
    enablingModeData = enablingModeData || {};
    let list;
    if (enablingModeData.content) {
        list = enablingModeData.content.map((item, index) => {
            return (
                <ListItem data={item} key={index}/>
            );
        });
    }
    return (
        <div className={style.enablingMode}>
            <div className={style.enablingModeIn}
                 style={{ backgroundImage: `url(${enablingModeData.img})` }}>
                <BasicTitleDesc data={enablingModeData} isLight={true}/>
                <ul className={style.list}>
                    {list}
                </ul>
                <p className={style.place}></p>
            </div>
        </div>
    );
};

const ListItem = ({ data }) => {
    return (
        <li className={style.item}>
            <p className={style.name} dangerouslySetInnerHTML={{ __html: data.title }}/>
            <div className={style.desc} dangerouslySetInnerHTML={{ __html: data.desc }}/>
        </li>
    );
};

//      let modeTypeList;
//if (enablingModeData.modeTypeList) {
//    modeTypeList = enablingModeData.modeTypeList.map((item, index) => {
//        return (
//            <ModeTypeItem data={item} key={index}/>
//        );
//    });
//}
//const ModeTypeItem = ({ data }) => {
//    return (
//        <div className={style.type}>
//            <img className={style.img} alt=''/>
//            <span className={style.span} dangerouslySetInnerHTML={{ __html: data.name }}/>
//        </div>
//    );
//};
