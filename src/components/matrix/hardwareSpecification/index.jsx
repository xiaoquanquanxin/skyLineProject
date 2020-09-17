import React from 'react';
import style from './index.module.less';

//  硬件关键规格
export const HardwareSpecification = ({
    hsData
}) => {
    hsData = hsData || {};
    return (
        <div className={style.hsParameter}>
            <div className={style.parameterIn}>
                <div className={style.descImg}>
                    <div className={style.desc}>
                        <p className={style.title} dangerouslySetInnerHTML={{ __html: hsData.title }}/>
                        <div className={style.detail} dangerouslySetInnerHTML={{ __html: hsData.desc }}/>
                    </div>
                    <HSImgList imgList={hsData.imgList}/>
                </div>
                <HSTable tableList={hsData.tableList}/>
            </div>
        </div>
    );
};

const HSImgList = ({
    imgList
}) => {
    if (!imgList) {
        return '';
    }
    return (
        <div className={style.imgGroup}>
            <div className={style.img1}>
                <div className={style.imgCenter2}
                     style={{ backgroundImage: `url(${imgList[0].img})` }}/>
                <div className={style.name} dangerouslySetInnerHTML={{ __html: imgList[0].name }}/>
            </div>
            <div className={style.img1}>
                <div className={style.imgCenter2}
                     style={{ backgroundImage: `url(${imgList[1].img})` }}/>
                <div className={style.name} dangerouslySetInnerHTML={{ __html: imgList[1].name }}/>
            </div>
        </div>
    );
};

//  表格
const HSTable = ({
    tableList
}) => {
    let list;
    if (tableList) {
        list = tableList.map((item, index) => {
            return (
                <tr key={index}>
                    <th dangerouslySetInnerHTML={{ __html: item.name }}/>
                    <td>
                        {item.content1 === true
                            ? <s className={style.tick}/>
                            : <span dangerouslySetInnerHTML={{ __html: item.content1 }}/>}
                    </td>
                    <td>
                        {item.content2 === true
                            ? <s className={style.tick}/>
                            : <span dangerouslySetInnerHTML={{ __html: item.content2 }}/>}
                    </td>
                </tr>
            );
        });
    }
    return (
        <table className={style.hsTable}>
            <tbody>
            {list}
            </tbody>
        </table>
    );
};
