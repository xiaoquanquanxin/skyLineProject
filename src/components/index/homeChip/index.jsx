import React from 'react';
import CSSModules from 'react-css-modules';
import style from './index.less';
import { basicCompareWidth } from '@utils/constant';
import { resizeListener } from '@utils/eventListener';

export const HomeChipRender = CSSModules(
    ({ isRelativelyWide }) => {
        console.log('是否够宽？', isRelativelyWide);
        return (
            <div className={style.homeChip}>
                {
                    isRelativelyWide ?
                        <video src={require('@media/index/HomeChip.mp4')}
                               className={style.homeChipVideo}
                               autoPlay="autoplay" muted="muted" loop="loop"
                               x5-video-player-type="h5"/>
                        :
                        <img src={require('@media/index/HomeChip.gif')}
                             className={style.homeChipGif}
                             alt='首页芯片'/>
                }
                <div className={style.homeContent}>
                    <p className={style.homeChipTitle}>用“芯”创造 万物智能</p>
                    <p className={style.homeChipDescription}>基于创新的人工智能专用处理器架构 BPU，自主设计研发面向智能驾驶的征程系列处理器和面向 AIoT
                        的旭日系列处理器，以领先的边缘人工智能处理器技术赋能智能终端。</p>
                    {/*todo 这个地址*/}
                    <a className={style.homeChipLink} href="">了解更多&nbsp;&nbsp;&gt;</a></div>
            </div>
        );
    }
);

export const HomeChip = class extends React.Component {
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
            <HomeChipRender isRelativelyWide={this.state.isRelativelyWide}/>
        );
    }
};