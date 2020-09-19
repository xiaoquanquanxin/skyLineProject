import React from 'react';
import style from './index.module.less';

//  超低功耗
export const UltraLowPower = ({
    ultraLowPowerData,
    //  文字在右侧
    contentIsRight,
}) => {
    ultraLowPowerData = ultraLowPowerData || {};

    //  右侧文字多
    let rightDescMore = contentIsRight && ultraLowPowerData.desc && ultraLowPowerData.desc.length > 100;
    return (
        <div className={style.ultraLowPower}>
            <div className={style.ultraLowPowerInner} style={{ backgroundImage: `url(${ultraLowPowerData.img})` }}>
                <div
                    className={`${style.contentWrap} ${contentIsRight ? style.contentIsRight : ''} ${rightDescMore ? style.rightDescMore : ''}`}>
                    <p className={style.title} dangerouslySetInnerHTML={{ __html: ultraLowPowerData.title }}/>
                    <ul className={style.list}>
                        <li className={style.item}>
                            <pre className={style.pre}
                                 dangerouslySetInnerHTML={{ __html: ultraLowPowerData.desc }}/>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};