import React, { Component } from 'react';
import { BasicHeader } from '@components/basicHeader';
import { BasicFooter } from '@components/basicFooter';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '@store/reduxMap';
import {
    requestGetClientCase,
    requestGetCockPitPartner,
    requestGetImgTitle,
    requestGetMapClient,
    requestGetPageContent
} from '@api/index';
import { clipData, commonRelativeWideFn, getBrowserInfo } from '@utils/utils';
import { navSortByRank } from '@utils/utils';
import './index.less';
import { BannerManage } from '@components/bannerManage';
import { ScrollFixed } from '@components/scrollFixed';
import { FixedBarBox } from '@components/fixedBarBox';
import { INTELLIGENT_COCKPIT, NAV_CAT_ID, NAVINET } from '@utils/constant';
import { SystemArchitecture } from '@components/navinet/systemArchitecture';
import { NAL } from '@components/navinet/nAlgorithmsLibrary';
import { NavinetApplyScene } from '@components/navinet/navinetApplyScene';
import { Deploy } from '@components/navinet/deployData';
import { NCustomerCase } from '@components/navinet/nCustomerCase';
import { VideoWrap } from '@components/video';
import { GetMoreBox } from '@components/getMoreBox';
import { PopForm } from '@components/popForm';
import { Toast } from '@components/toast';
import { MultipleAdvantages } from '@components/navinet/multipleAdvantages';
import { ProductHighlights } from '@components/navinet/productHighlights';

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    class App extends Component {
        constructor(props){
            super(props);
            this.state = {
                //  方案优势
                maData: null,
                //  系统架构
                systemArchitectureData: null,
                //  算法库
                nALData: null,
                //  应用场景
                nasData: null,
                //  已在中国及海外市场批量部署
                deployData: null,
                //  客户案例
                nCustomerCaseData: null
            };
            //  页面宽度监听
            commonRelativeWideFn(this.props.setRelativeWideFn);
            //  页面滚动监听
            getBrowserInfo(this.props.setBrowserScrollInfoFn);
            const { setBarBoxAnchorList } = props;
            setBarBoxAnchorList(['方案概述', '客户案例']);
        }

        componentDidMount(){
            //  JSON
            const nALData = {
                //  建图功能
                makeFnData: {
                    title: '建图功能',
                    thMap: {
                        label: '',
                        list: ['位置属性', '逻辑属性', '集合属性', '语义属性']
                    },
                    dataList: [
                        {
                            label: '路面箭头',
                            list: [true, true, true, true]
                        },
                        {
                            label: '路面标志',
                            list: [true, true, true, true]
                        },
                        {
                            label: '交通标志牌',
                            list: [true, true, true, true]
                        },
                        {
                            label: '指路牌',
                            list: [true, true, true, true]
                        },
                        {
                            label: '交通灯',
                            list: [true, true, true, true]
                        },
                        {
                            label: '立杆',
                            list: [true, true, true, true]
                        },
                        {
                            label: '动态限行区域',
                            list: [true, true, true, true]
                        },
                        {
                            label: '车道线',
                            list: [true, true, true, true]
                        },
                        {
                            label: '停止线',
                            list: [true, true, true, false]
                        },
                        {
                            label: '人行横道线',
                            list: [true, true, true, false]
                        },
                        {
                            label: '路沿线',
                            list: [true, true, false, false]
                        },
                        {
                            label: '车辆轨迹',
                            list: [true, true, false, false]
                        },
                    ]
                },
                //  定位功能
                localFunData: {
                    title: '定位功能',
                    thMap: {
                        label: '',
                        content: '输出类型',
                    },
                    dataList: [
                        { label: '视觉定位', list: ['位置', '朝向', '速度', '定位状态',] },
                        { label: '融合定位', list: ['位置', '朝向', '速度', '定位状态',] },
                        { label: '地图概况', list: ['地图范围', '道路信息', '车道信息', '道路设施',] },
                    ]
                }
            };
            this.setState((state) => {
                return {
                    //  算法库
                    nALData: Object.assign({}, state.nALData, nALData),
                };
            });
            Promise.all([
                //  获取页面文案接口
                requestGetPageContent(NAVINET.name)
                    .then(data => {
                        this.setState((state) => {
                            return {
                                //  系统架构
                                systemArchitectureData: Object.assign({}, state.systemArchitectureData, data[0]),
                                //  算法库
                                nALData: Object.assign({}, state.nALData, data[1]),
                                //  已在中国及海外市场批量部署
                                deployData: Object.assign({}, state.deployData, data[2]),
                            };
                        });
                    }),
                //  获取图片标题接口
                requestGetImgTitle(NAVINET.name)
                    .then(data => {
                        //  方案优势
                        const maDataNormal = clipData(data, NAV_CAT_ID, data[0][NAV_CAT_ID]);
                        const maDataHover = clipData(data, NAV_CAT_ID, data[0][NAV_CAT_ID]);
                        //  产品亮点
                        const phList = clipData(data, NAV_CAT_ID, data[0][NAV_CAT_ID]);
                        const highLightsImgs = clipData(data, NAV_CAT_ID, data[0][NAV_CAT_ID]);
                        this.setState((state) => {
                            return {
                                //  方案优势
                                maData: Object.assign({}, state.maData, {
                                    maDataNormal,
                                    maDataHover,
                                }),
                                //  产品亮点
                                phData: Object.assign({}, state.phData, {
                                    phList,
                                    highLightsImgs
                                })
                            };
                        });
                    }),
                //  应用场景
                requestGetClientCase(NAVINET.type1)
                    .then(data => {
                        this.setState((state) => {
                            return {
                                nasData: Object.assign({}, state.nasData, { list: data })
                            };
                        });
                    }),
                //  客户案例
                requestGetClientCase(NAVINET.type2)
                    .then(data => {
                        //  console.log(data);
                        this.setState((state) => {
                            return {
                                nCustomerCaseData: Object.assign({}, state.nCustomerCaseData, data[0])
                            };
                        });
                    }),

            ])
                .then(() => {
                    const { setComponentDidMountFinish } = this.props;
                    //  父组件初始化完成
                    setComponentDidMountFinish(true);
                    console.log('setState结果是🍎', this.state);
                });
        }

        render(){
            const {
                maData,
                phData,
                systemArchitectureData,
                nALData,
                nasData,
                deployData,
                nCustomerCaseData,
            } = this.state;
            return (
                <div className="App">
                    {/*头部*/}
                    <BasicHeader/>
                    {/*合作咨询定位组件*/}
                    <ScrollFixed RenderElement={FixedBarBox}/>
                    {/*轮播*/}
                    <BannerManage bannerType={17}/>
                    {/*方案优势*/}
                    <div id="m1" pc={60} mobile={30}/>
                    <MultipleAdvantages maData={maData}/>
                    {/*产品亮点*/}
                    <ProductHighlights phData={phData}/>
                    {/*系统架构*/}
                    <SystemArchitecture systemArchitectureData={systemArchitectureData}/>
                    {/*算法库*/}
                    <NAL nALData={nALData}/>
                    {/*应用场景*/}
                    <NavinetApplyScene nasData={nasData}/>
                    {/*已在中国及海外市场批量部署*/}
                    <Deploy deployData={deployData}/>
                    {/*客户案例*/}
                    <div id="m2" pc={60} mobile={30}/>
                    <NCustomerCase nCustomerCaseData={nCustomerCaseData}/>
                    {/*视频本身*/}
                    <VideoWrap/>
                    {/*更多*/}
                    <GetMoreBox/>
                    {/*表单*/}
                    <PopForm/>
                    {/*toast*/}
                    <Toast/>
                    {/*脚部*/}
                    <BasicFooter/>
                </div>
            );
        }
    }
);