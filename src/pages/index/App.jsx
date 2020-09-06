import React from 'react';
import { BasicHeader } from '@components/basicHeader';
import { BasicFooter } from '@components/basicFooter';
import { BASIC_COMPARE_WIDTH } from '@utils/constant';
import { resizeListener } from '@utils/eventListener';
import { BannerSlick } from '@components/index/bannerSlick';
import { requestIndex } from '@api/index';
import { navSortByRank } from '@utils/utils';
import './index.css';

const App = class extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            //  浏览器宽度是否超过BASIC_COMPARE_WIDTH
            isRelativelyWide: window.innerWidth > BASIC_COMPARE_WIDTH,

            //  swiper
            swiperData: null,
            //  车规级 AI 芯片
            mainContent: null,
            //  新一代底层计算平台
            subContent: null,
            //  智能客户
            customList: null,
        };
    }

    //  钩子
    componentDidMount(){
        //  发请求，取页面数据
        requestIndex()
            .then(v => {
                //  banner数据
                v.top_banner && v.top_banner.length && navSortByRank(v.top_banner, 'rank');
                //  第二块
                v.middle_banner && v.client.length && navSortByRank(v.client, 'rank');
                //  第三块
                v.bottom_banner && v.bottom_banner.length && navSortByRank(v.bottom_banner, 'rank');
                //  客户轮播
                v.client && v.client.length && navSortByRank(v.client, 'rank');
                console.log(v);
                this.setState(() => ({
                    swiperData: v.top_banner,
                    mainContent: v.middle_banner,
                    subContent: v.bottom_banner,
                    customList: v.client,
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

    render(){
        const {
            swiperData,
            mainContent,
            subContent,
            customList,
        } = this.state;
        return (
            <div className="App">
                <BasicHeader/>
                {/*swiper*/}
                <BannerSlick swiperData={swiperData}/>
                {/*脚部*/}
                <BasicFooter/>
            </div>
        );
    }
};

export default App;

//  异步加载组件
//import asyncComponent from '@components/asyncComponentLoader/asyncComponentLoader';
//const BasicBanner = asyncComponent(() => import('@components/basicBanner'));

