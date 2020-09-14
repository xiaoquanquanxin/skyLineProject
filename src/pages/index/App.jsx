import React, { Component } from 'react';
import { BasicHeader } from '@components/basicHeader';
import { BasicFooter } from '@components/basicFooter';
import { BannerSwiper } from '@components/index/bannerSwiper';
import { requestIndex } from '@api/index';
import { getBrowserInfo, navSortByRank } from '@utils/utils';
import { commonRelativeWideFn } from '@utils/utils';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '@store/reduxMap';
import { MainInfo } from '@components/index/mainInfo';
import { AdvertisementBanner } from '@components/bannerManage/advertisementBanner';

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    class App extends Component {
        constructor(props){
            super(props);
            this.state = {
                //  swiper
                swiperData: null,
                //  车规级 AI 芯片
                firstInfo: null,
                //  新一代底层计算平台
                secondInfo: null,
                //  智能客户
                customList: null,
            };
            //  页面宽度监听
            commonRelativeWideFn(this.props.setRelativeWideFn);
            //  页面滚动监听
            getBrowserInfo(this.props.setBrowserScrollInfoFn);
        }

        //  钩子
        componentDidMount(){
            //  发请求，取页面数据
            requestIndex()
                .then(v => {
                    navSortByRank(v.top_banner, 'rank');
                    navSortByRank(v.middle_banner, 'rank');
                    navSortByRank(v.bottom_banner, 'rank');
                    navSortByRank(v.client, 'rank');

                    //  客户轮播
                    this.setState(() => ({
                        //  banner数据
                        swiperData: v.top_banner,
                        //  第二块
                        firstInfo: v.middle_banner && v.middle_banner[0],
                        //  第三块
                        secondInfo: v.bottom_banner && v.bottom_banner[0],
                        //  客户轮播
                        customList: v.client,
                        //  customList: v.client.concat(v.client),
                        //  customList: v.client.slice(0,12)
                    }));
                });
        }

        render(){
            const {
                swiperData,
                firstInfo,
                secondInfo,
                customList,
            } = this.state;
            return (
                <div className="App">
                    <BasicHeader/>
                    {/*banner轮播*/}
                    <BannerSwiper swiperData={swiperData}/>
                    {/*基本信息*/}
                    <MainInfo info={firstInfo} textPosition='right'/>
                    <MainInfo info={secondInfo} textPosition='left'/>
                    {/*赋能客户*/}
                    <AdvertisementBanner data={customList}/>
                    {/*脚部*/}
                    <BasicFooter/>
                </div>
            );
        }
    }
);

//  异步加载组件
//import asyncComponent from '@components/asyncComponentLoader/asyncComponentLoader';
//const BasicBanner = asyncComponent(() => import('@components/basicBanner'));

