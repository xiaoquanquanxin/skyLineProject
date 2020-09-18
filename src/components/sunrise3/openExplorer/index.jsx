import React from 'react';
import style from './index.module.less';
import { BasicTitleDesc } from '@components/basicTitleDesc';

export const OpenExplorer = ({
    openExplorerData,
    //  是浅色的底
    isLight,
}) => {
    openExplorerData = openExplorerData || {};
    return (
        <div className={`${style.openExplorer} ${style.isLight}`}>
            <BasicTitleDesc data={openExplorerData} widthType={918} isLight={isLight}/>
            <img src={openExplorerData.img} className={style.img} alt=''/>
        </div>
    );
};