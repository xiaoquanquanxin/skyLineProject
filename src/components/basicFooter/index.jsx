import React from 'react';
import CSSModules from 'react-css-modules';
import style from './index.less';
import layout from '@css/layout.less';
import { BASIC_COMPARE_WIDTH } from '@utils/constant';
import { resizeListener } from '@utils/eventListener';
import { SiteInfo } from '@components/basicFooter/siteInfo';
import { LinkList } from '@components/basicFooter/linkList';

const BasicFooterRender = CSSModules(
    ({
        isRelativelyWide,
        activeLinkIndex,
        isSpreadIndex,
        qrCodeShowIndex,
        spreadClick,
        qrCodeClick,
    }) => (
        <section className={style.basicFooter}>
            <div className={`${style.basicFooterInfo} ${layout.clearfix}`}>
                <div className={`${style.static} ${isRelativelyWide ? layout.left : ''}`}>
                    <p className={`${isRelativelyWide ? style.subTitle : ''}`}>我们的愿景：</p>
                    <p className={style.subDescription}>边缘人工智能芯片全球领导者</p>
                    <p className={`${isRelativelyWide ? style.subTitle : ''}`}>我们的使命：</p>
                    <p className={style.subDescription}>赋能万物，让每个人的生活更安全，更美好</p>
                </div>
                <LinkList
                    isRelativelyWide={isRelativelyWide}
                    isSpreadIndex={isSpreadIndex}
                    activeLinkIndex={activeLinkIndex}
                    spreadClick={spreadClick}
                />
            </div>
            <SiteInfo
                isRelativelyWide={isRelativelyWide}
                qrCodeShowIndex={qrCodeShowIndex}
                qrCodeClick={qrCodeClick}
            />
        </section>
    )
);
export const BasicFooter = class extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            //  浏览器宽度是否超过BASIC_COMPARE_WIDTH
            isRelativelyWide: window.innerWidth > BASIC_COMPARE_WIDTH,
            //  被展开的链接块
            isSpreadIndex: -1,
            //  被选中的link
            activeLinkIndex: props.activeLinkIndex || 0,
            //  二维码展示index
            qrCodeShowIndex: -1
        };
    }

    //  钩子
    componentDidMount(){
        //  resize监听，用于适配
        const rfn = (width) => {
            this.setState(() => {
                return {
                    isRelativelyWide: width > BASIC_COMPARE_WIDTH
                };
            });
        };
        //  resize监听
        resizeListener(rfn);
    }

    //  点击二维码
    qrCodeClick = (qrCodeShowIndex, isClose) => {
        //  重复点击                                            强制关闭
        if (qrCodeShowIndex === this.state.qrCodeShowIndex || isClose) {
            qrCodeShowIndex = -1;
        }
        this.setState(() => ({
            qrCodeShowIndex,
        }));
    };
    //  展开底导航
    spreadClick = (isSpreadIndex) => {
        if (isSpreadIndex === this.state.isSpreadIndex) {
            isSpreadIndex = -1;
        }
        this.setState(() => ({
            isSpreadIndex,
        }));
    };

    render(){
        return (
            <BasicFooterRender
                isRelativelyWide={this.state.isRelativelyWide}
                activeLinkIndex={this.state.activeLinkIndex}
                isSpreadIndex={this.state.isSpreadIndex}
                qrCodeShowIndex={this.state.qrCodeShowIndex}
                spreadClick={this.spreadClick}
                qrCodeClick={this.qrCodeClick}
            />
        );
    }
};