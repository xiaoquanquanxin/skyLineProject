import React from 'react';
import style from './index.module.less';
import { Sunrise3basicTitleDesc } from '@components/sunrise3/sunrise3basicTitleDesc';

export const OpenExplorer = ({
    openExplorerData
}) => {
    openExplorerData = openExplorerData || {};
    return (
        <div className={style.openExplorer}>
            <Sunrise3basicTitleDesc data={openExplorerData} widthType={918}/>
            <img src={openExplorerData.img} className={style.img}/>
        </div>
    );
};