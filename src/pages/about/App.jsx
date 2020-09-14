import React, { Component } from 'react';
import { BasicHeader } from '@components/basicHeader';
import { BasicFooter } from '@components/basicFooter';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '@store/reduxMap';
import { requestGetAboutUs } from '@api/index';
import { commonRelativeWideFn, getBrowserInfo, getContentList } from '@utils/utils';
import { navSortByRank } from '@utils/utils';
import { BannerManage } from '@components/bannerManage';
import './index.module.less';
import { ScrollFixed } from '@components/scrollFixed';
import { AboutTabBox } from '@components/about/aboutTabBox';
import { AboutUsBasic } from '@components/about/aboutUsBasic';
import { AboutUsHistory } from '@components/about/aboutUsHistory';
import { AdvertisementBanner } from '@components/bannerManage/advertisementBanner';
import { AboutContactUs } from '@components/about/aboutContactUs';
import { AboutUsLocation } from '@components/about/aboutUsLocation';

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
                //  联系我们
                contactInfo: null,
                //  地图与地址
                addrInfoList: null,
                addrInfoMap: null,
            };
            //  页面宽度监听
            commonRelativeWideFn(this.props.setRelativeWideFn);
            //  页面滚动监听
            getBrowserInfo(this.props.setBrowserScrollInfoFn);
        }

        componentDidMount(){
            requestGetAboutUs()
                .then(v => {
                    navSortByRank(v.invest, 'rank');
                    this.setState(() => {
                        return {
                            basicInfo: v.aboutus,
                            historyInfoMap: v.history,
                            historyInfoList: Reflect.ownKeys(v.history).reverse(),
                            investList: v.invest,
                            contactInfo: getContentList(v.contact, 2),
                            addrInfoMap: v.addr,
                            addrInfoList: this.transformAddrInfo(v.addr),
                        };
                    });
                });
        }

        //  转换地图地址格式
        transformAddrInfo(info){
            const list = Reflect.ownKeys(info);
            list.sort((a, b) => {
                return info[a][0].id - info[b][0].id;
            });
            return list;
        }

        render(){
            const {
                basicInfo,
                historyInfoMap,
                historyInfoList,
                investList,
                contactInfo,
                addrInfoMap,
                addrInfoList,
            } = this.state;
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
                    <AdvertisementBanner
                        data={investList}
                        title='投资阵容（部分）'
                        styleType={4}
                    />
                    {/*联系我们*/}
                    <AboutContactUs contactInfo={contactInfo}/>
                    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                    {/*地图部分*/}
                    <AboutUsLocation addrInfoMap={addrInfoMap}
                                     addrInfoList={addrInfoList}
                    />
                    <br/><br/><br/><br/><br/>
                    {/*脚部*/}
                    <BasicFooter/>
                </div>
            );
        }
    }
);
