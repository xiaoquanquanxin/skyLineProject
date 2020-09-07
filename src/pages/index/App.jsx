import React from 'react';
import { BasicHeader } from '@components/basicHeader';
import { BasicFooter } from '@components/basicFooter';
import { BannerSlick } from '@components/index/bannerSlick';
import { requestIndex } from '@api/index';
import { navSortByRank } from '@utils/utils';
import { commonRelativeWideFn } from '@utils/common';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '@store/reduxMap';
import './index.css';
import { MainInfo } from '@components/index/mainInfo';

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    class App extends React.Component {
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
        }

        //  钩子
        componentDidMount(){
            //  发请求，取页面数据
            requestIndex()
                .then(v => {
                    v.top_banner && v.top_banner.length && navSortByRank(v.top_banner, 'rank');
                    v.middle_banner && v.middle_banner.length && navSortByRank(v.middle_banner, 'rank');
                    v.bottom_banner && v.bottom_banner.length && navSortByRank(v.bottom_banner, 'rank');
                    v.client && v.client.length && navSortByRank(v.client, 'rank');
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
                    }));
                });
            commonRelativeWideFn(this.props.setRelativeWideFn);
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
                    <BannerSlick swiperData={swiperData}/>
                    {/*基本信息*/}
                    <MainInfo info={firstInfo} textPosition='right'/>
                    <MainInfo info={secondInfo} textPosition='left'/>
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

