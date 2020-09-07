import React from 'react';
import CSSModules from 'react-css-modules';
import { Slick } from '@components/slick';
import LazyLoad from 'react-lazyload';
import style from './index.module.less';
import layout from '@css/layout.module.less';
import './index.less'
export const AssignedCustomer = CSSModules(({
    //  数据
    data,
}) => {
    return (
        <div className={style.container} id='assignedCustomer'>
            <p className={style.title}>赋能客户</p>
            <Slick swiperData={data}
                   sliderItemType={2}
                   delay={5}
            />
        </div>
    );
});

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
                <LazyLoad once>
                    <img src={item.img} alt={item.name}/>
                </LazyLoad>
            </li>
        );
    });
    return (
        <ul className={`${style.customerList} ${layout.clearfix}`}>
            {list}
        </ul>
    );
};

