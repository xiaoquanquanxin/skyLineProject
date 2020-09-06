import React from 'react';
import CSSModules from 'react-css-modules';
import style from './index.module.less';
import layout from '@css/layout.module.less';
import { BASIC_COMPARE_WIDTH } from '@utils/constant';
import { resizeListener } from '@utils/eventListener';
import { SiteInfo } from '@components/basicFooter/siteInfo';
import { LinkList } from '@components/basicFooter/linkList';
import { requestFooterNav } from '@api/index';
import { navSortByRank } from '@utils/utils';

const BasicFooterRender = CSSModules(
    ({
        //  浏览器宽度是否超过BASIC_COMPARE_WIDTH
        isRelativelyWide,
        //  被选中的link
        activeLinkIndex,
        //  被展开的链接块
        isSpreadIndex,
        //  二维码展示index
        qrCodeShowIndex,
        //  数据
        data,
        //  展开底导航
        spreadClick,
        //  点击二维码
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
                    data={data}
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
            //  被选中的link
            activeLinkIndex: props.activeLinkIndex || 0,
            //  被展开的链接块
            isSpreadIndex: -1,
            //  二维码展示index
            qrCodeShowIndex: -1,
            //  数据
            data: null,
        };
    }

    //  钩子
    componentDidMount(){
        //  发请求，取footer数据
        requestFooterNav()
            .then(data => {
                //  公司业务
                data.solution && data.solution.length && navSortByRank(data.solution, 'rank');
                //  公司产品
                data.product && data.product.length && navSortByRank(data.product, 'rank');
                //  关于我们
                data.aboutus && data.aboutus.length && navSortByRank(data.aboutus, 'rank');
                //  联系我们
                data.contact = this.getContentList(data.contact);
                //  console.log(data);
                this.setState(() => ({
                    data,
                }));
            });

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

    //  将联系我们的数据格式转为list
    getContentList(data){
        let index = 1;
        const list = [];
        while (1) {
            const titleKey = data[`title${index}`];
            const contentKey = data[`content${index}`];
            if (titleKey && contentKey) {
                list.push({ name: `${titleKey} ：${contentKey}`, id: -1000000 + index });
                index++;
                continue;
            }
            break;
        }
        return list;
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
        const {
            isRelativelyWide,
            activeLinkIndex,
            isSpreadIndex,
            qrCodeShowIndex,
            data,
        } = this.state;
        return (
            <BasicFooterRender
                isRelativelyWide={isRelativelyWide}
                activeLinkIndex={activeLinkIndex}
                isSpreadIndex={isSpreadIndex}
                qrCodeShowIndex={qrCodeShowIndex}
                data={data}
                spreadClick={this.spreadClick}
                qrCodeClick={this.qrCodeClick}
            />
        );
    }
};