import React, { Component } from 'react';
import { BasicHeader } from '@components/basicHeader';
import { BasicFooter } from '@components/basicFooter';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '@store/reduxMap';
import { requestGetClientCase, requestGetCockPitPartner, requestGetImgTitle, requestGetPageContent } from '@api/index';
import { clipData, commonRelativeWideFn, getBrowserInfo, getContentList, setListJSONData } from '@utils/utils';
import { navSortByRank } from '@utils/utils';
import './index.less';
import { BannerManage } from '@components/bannerManage';
import { ScrollFixed } from '@components/scrollFixed';
import { FixedBarBox } from '@components/fixedBarBox';
import { NAV_CAT_ID, INTELLIGENT_COCKPIT } from '@utils/constant';
import { PlanAdvantage } from '@components/intelligent-cockpit/planAdvantage';
import { ProductArchitecture } from '@components/intelligent-cockpit/productArchitecture';
import { CoreAlgorithm } from '@components/intelligent-cockpit/coreAlgorithm';
import { AlgorithmsLibrary } from '@components/intelligent-cockpit/algorithmsLibrary';
import { IcCustomerCase } from '@components/intelligent-cockpit/icCustomerCase';
import { AdvertisementBanner } from '@components/bannerManage/advertisementBanner';
import { GetMoreBox } from '@components/getMoreBox';
import { PopForm } from '@components/popForm';
import { Toast } from '@components/toast';

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    class App extends Component {
        constructor(props){
            super(props);
            this.state = {
                //  方案优势
                planAdvantageData: null,
                //  产品结构
                productArchitectureData: null,
                //  核心算法介绍
                coreAlgorithmData: null,
                //  算法库
                algorithmsLibraryData: null,
                //  客户案例
                customerCaseData: {
                    title: '客户案例'
                },
                //  合作伙伴
                customList: null,
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
            this.setState((state) => {
                //  产品架构        todo
                const list = [
                    {
                        title: '硬件平台',
                        desc: '通过将两路摄像头、两路麦克风的数<br>据接入到芯片进行相关感知算法的处<br>理，同时通过 Can 获取车身信号',
                    },
                    {
                        title: '输入层',

                        desc: '通过感知用户的人脸特征、行为特征、语<br>义特征作为输入，同时结合用户在座舱的<br>主动行为作为输入',
                    },
                    {
                        title: '处理层',
                        desc: '将用户的感知数据、用户的使用行为数据、用户的主动输入数据<br>以及外部的第三方数据进行数据融合，分析用户所处的场景，然<br>后进行精准的决策',
                    },
                    {
                        title: '输出层',
                        desc: '接收处理层的决策信号，实现诸如：座椅、空调、天窗等车控功能的智能化、主动化',
                    }
                ].reverse();
                return {
                    //  产品架构
                    productArchitectureData: Object.assign({}, state.productArchitectureData, {
                        list,
                    }),
                };
            });
            //  图片desc里应该有
//            //  JSON
//            this.setState((state) => {
//                const descList = [
//                    [
//
//                    ],
//                    [],
//                ];
//                return {
//                    customerCaseData: Object.assign({}, state.customerCaseData, {
//                        descList,
//                    })
//                };
//            });
            Promise.all([
                //  获取页面文案接口
                requestGetPageContent(INTELLIGENT_COCKPIT.name)
                    .then(data => {
                        console.log(data);
                        setListJSONData(data[0]);
                        setListJSONData(data[1]);
                        this.setState((state) => {
                            return {
                                //  产品架构
                                productArchitectureData: Object.assign({}, state.productArchitectureData, data[0]),
                                //  算法库
                                algorithmsLibraryData: Object.assign({}, state.algorithmsLibraryData, data[1]),
                                //  方案优势
                                planAdvantageData: Object.assign({}, state.planAdvantageData, data[2]),
                                //  todo
                                //  核心算法介绍
                            };
                        });
                    }),
                //  获取图片标题接口
                requestGetImgTitle(INTELLIGENT_COCKPIT.name)
                    .then(data => {
                        //  方案优势
                        const planAdvantageDataList = clipData(data, NAV_CAT_ID, data[0][NAV_CAT_ID]);
                        //  算法核心介绍
                        const coreAlgorithmDataList = clipData(data, NAV_CAT_ID, data[0][NAV_CAT_ID]);
                        //  用户案例
                        const descList = clipData(data, NAV_CAT_ID, data[0][NAV_CAT_ID]);
                        this.setState((state) => {
                            return {
                                //  方案优势
                                planAdvantageData: Object.assign({}, state.planAdvantageData, { list: planAdvantageDataList }),
                                //  算法核心介绍
                                coreAlgorithmData: Object.assign({}, state.coreAlgorithmData, { list: coreAlgorithmDataList }),
                                //  用户案例
                                customerCaseData: Object.assign({}, state.customerCaseData, { descList, })
                            };
                        });
                    }),
                //  客户案例
                requestGetClientCase(INTELLIGENT_COCKPIT.type)
                    .then(data => {
                        this.setState((state) => {
                            return {
                                customerCaseData: Object.assign({}, state.customerCaseData, { list: data })
                            };
                        });

                    }),
                //  合作伙伴
                requestGetCockPitPartner()
                    .then(v => {
                        navSortByRank(v.data, 'rank');
                        this.setState(() => {
                            return {
                                customList: v.data,
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
                planAdvantageData,
                productArchitectureData,
                coreAlgorithmData,
                algorithmsLibraryData,
                customerCaseData,
                customList
            } = this.state;
            return (
                <div className="App">
                    {/*头部*/}
                    <BasicHeader/>
                    {/*合作咨询定位组件*/}
                    <ScrollFixed RenderElement={FixedBarBox}/>
                    <div id="m1" pc={60} mobile={30}/>
                    <BannerManage bannerType={16}/>
                    {/*方案优势*/}
                    <PlanAdvantage planAdvantageData={planAdvantageData}/>
                    {/*产品架构*/}
                    <ProductArchitecture productArchitectureData={productArchitectureData}/>
                    {/*算法核心介绍*/}
                    <CoreAlgorithm coreAlgorithmData={coreAlgorithmData}/>
                    {/*算法库*/}
                    <AlgorithmsLibrary algorithmsLibraryData={algorithmsLibraryData}/>
                    <div id="m2" pc={60} mobile={40}/>
                    {/*客户案例*/}
                    <IcCustomerCase customerCaseData={customerCaseData}/>
                    {/*合作伙伴*/}
                    <AdvertisementBanner
                        data={customList}
                        title='合作伙伴'
                        styleType={3}
                    />
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