import React from 'react';
import style from './index.module.less';

export const BasicTitleDesc = ({
    data,
    //  宽度
    widthType,
    //  是浅色的底
    isLight,
    //  描述 的颜色
    descriptionColor,
}) => {
    let widthTypeClassName;
    switch (widthType) {
        case 918:
            //  产品中心-旭日 Sunrise-旭日3 强大的视频处理能力
            widthTypeClassName = style.widthType918;
            break;
        case 784:
            //  产品中心-旭日 Sunrise-旭日3 旭日3 系列——释放 “芯” 效能
            widthTypeClassName = style.widthType784;
            break;
        case 710:
            widthTypeClassName = style.widthType710;
            break;
        case 670:
            widthTypeClassName = style.widthType670;
            break;
        case 620:
            widthTypeClassName = style.widthType620;
            break;
        case 600:
            widthTypeClassName = style.widthType600;
            break;
        case 494:
            widthTypeClassName = style.widthType494;
            break;
        default:
            widthTypeClassName = style.widthTypeBasic;
    }
    return (
        <div className={`${style.sunrise3basicTitleDesc} ${isLight ? style.isLight : ''}`}>
            <p className={style.title} dangerouslySetInnerHTML={{ __html: data.title }}/>
            <div className={`${style.desc} ${widthTypeClassName}`}
                 dangerouslySetInnerHTML={{ __html: data.desc }}
                 style={{ color: descriptionColor ? descriptionColor : 'auto' }}
            />
        </div>
    );
};