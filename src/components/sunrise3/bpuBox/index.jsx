import React from 'react';
import style from './index.module.less';
import { RobotoCondensed, RobotoCondensedLine } from '@components/sunrise3/robotoCondensed';

//  伯努利2.0 BPU
export const Sunrise3BpuBox = ({
    sunrise3BpuBoxData
}) => {
    sunrise3BpuBoxData = sunrise3BpuBoxData || {};
    let list;
    if (sunrise3BpuBoxData.list) {
        list = sunrise3BpuBoxData.list.map((item, index) => {
            if (index > 0 && index % 2) {
                return (
                    <RobotoCondensedLine key={index}/>
                );
            }
            return (
                <RobotoCondensed data={item} key={index}/>
            );
        });
    }
    //  console.log(sunrise3BpuBoxData);
    return (
        <div className={style.bpuBox}>
            <div className={style.bpuIn}>
                <div className={style.textDesc}>
                    <p className={style.title} dangerouslySetInnerHTML={{ __html: sunrise3BpuBoxData.title }}/>
                    <div className={style.desc} dangerouslySetInnerHTML={{ __html: sunrise3BpuBoxData.desc }}/>
                    <ul className={style.list}>
                        {list}
                    </ul>
                </div>
                <div className={style.placeholder}/>
            </div>
        </div>
    );
};