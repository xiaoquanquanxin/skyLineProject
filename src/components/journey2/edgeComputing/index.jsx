import React from 'react';
import style from './index.module.less';
import { DescList } from '@components/journey2/descList';

//  四个一块的
export const EdgeComputing = ({
    data,
}) => {
    data.descList = [{}, {}, {}];
    return (
        <div className={style.edgeComputing}>
            <div className={style.edgeComputingIn} style={{ backgroundImage: `url(${data.img})` }}>
                <div className={style.wrap}>
                    <p className={style.title}>{data.title}</p>
                    <div className={style.desc} dangerouslySetInnerHTML={{ __html: data.desc }}/>
                    <DescList data={data.descList}/>
                </div>
            </div>
        </div>
    );
};