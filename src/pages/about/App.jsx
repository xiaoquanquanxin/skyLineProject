import React, { Component } from 'react';
import { BasicHeader } from '@components/basicHeader';
import { BasicFooter } from '@components/basicFooter';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '@store/reduxMap';
import { requestGetAboutUs } from '@api/index';
import { commonRelativeWideFn, getBrowserInfo } from '@utils/utils';
import { navSortByRank } from '@utils/utils';
import { BannerManage } from '@components/bannerManage';
import './index.module.less';
import { ScrollFixed } from '@components/scrollFixed';
import { AboutTabBox } from '@components/about/aboutTabBox';
import { AboutUsBasic } from '@components/about/aboutUsBasic';
import { AboutUsHistory } from '@components/about/aboutUsHistory';
import { AdvertisementBanner } from '@components/bannerManage/advertisementBanner';

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    class App extends Component {
        constructor(props){
            super(props);
            this.state = {
                //  公司简介
                basicInfo: null,
                //  发展历程
                historyInfoMap: null,
                historyInfoList: null,
                //  投资阵容（部分）
                investList: null,
            };
        }

        componentDidMount(){
            requestGetAboutUs()
                .then(v => {
                    console.log(v.invest);
                    navSortByRank(v.invest, 'rank');
                    this.setState(() => {
                        return {
                            basicInfo: v.aboutus,
                            historyInfoMap: v.history,
                            historyInfoList: Reflect.ownKeys(v.history).reverse(),
                            investList: v.invest,
                        };
                    });
                });
            //  页面宽度监听
            commonRelativeWideFn(this.props.setRelativeWideFn);
            //  页面滚动监听
            getBrowserInfo(this.props.setBrowserScrollInfoFn);
        }

        render(){
            const { basicInfo, historyInfoMap, historyInfoList, investList } = this.state;
            return (
                <div className="App">
                    {/*头部*/}
                    <BasicHeader/>
                    {/*banner轮播*/}
                    <BannerManage bannerType={5}/>
                    {/*合作咨询定位组件*/}
                    <ScrollFixed RenderElement={AboutTabBox}/>
                    {/*关于我们*/}
                    <AboutUsBasic aboutUsInfo={basicInfo}/>
                    {/*发展历程*/}
                    <AboutUsHistory historyInfoMap={historyInfoMap} historyInfoList={historyInfoList}/>
                    {/*投资阵容（部分）*/}
                    <AdvertisementBanner data={investList}/>
                    {/*脚部*/}
                    <BasicFooter/>
                </div>
            );
        }
    }
);

//import BMap from 'BMap';
//var map = new BMap.Map('allmap'); // 创建Map实例
//map.centerAndZoom(new BMap.Point(116.404, 39.915), 11); // 初始化地图,设置中心点坐标和地图级别
//map.addControl(new BMap.MapTypeControl()); //添加地图类型控件
//map.setCurrentCity('北京'); // 设置地图显示的城市 此项是必须设置的
//map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
{/*<div id='allmap' style={{ width: '100vw', height: '100vh' }}/>*/}
