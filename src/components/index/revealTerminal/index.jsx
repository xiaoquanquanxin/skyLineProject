import React from 'react';
import CSSModules from 'react-css-modules';
import style from './index.less';
import { basicCompareWidth } from '@utils/constant';
import { resizeListener } from '@utils/eventListener';
import { BasicIntroduction } from '@components/index/basicIntroduction';

export const RevealTerminalRender = CSSModules(
    ({ isRelativelyWide }) => {
//        console.log('是否够宽？', isRelativelyWide);
        return (
            <div className={style.revealTerminal}>
                {
                    isRelativelyWide ?
                        <video src={require('@media/index/HomeEarth3.mp4')}
                               className={style.revealTerminalVideo}
                               autoPlay="autoplay" muted="muted" loop="loop"
                               x5-video-player-type="h5"/>
                        :
                        <img src={require('@media/index/HomeEarth3.gif')}
                             className={style.revealTerminalGif}
                             alt='首页芯片'/>
                }
                <BasicIntroduction
                    title='“点化”终端，万物有灵'
                    description='基于自主研发的旭日系列边缘人工智能处理器，地平线面向智慧城市、智慧零售、智能机器人等 AIoT 技术有着广泛应用的场景，提供不同层级的 AIoT 解决方案，与合作伙伴共建智慧物联网。'
                    linkHref={''}
                    contentIsLeft={true}
                />
            </div>
        );
    }
);

export const RevealTerminal = class extends React.Component {
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
            <RevealTerminalRender isRelativelyWide={this.state.isRelativelyWide}/>
        );
    }
};