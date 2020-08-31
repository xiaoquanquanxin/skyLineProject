import React from 'react';
import CSSModules from 'react-css-modules';
import style from './index.less';
import { basicCompareWidth } from '@utils/constant';
import { resizeListener } from '@utils/eventListener';
//  脚部信息
const BasicBannerRenderComponent = CSSModules(
    function ({ isRelativelyWide }){
//        console.log('是否足够宽', isRelativelyWide);
        return (
            <div className={style.basicBanner}>
                {isRelativelyWide ?
                    <video className={style.basicBannerVideo}
                           autoPlay="autoplay" muted="muted" loop="loop" x5-video-player-type="h5"
                           src={require('@media/basicBanner/basic-banner.mp4')}/>
                    :
                    <img
                        className={style.basicBannerGif}
                        src={require('@media/basicBanner/basic-banner.gif')}
                        alt='主banner图'
                    />
                }
                <div className={style.theTitle}>
                    <h1>AI 赋能万物 共创智能未来</h1>
                    <p className={style.desc}>AI on Horizon, Journey Together</p>
                </div>
            </div>
        );
    }, style, { allowMultiple: true }
);

const BasicBanner = class extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            //  浏览器宽度是否超过basicCompareWidth
            isRelativelyWide: true,
        };
    }

    //  钩子
    componentDidMount(){
        this.setState(() => {
            return {
                isRelativelyWide: window.innerWidth > basicCompareWidth
            };
        });
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
            <BasicBannerRenderComponent isRelativelyWide={this.state.isRelativelyWide}/>
        );
    }
};
export default BasicBanner;
