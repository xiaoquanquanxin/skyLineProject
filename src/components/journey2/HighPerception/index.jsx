import React from 'react';
import style from './index.module.less';
import { DescList } from '@components/journey2/descList';
import { setRelativeWide } from '@store/browserInfo';

//  四个一块的
export const HighPerception = ({
    data,
    //  宽度适配
    customWidth,
}) => {
    data = data || {};
    if (data.content) {
        data.descList = JSON.parse(data.content);
        if (data.descList.length > 1) {
            data.descList.splice(1, 0, null);
        }
    }

    let wrapWidth;
    switch (customWidth) {
        case 1:
            wrapWidth = style.wrapWidth1;
            break;
        case 3:
            wrapWidth = style.wrapWidth3;
            break;
        default:
            break;
    }
    return (
        <div className={style.highPerception}>
            <div className={`${style.highPerceptionIn} ${wrapWidth}`}
                 style={{ backgroundImage: `url(${data.img || ''})` }}>
                <div className={`${style.wrap}`}>
                    <p className={style.title} dangerouslySetInnerHTML={{ __html: data.title }}/>
                    <div className={`${style.desc}`} dangerouslySetInnerHTML={{ __html: data.desc }}/>
                    <DescList data={data.descList}/>
                </div>
            </div>
        </div>
    );
};
