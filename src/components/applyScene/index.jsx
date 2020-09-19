import React from 'react';
import style from './index.module.less';

//  应用场景，无文字，纯图片
export const ApplyScene = ({
    applySceneData,
    //  场景颜色。0黑色，1白色
    sceneType,
    //  背景颜色
    bgc,
}) => {
    applySceneData = applySceneData || {};
    let sceneTypeClassName;
    switch (sceneType) {
        case 0:
            sceneTypeClassName = style.black;
            break;
        case 1:
            sceneTypeClassName = style.white;
            break;
        default:
            break;
    }
    return (
        <div className={`${style.applyScene} ${sceneTypeClassName}`} style={bgc ? { background: bgc } : {}}>
            <p className={style.title}>应用场景</p>
            <div className={style.applySceneInner}>
                <div className={style.listWrap}>
                    <ApplySceneTopList topList={applySceneData.topList}/>
                    <ApplySceneBottomList bottomList={applySceneData.bottomList}/>
                </div>
            </div>
        </div>
    );
};

//  场景图片列表
const ApplySceneTopList = ({
    topList
}) => {
    if (!topList) {
        return '';
    }
    const list = topList.map((item, index) => {
        return (
            <img src={item.img} alt="" key={index} className={style.topItem}/>
        );
    });
    return (
        <div className={style.applySceneTopList}>
            {list}
        </div>
    );
};

const ApplySceneBottomList = ({
    bottomList
}) => {
    if (!bottomList) {
        return '';
    }
    const list = bottomList.map((item, index) => {
        return (
            <img src={item.img} alt="" key={index} className={style.bottomItem}/>
        );
    });
    return (
        <div className={style.applySceneBottomList}>
            {list}
        </div>
    );
};
