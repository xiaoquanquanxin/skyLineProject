import React from 'react';
import CSSModules from 'react-css-modules';
import style from './index.less';
import { basicCompareWidth } from '@utils/constant';
import { resizeListener } from '@utils/eventListener';

export const SafeDrivingRender = CSSModules(
    ({ isRelativelyWide }) => {
        return (
            <div className={style.safeDriving}>
                <img src={require('@media/index/HomeCity.gif')}
                     className={style.safeDrivingGif}/>
                <div className={style.safeDrivingPngWrap}>
                    <img src={require('@media/index/HomeCar.png')}
                         className={style.safeDrivingPng}
                    />
                </div>
                <div className={style.safeDrivingContent}>
                    <p className={style.safeDrivingTitle}>安全驾驶 美好出行 </p>
                    <p className={style.safeDrivingDescription}>基于自主研发的征程系列边缘人工智能处理器及计算平台，地平线面向车外环境感知、车内多模态交互以及高精度地图建模等智能驾驶相关领域，为合作伙伴提供定制化的解决方案。</p>
                    {/*todo    这个地址*/}
                    <a href="" className={style.safeDrivingLink}>了解更多&nbsp;&nbsp;&gt;</a></div>
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