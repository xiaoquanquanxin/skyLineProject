import React from 'react';
import style from './index.module.less';

//  超低功耗
export const UltraLowPower = ({
    ultraLowPowerData,
    //  文字在右侧
    contentIsRight,
}) => {
    ultraLowPowerData = ultraLowPowerData || {};
//    if (ultraLowPowerData.desc) {
//        const arr = ultraLowPowerData.desc.split('\t');
//        console.log(arr);
//    }
    return (
        <div className={style.ultraLowPower}>
            <div className={style.ultraLowPowerInner} style={{ backgroundImage: `url(${ultraLowPowerData.img})` }}>
                <div className={`${style.contentWrap} ${contentIsRight ? style.contentIsRight : ''}`}>
                    <p className={style.title}>高性能</p>
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