import React from 'react';

import style from './index.module.less';

//  联系我们
export const AboutContactUs = ({
    contactInfo,
}) => {
    let list;
    if (contactInfo && contactInfo.length) {
        list = contactInfo.map(item => {
            return (
                <AboutContactUsItem data={item} key={item.id}/>
            );
        });
    }
    return (
        <div className={style.contact}>
            <span id="tab4"/>
            <div className={style.contactInner}>
                <div className={style.title}>联系我们</div>
                <ul className={style.list}>
                    {list}
                </ul>
            </div>
        </div>
    );
};

//  每一项
const AboutContactUsItem = ({
    data
}) => {
    return (
        <li className={style.item}>
            <p className={style.name}>{data.title}</p>
            <div className={style.content}>{data.content}</div>
        </li>
    );
};

//import BMap from 'BMap';
//var map = new BMap.Map('allmap'); // 创建Map实例
//map.centerAndZoom(new BMap.Point(116.404, 39.915), 11); // 初始化地图,设置中心点坐标和地图级别
//map.addControl(new BMap.MapTypeControl()); //添加地图类型控件
//map.setCurrentCity('北京'); // 设置地图显示的城市 此项是必须设置的
//map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
{/*<div id='allmap' style={{ width: '100vw', height: '100vh' }}/>*/}
