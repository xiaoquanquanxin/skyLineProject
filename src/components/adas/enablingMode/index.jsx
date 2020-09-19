import React from 'react';
import style from './index.module.less';
import { BasicTitleDesc } from '@components/basicTitleDesc';

//  赋能模式
export const EnablingMode = ({
    enablingModeData
}) => {
    enablingModeData = enablingModeData || {};
    let list;
    if (enablingModeData.list) {
        list = enablingModeData.list.map((item, index) => {
            return (
                <ListItem data={item} key={index}/>
            );
        });
    }
//    console.clear();
//    console.log(enablingModeData)
    return (
        <div className={style.enablingMode}>
            <div className={style.enablingModeIn}
                 style={{ backgroundImage: `url(${enablingModeData.img})` }}>
                <BasicTitleDesc data={enablingModeData}/>
                <ul className={style.list}>
                    {list}
                </ul>
                {/*<div className={style.modeType}>*/}
                {/*    {modeTypeList}*/}
                {/*</div>*/}
            </div>
        </div>
    );
};

const ListItem = ({ data }) => {
    return (
        <li className={style.item}>
            <p className={style.name} dangerouslySetInnerHTML={{ __html: data.name }}/>
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
