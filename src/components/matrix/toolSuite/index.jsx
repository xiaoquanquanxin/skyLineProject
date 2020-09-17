import React from 'react';
import style from './index.module.less';
import { Sunrise3basicTitleDesc } from '@components/sunrise3/sunrise3basicTitleDesc';

//  开发工具套件
export const ToolSuite = ({
    toolSuiteData
}) => {
    toolSuiteData = toolSuiteData || {};
    let list;
    if (toolSuiteData.list) {
        list = toolSuiteData.list.map((item, index) => {
            return (
                <ToolSuiteItem key={index} data={item}/>
            );
        });
    }
    return (
        <div className={style.toolSuite}>
            <Sunrise3basicTitleDesc data={toolSuiteData} widthType={494} isLight={true}/>
            <ul className={style.suite}>
                {list}
            </ul>
        </div>
    );
};

//  每一项
const ToolSuiteItem = ({
    data,
}) => {
    return (
        <li className={style.item}>
            <div className={style.imgCenter2} style={{ backgroundImage: `url(${data.img})` }}/>
            <p className={style.name} dangerouslySetInnerHTML={{ __html: data.name }}/>
            <div className={style.nameDesc} dangerouslySetInnerHTML={{ __html: data.desc }}/>
        </li>
    );
};

