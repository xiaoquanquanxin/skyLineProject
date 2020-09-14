import React from 'react';
import style from './index.module.less';
import layout from '@css/layout.module.less';
import { connect } from 'react-redux';
import { mapStateToProps } from '@store/reduxMap';
import { CustomSwiper } from '@components/swiper';
import './index.less';
import { preventDefaultFn } from '@utils/eventListener';

//  广告位轮播
export const AdvertisementBanner = connect(
    mapStateToProps,
)((
    {
        //  数据
        data,
        REDUCER_BROWSER_INFO,
    }) => {
        const { isRelativeWide } = REDUCER_BROWSER_INFO;
        const swiperData = [];
        let portion = isRelativeWide ? 15 : 8;
        let index = 0;
        while (data && portion * (index) < data.length) {
            swiperData.push(data.slice(portion * index, portion * (1 + index)));
            index++;
        }
        //      console.log(swiperData.length);
        return (
            <div className={style.container} id='AdvertisementBanner'>
                <p className={style.title}>赋能客户</p>
                <CustomSwiper swiperData={swiperData}
                              sliderItemType={2}
                              basicDelay={5}
                />
            </div>
        );
    }
);

//  swiper的每一项，本身是一个list
export const CustomerSlickItem = ({
    data
}) => {
    if (!data || data.length === 0) {
        return '';
    }
    const list = data.map(item => {
        return (
            <li className={style.swiperItem} key={item.id} title={item.name}>
                <img src={item.img} alt={item.name} onDragStart={(e) => {preventDefaultFn(e);}}/>
            </li>
        );
    });
    return (
        <ul className={`${style.customerList} ${layout.clearfix}`}>
            {list}
        </ul>
    );
};

