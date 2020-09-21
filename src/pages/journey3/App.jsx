import React, { Component } from 'react';
import { BasicHeader } from '@components/basicHeader';
import { BasicFooter } from '@components/basicFooter';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '@store/reduxMap';
import { clipData, commonRelativeWideFn, getBrowserInfo } from '@utils/utils';
import { FixedBarBox } from '@components/fixedBarBox';
import { ScrollFixed } from '@components/scrollFixed';
import { BannerManage } from '@components/bannerManage';
import { FourBlocks } from '@components/fourBlocks';
import { BaseParam } from '@components/journey2/baseParam';
import { GetMoreBox } from '@components/getMoreBox';
import { PopForm } from '@components/popForm';
import { Toast } from '@components/toast';
import { JOURNEY3, NAV_CAT_ID } from '@utils/constant';
import { requestGetClientCase, requestGetImgTitle, requestGetPageContent } from '@api/index';
import { OpenExplorer } from '@components/sunrise3/openExplorer';
import { UltraLowPower } from '@components/journey3/ultraLowPower';
import { ApplyScene } from '@components/applyScene';
import './index.less';

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    class App extends React.Component {
        constructor(props){
            super(props);
            //  页面宽度监听
            commonRelativeWideFn(this.props.setRelativeWideFn);
            //  页面滚动监听
            getBrowserInfo(this.props.setBrowserScrollInfoFn);

            this.state = {
                //  四个一块的
                cdrbData: null,
                //  超低功耗
                ultraLowPowerData1: null,
                ultraLowPowerData2: null,
                ultraLowPowerData3: null,
                ultraLowPowerData4: null,
                ultraLowPowerData5: null,

                //  征程3 DVB JSON
                baseParamData: {
                    listTitle: '征程3 DVB 参数指标',
                    list: [
                        {
                            label: '架构',
                            desc: '基于地平线 伯努利2.0 BPU 架构'
                        },
                        {
                            label: '高算力',
                            desc: '等效 5TOPS AI 性能，4 核 A53'
                        },
                        {
                            label: '高性能存储',
                            desc: '2GB LPDDR4 + 64MB NOR flash + 8GB eMMC'
                        },
                        {
                            label: '视频输入',
                            desc: '支持 4 – 6 路 Camera 接入'
                        },
                        {
                            label: '接口丰富',
                            desc: '支持千兆以太网， USB3.0 ，SPI ，I2C ，UART 等接口'
                        },
                        {
                            label: '功能安全等级',
                            desc: '搭载 ASIL-D 的 MCU 微控制器'
                        },
                        {
                            label: '支持多种应用场景',
                            desc: '高级别辅助驾驶（ ADAS ），驾驶员监控（ DMS ），自动泊车辅助（ APA ）'
                        }
                    ]
                },
                //  “天工开物” AI 开发平台
                openExplorerData: null,
                //  应用场景
                applySceneData: null,
            };
        }

        componentDidMount(){
            Promise.all([
                //  获取页面文案接口
                requestGetPageContent(JOURNEY3.name)
                    .then(data => {
                        this.setState((state) => {
                            return {
                                //  超低功耗
                                ultraLowPowerData1: Object.assign({}, state.ultraLowPowerData1, data[0]),
                                ultraLowPowerData2: Object.assign({}, state.ultraLowPowerData1, data[1]),
                                ultraLowPowerData3: Object.assign({}, state.ultraLowPowerData1, data[2]),
                                ultraLowPowerData4: Object.assign({}, state.ultraLowPowerData1, data[3]),
                                ultraLowPowerData5: Object.assign({}, state.ultraLowPowerData1, data[4]),
                                //  征程3 DVB data[5]
                                baseParamData: Object.assign({}, state.baseParamData, data[5]),
                                //  “天工开物” AI 开发平台
                                openExplorerData: Object.assign({}, state.openExplorerData, data[6]),
                            };
                        });
                    }),
                //  获取图片标题接口
                requestGetImgTitle(JOURNEY3.name)
                    .then(data => {
                        //  四个一块的
                        const cdrbData = clipData(data, NAV_CAT_ID, data[0][NAV_CAT_ID]);
                        //  console.log(data);
                        this.setState((state) => {
                            return {
                                //  四个一块的
                                cdrbData: Object.assign([], state.cdrbData, cdrbData),
                            };
                        });
                    }),
                //  客户案例
                requestGetClientCase(JOURNEY3.type)
                    .then(data => {
                        //  应用场景
                        const applySceneList = clipData(data, NAV_CAT_ID, data[0][NAV_CAT_ID]);
                        const topList = applySceneList.splice(0, 4);
                        const bottomList = applySceneList;
                        this.setState((state) => {
                            return {
                                applySceneData: Object.assign([], state.applySceneData, { topList, bottomList })
                            };
                        });

                    })
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
                cdrbData,
                ultraLowPowerData1,
                ultraLowPowerData2,
                ultraLowPowerData3,
                ultraLowPowerData4,
                ultraLowPowerData5,
                baseParamData,
                openExplorerData,
                applySceneData,
            } = this.state;

            return (
                <div className="App">
                    {/*头部*/}
                    <BasicHeader/>
                    {/*合作咨询定位组件*/}
                    <ScrollFixed RenderElement={FixedBarBox}/>
                    {/*<FixedBarBox/>*/}
                    <div id="m1" pc={60} mobile={30}/>
                    {/*banner轮播*/}
                    <BannerManage bannerType={8}/>
                    {/*四个一块*/}
                    <FourBlocks data={cdrbData}/>
                    {/*超低功耗*/}
                    <UltraLowPower ultraLowPowerData={ultraLowPowerData1}/>
                    <UltraLowPower ultraLowPowerData={ultraLowPowerData2} contentIsRight={true}/>
                    <UltraLowPower ultraLowPowerData={ultraLowPowerData3}/>
                    <UltraLowPower ultraLowPowerData={ultraLowPowerData4} contentIsRight={true}/>
                    <UltraLowPower ultraLowPowerData={ultraLowPowerData5}/>
                    {/*规格参数*/}
                    <div id="m2" pc={20} mobile={40}/>
                    {/*征程3 DVB*/}
                    <BaseParam baseParamData={baseParamData}/>
                    {/*/!*地平线 “天工开物”*!/*/}
                    <OpenExplorer openExplorerData={openExplorerData} isLight={false}/>
                    {/*应用场景，无文字，纯图片*/}
                    <ApplyScene applySceneData={applySceneData} sceneType={0}
                                bgc='linear-gradient(180deg, #1D1D21 0%, #18181B 100%)'/>
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