import React from 'react';
import style from './index.module.less';
import { Sunrise3basicTitleDesc } from '@components/sunrise3/sunrise3basicTitleDesc';

//  开放工具链
export const ChainBox = ({
    chainBoxData
}) => {
    chainBoxData = chainBoxData || {};
    return (
        <div className={style.chainBox}>
            <Sunrise3basicTitleDesc data={chainBoxData} widthType={600}/>
            <img src={chainBoxData.img} className={style.img} alt=''/>
        </div>
    );
};