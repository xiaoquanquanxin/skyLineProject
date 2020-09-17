import React from 'react';
import style from './index.module.less';
import { BasicTitleDesc } from '@components/basicTitleDesc';

export const OpenExplorer = ({
    openExplorerData
}) => {
    openExplorerData = openExplorerData || {};
    return (
        <div className={style.openExplorer}>
            <BasicTitleDesc data={openExplorerData} widthType={918}/>
            <img src={openExplorerData.img} className={style.img}/>
        </div>
    );
};