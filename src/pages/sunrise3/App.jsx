import React, { Component } from 'react';
import { BasicHeader } from '@components/basicHeader';
import { BasicFooter } from '@components/basicFooter';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '@store/reduxMap';
import { commonRelativeWideFn, getBrowserInfo } from '@utils/utils';
import './index.less';
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

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    class App extends Component {
        constructor(props){
            super(props);
            this.state = {
                cdrbData: null,
                sunrise3BpuBoxData: null,
                superIspData: null,
                videoProcessingData: null,
                openExplorerData: null,
                richInterfaceData: null,
                applySceneData: null,
            };
            //  页面宽度监听
            commonRelativeWideFn(this.props.setRelativeWideFn);
            //  页面滚动监听
            getBrowserInfo(this.props.setBrowserScrollInfoFn);
        }

        componentDidMount(){
            this.setState(() => {
                return {
                    cdrbData: [
                        {
                            img: 'http://horizon.wx.h5work.com/images/product/journey2/j2-icon01@2x.png',
                            name: '针对智能驾驶场景优化',
                        },
                        {
                            img: 'http://horizon.wx.h5work.com/images/product/journey2/j2-icon02@2x.png',

                            name: '软硬件高效协同'
                        },
                        {
                            img: 'http://horizon.wx.h5work.com/images/product/journey2/j2-icon03@2x.png',
                            name: '强大的边缘计算能力'
                        },
                        {
                            img: 'http://horizon.wx.h5work.com/images/product/journey2/j2-icon04@2x.png',
                            name: '低延时/低功耗'
                        }
                    ],
                    sunrise3BpuBoxData: {
                        title: '伯努利2.0 BPU',
                        desc: '从AIoT场景需求出发，在设计过程中采取算法、计算架构、编译器联合设计，使得在功耗不变的情况下，AI性提高数倍。贝努利II架构兼具灵活与高效，能灵活适应AI算法的快速演进，高效支持最先进的网络结构。',
                        list: [{}, {}, {}]
                    },
                    superIspData: {
                        title: '面向高画质 ISP',
                        desc: '先进的 ISP 处理算法，使得在宽动态、低照度场景下，也能得到高质量的图像。',
                        img: 'http://horizon.wx.h5work.com/images/product/sunrise3/S3-img03@2x.png',
                    },
                    videoProcessingData: {
                        desc: '旭日3 可同时处理不同分辨率 4 ~ 8 个 Camera Sensor 的输入，并支持多种图像后处理：如畸变矫正、拼接、金字塔等。 同时支持 H.264 / H.265编解码，性能达到4K@60fps 。',
                        title: '强大的视频处理能力',
                        img: 'http://horizon.wx.h5work.com/images/product/sunrise3/S3-img04@2x.png',
                    },
                    openExplorerData: {
                        title: '地平线 “天工开物”',
                        desc: '“天工开物” 是地平线针对边缘 AI 产品研发周期长、投入大等特点，专门打造的，从模型训练到芯片部署皆包含在内的“端到端” AI 软件解决方案。力求全方位赋能客户、降低研发成本，并加速 AI 产品落地。',
                        img: 'http://horizon.wx.h5work.com/images/product/sunrise3/S3-img05@2x.png',
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
                    applySceneData: {
                        topList: ['http://horizon.wx.h5work.com/images/product/sunrise3/2@2x.png', 'http://horizon.wx.h5work.com/images/product/sunrise3/2@2x.png', 'http://horizon.wx.h5work.com/images/product/sunrise3/2@2x.png', 'http://horizon.wx.h5work.com/images/product/sunrise3/2@2x.png'],
                        bottomList: ['http://horizon.wx.h5work.com/images/product/sunrise3/7@2x.png?v=1.0', 'http://horizon.wx.h5work.com/images/product/sunrise3/7@2x.png?v=1.0', 'http://horizon.wx.h5work.com/images/product/sunrise3/7@2x.png?v=1.0', 'http://horizon.wx.h5work.com/images/product/sunrise3/7@2x.png?v=1.0', 'http://horizon.wx.h5work.com/images/product/sunrise3/7@2x.png?v=1.0']
                    }
                };
            });
            setTimeout(() => {
                const { setComponentDidMountFinish } = this.props;
                console.log('请求成功了');
                //  父组件初始化完成
                setComponentDidMountFinish(true);
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
                    {/*脚部*/}
                    <BasicFooter/>
                </div>
            );
        }
    }
);