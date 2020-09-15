import React from 'react';
import style from './index.module.less';

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

export const DescList = ({
    data
}) => {
    if (!data) {
        return '';
    }

    const list = data.map((item, index) => {
        if (index > 0 && index % 2) {
            return (
                <li key={index} className={style.item}>
                    <div className={style.line}/>
                </li>

            );
        }
        return (
            <li key={index} className={style.item}>
                <label className={style.label}>运算功率</label>
                <div className={style.c}>
                    <b><s>2</s></b>
                    <span>w</span>
                </div>
            </li>
        );
    });
    return (
        <ul className={style.descUl}>
            {list}
        </ul>
    );
};
