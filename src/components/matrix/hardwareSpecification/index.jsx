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
                <HSTable tableList={hsData.content}/>
            </div>
        </div>
    );
};

//  图片两个
const HSImgList = ({
    imgList
}) => {
    if (!imgList) {
        return '';
    }
    const list = imgList.map((item, index) => {
        return (
            <div className={style.img1} key={index}>
                <div className={style.imgCenter2}
                     style={{ backgroundImage: `url(${item.img || '' })` }}/>
                <div className={style.name} dangerouslySetInnerHTML={{ __html: item.title }}/>
            </div>
        );
    });
    return (
        <div className={style.imgGroup}>
            {list}
        </div>
    );
};

//  表格
const HSTable = ({
    tableList
}) => {
    let list;

    if (tableList) {
        tableList = JSON.parse(tableList);
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
