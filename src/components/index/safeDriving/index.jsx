import React from 'react';
import CSSModules from 'react-css-modules';
import style from './index.less';
import { basicCompareWidth } from '@utils/constant';
import { resizeListener } from '@utils/eventListener';
import { BasicIntroduction } from '@components/index/basicIntroduction';

export const SafeDrivingRender = CSSModules(
    () => {
        return (
            <div className={style.safeDriving}>
                <img src={require('@media/index/HomeCity.gif')}
                     className={style.safeDrivingGif}/>
                <div className={style.safeDrivingPngWrap}>
                    <img src={require('@media/index/HomeCar.png')}
                         className={style.safeDrivingPng}
                    />
                </div>
                <BasicIntroduction
                    title='安全驾驶 美好出行'
                    description='基于自主研发的征程系列边缘人工智能处理器及计算平台，地平线面向车外环境感知、车内多模态交互以及高精度地图建模等智能驾驶相关领域，为合作伙伴提供定制化的解决方案。'
                    linkHref={''}
                    contentIsLeft={false}
                />
            </div>
        );
    }
);

export const SafeDriving = class extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            //  浏览器宽度是否超过basicCompareWidth
            isRelativelyWide: window.innerWidth > basicCompareWidth
        };
    }

    //  钩子
    componentDidMount(){
        //  resize监听，用于适配
        const rfn = (width) => {
            this.setState(() => {
                return {
                    isRelativelyWide: width > basicCompareWidth
                };
            });
        };
        //  resize监听
        resizeListener(rfn);
    };

    render(){
        return (
            <SafeDrivingRender isRelativelyWide={this.state.isRelativelyWide}/>
        );
    }
};