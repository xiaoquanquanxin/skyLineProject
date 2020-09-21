import React from 'react';
import style from './index.module.less';
import { DescList } from '@components/journey2/descList';

//  四个一块的
export const HighPerception = ({
    data,
}) => {
    data = data || {};
    if (data.content) {
        data.descList = JSON.parse(data.content);
        if (data.descList.length > 1) {
            data.descList.splice(1, 0, null);
        }
    }
    return (
        <div className={style.highPerception}>
            <div className={style.highPerceptionIn} style={{ backgroundImage: `url(${data.img})` }}>
                <div className={style.wrap}>
                    <p className={style.title} dangerouslySetInnerHTML={{ __html: data.title }}/>
                    <div className={style.desc} dangerouslySetInnerHTML={{ __html: data.desc }}/>
                    <DescList data={data.descList}/>
                </div>
            </div>
        </div>
    );
};
