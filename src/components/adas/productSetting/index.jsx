import React from 'react';
import style from './index.module.less';
import layout from '@css/layout.module.less';
import { BasicTitleDesc } from '@components/basicTitleDesc';

//  产品配置
export const ProductSetting = ({
    productSettingData
}) => {
    productSettingData = productSettingData || {};
    let content;
    if (productSettingData.content) {
        content = JSON.parse(productSettingData.content);
    }

    return (
        <div className={style.productSetting}>
            <div className={style.productSettingIn}>
                <BasicTitleDesc data={productSettingData}/>
                <div className={style.imgDesc}>
                    <div className={`${style.imgCenter2} ${layout.imgCenter2}`}
                         style={{ backgroundImage: `url(${productSettingData.img})` }}
                    />
                    <DescList content={content}/>
                </div>
            </div>
        </div>
    );
};

//  表格
const DescList = ({ content }) => {
    if (!content) {
        return '';
    }
    const list = content.data.map((item, index) => {
        return (
            <tr key={index}>
                <td className={`${style.firstTh} ${style.td}`}>
                    <span className={style.span} dangerouslySetInnerHTML={{ __html: item.name }}/></td>
                <td className={style.td}><s className={item.isEconomical ? style.tick : style.hLine}/></td>
                <td className={style.td}><s className={item.isProfession ? style.tick : style.hLine}/></td>
                <td className={style.td}><s className={item.isStandard ? style.tick : style.hLine}/></td>
            </tr>
        );
    });
    return (
        <div className={style.descList}>
            <table className={style.table}>
                <tbody style={{ width: '100%' }}>
                <tr className={style.firstTr}>
                    <th className={`${style.firstTh} ${style.td}`}/>
                    <th className={style.td} dangerouslySetInnerHTML={{ __html: content.map.isEconomical }}/>
                    <th className={style.td} dangerouslySetInnerHTML={{ __html: content.map.isProfession }}/>
                    <th className={style.td} dangerouslySetInnerHTML={{ __html: content.map.isStandard }}/>
                </tr>
                <tr>
                    <td colSpan="4" className={style.noline}>
                        <div className="line"></div>
                    </td>
                </tr>
                {list}
                </tbody>
            </table>
        </div>
    );
};