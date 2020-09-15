import React from 'react';
import style from './index.module.less';
import { DescList } from '@components/journey2/descList';

//  四个一块的
export const HighPerception = ({
    data,
}) => {
    data.descList = [{}, {}];
    return (
        <div className={style.highPerception}>
            <div className={style.highPerceptionIn} style={{ backgroundImage: `url(${data.img})` }}>
                <p className={style.title}>{data.title}</p>
                <div className={style.desc} dangerouslySetInnerHTML={{ __html: data.desc }}/>
                <DescList data={data.descList}/>
            </div>
        </div>
    );
};
