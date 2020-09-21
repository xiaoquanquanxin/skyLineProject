import React, { Component } from 'react';
import { BasicHeader } from '@components/basicHeader';
import { BasicFooter } from '@components/basicFooter';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '@store/reduxMap';
import { clipData, commonRelativeWideFn, getBrowserInfo } from '@utils/utils';
import { ScrollFixed } from '@components/scrollFixed';
import { FixedBarBox } from '@components/fixedBarBox';
import { BannerManage } from '@components/bannerManage';
import { FourBlocks } from '@components/fourBlocks';
import { Sunrise3BpuBox } from '@components/sunrise3/bpuBox';
import { SuperIsp } from '@components/sunrise3/superIsp';
import { VideoProcessing } from '@components/sunrise3/videoProcessing';
import { OpenExplorer } from '@components/sunrise3/openExplorer';
import { RichInterface } from '@components/sunrise3/richInterface';
import { GetMoreBox } from '@components/getMoreBox';
import { PopForm } from '@components/popForm';
import { ApplyScene } from '@components/applyScene';
import { Toast } from '@components/toast';
import './index.less';
import { requestGetClientCase, requestGetImgTitle, requestGetPageContent } from '@api/index';
import { JOURNEY3, NAV_CAT_ID, SUNRISE3 } from '@utils/constant';

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    class App extends Component {
        constructor(props){
            super(props);
            this.state = {
                //  四个一块的
                cdrbData: null,
                //  伯努利2.0 BPU
                sunrise3BpuBoxData: null,
                //  面向高画质 ISP
                superIspData: null,
                //  强大的视频处理能力
                videoProcessingData: null,
                //  地平线 “天工开物”
                openExplorerData: null,
                //  旭日3 系列——释放 “芯” 效能
                richInterfaceData: null,
                //  应用场景
                applySceneData: null,
            };
            //  页面宽度监听
            commonRelativeWideFn(this.props.setRelativeWideFn);
            //  页面滚动监听
            getBrowserInfo(this.props.setBrowserScrollInfoFn);
        }

        componentDidMount(){
            //  JSON
            this.setState(() => {
                return {
                    sunrise3BpuBoxData: {
                        list: [{}, {}, {}]
                    },
                    richInterfaceData: {
                        title: '旭日3 系列——释放 “芯” 效能',
                        desc: '旭日3 系列包含 X3M 和 X3E 两颗芯片，X3M 主要面向 8M 智能前视市场和边缘计算，提供 5TOPS AI 等效算力；X3E 主要面向 5M 智能前视市场，提供 3TOPS AI 等效算力。',
                        list_1: [{
                            label: 'Computing',
                            content: 'Bernoulli 2.0 Dual-Core BPU 5TOPS <br/>Quad-Core CotexA53 CPU <br/> Cortex-R5 MCU'
                        }, {
                            label: 'Computing',
                            content: 'Bernoulli 2.0 Dual-Core BPU 5TOPS <br/>Quad-Core CotexA53 CPU <br/> Cortex-R5 MCU'
                        }, {
                            label: 'Computing',
                            content: 'Bernoulli 2.0 Dual-Core BPU 5TOPS <br/>Quad-Core CotexA53 CPU <br/> Cortex-R5 MCU'
                        }],

                        list_2: [{
                            label: 'Computing',
                            content: 'MIPI-CSI Rx@4Lane, Tx@4Lane<br/>DVP MIPI-DSI<br/>RGB24/16bit LCD IF<br/>BT.1120/656'
                        }, {
                            label: 'Computing',
                            content: 'MIPI-CSI Rx@4Lane, Tx@4Lane<br/>DVP MIPI-DSI<br/>RGB24/16bit LCD IF<br/>BT.1120/656'
                        }, {
                            label: 'Computing',
                            content: 'MIPI-CSI Rx@4Lane, Tx@4Lane<br/>DVP MIPI-DSI<br/>RGB24/16bit LCD IF<br/>BT.1120/656'
                        }],
                    },
                };
            });
            Promise.all([
                //  获取页面文案接口
                requestGetPageContent(SUNRISE3.name)
                    .then(data => {
                        this.setState((state) => {
                            return {
                                //  伯努利2.0 BPU
                                sunrise3BpuBoxData: Object.assign({}, state.sunrise3BpuBoxData, data[0]),
                                //  面向高画质 ISP
                                superIspData: Object.assign({}, state.superIspData, data[1]),
                                //  强大的视频处理能力
                                videoProcessingData: Object.assign({}, state.videoProcessingData, data[2]),
                                //  地平线 “天工开物”
                                openExplorerData: Object.assign({}, state.openExplorerData, data[3]),
                                //  旭日3 系列——释放 “芯” 效能
                                richInterfaceData: Object.assign({}, state.richInterfaceData, data[4]),
                            };
                        });
                    }),
                //  获取图片标题接口
                requestGetImgTitle(SUNRISE3.name)
                    .then(data => {
                        //  四个一块的
                        const cdrbData = clipData(data, NAV_CAT_ID, data[0][NAV_CAT_ID]);
                        this.setState((state) => {
                            return {
                                //  四个一块的
                                cdrbData: Object.assign([], state.cdrbData, cdrbData),
                            };
                        });
                    }),
                //  客户案例
                requestGetClientCase(SUNRISE3.type)
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
            const { cdrbData, sunrise3BpuBoxData, superIspData, videoProcessingData, openExplorerData, richInterfaceData, applySceneData } = this.state;
            return (
                <div className="App">
                    {/*头部*/}
                    <BasicHeader/>
                    {/*合作咨询定位组件*/}
                    <ScrollFixed RenderElement={FixedBarBox}/>
                    <div id="m1" pc={60} mobile={30}/>
                    <BannerManage bannerType={10}/>
                    <FourBlocks data={cdrbData}/>
                    {/*伯努利2.0 BPU*/}
                    <Sunrise3BpuBox sunrise3BpuBoxData={sunrise3BpuBoxData}/>
                    {/*面向高画质 ISP*/}
                    <SuperIsp superIspData={superIspData}/>
                    {/*强大的视频处理能力*/}
                    <VideoProcessing videoProcessingData={videoProcessingData}/>
                    {/*地平线 “天工开物”*/}
                    <OpenExplorer openExplorerData={openExplorerData} isLight={false}/>
                    {/*旭日3 系列——释放 “芯” 效能*/}
                    <div id="m2" pc={20} mobile={15}/>
                    <RichInterface richInterfaceData={richInterfaceData}/>
                    {/*应用场景，无文字，纯图片*/}
                    <ApplyScene applySceneData={applySceneData} sceneType={0}/>
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