import React, { Component } from 'react';
import { BasicHeader } from '@components/basicHeader';
import { BasicFooter } from '@components/basicFooter';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '@store/reduxMap';
import { commonRelativeWideFn, getBrowserInfo } from '@utils/utils';
import { FixedBarBox } from '@components/fixedBarBox';
import { ScrollFixed } from '@components/scrollFixed';
import { BannerManage } from '@components/bannerManage';
import { FourBlocks } from '@components/fourBlocks';
import { HighPerception } from '@components/journey2/HighPerception';
import { EdgeComputing } from '@components/journey2/edgeComputing';
import { ProductMatrix } from '@components/journey2/productMatrix';
import { BaseParam } from '@components/journey2/baseParam';
import { Journey2Video } from '@components/journey2/journey2Video';
import { GetMoreBox } from '@components/getMoreBox';
import './index.less';
import { VideoWrap } from '@components/video';
import { PopForm } from '@components/popForm';
import { Toast } from '@components/toast';

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
                highPerceptionData: {
                    desc: '基于地平线自研 BPU（ Brain Processing Unit )，<br/>征程芯片可以帮助车辆实现高性能的视觉感知，<br/>加速智能驾驶落地。',
                    img: 'http://horizon.wx.h5work.com/images/product/journey2/j2-img02@2x.png',
                    title: '高性能视觉感知'
                },
                productMatrixData: {
                    title: '地平线智能驾驶产品矩阵',
                    desc: '包括 ADAS 、多模交互、NaviNet 等在内的驾驶产品可与征程芯片完美兼容及适配，为后期升级提供无限可能。',
                    img: 'http://horizon.wx.h5work.com/images/product/journey2/matrix.png?v=1.1'
                },
                baseParamData: {
                    listTitle: '规格参数',
                    list: [
                        {
                            label: 'CPU处理器',
                            desc: 'Dual-Core ARM<sup>®</sup> Cortex<sup>®</sup>-A53 up to 1 GHz',
                        },
                        {
                            label: 'AI处理器',
                            desc: 'Dual-Core Bernoulli architecture BPU',
                        },
                        {
                            label: '外围存储接口',
                            desc: '32-bit LPDDR4 @ 2667 MHz (MAX 2GB)<br>SPI-Nor Flash interface',
                        },
                        {
                            label: '视频输入输出',
                            desc: '1080p@30fps, 1080p@60fps, 720p@120fps<br/>MIPI interface: CSI-2 RX and TX, 4 lanes each',
                        },
                        {
                            label: 'AI 工具链',
                            desc: '支持主流的神经网络<br/>模型编译和优化工具<br/>灵活易用的 SDK 和 API'
                        },
                        {
                            label: '外围接口',
                            desc: '2 × I2S , 3 × SPI , 4 × I2C , and 4 × UART<br/>1 × Gigabit Ethernet MAC , 2 × SDIO<br/>Multiple GPIO and PWM'
                        },
                        {
                            label: '芯片物理规格',
                            desc: '车规级认证：AEC-Q100 Grade 2 <br/> Tj温度：-40°C ~ 125°C'
                        },
                        {
                            label: '',
                            desc: '典型功耗：2W <br/>封装：FCBGA388 , 17 × 17 mm, 0.8 mm pitch',
                        }
                    ]
                }
            };
        }

        componentDidMount(){
            setTimeout(() => {
                const { setComponentDidMountFinish } = this.props;
                console.log('请求成功了');
                //  父组件初始化完成
                setComponentDidMountFinish(true);
            }, 20);
        }

        render(){
            const { cdrbData, highPerceptionData, productMatrixData, baseParamData } = this.state;

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
                    {/*高知觉*/}
                    <HighPerception data={highPerceptionData}/>
                    <EdgeComputing data={highPerceptionData}/>
                    <HighPerception data={highPerceptionData}/>
                    {/*地平线智能驾驶产品矩阵*/}
                    <ProductMatrix data={productMatrixData}/>
                    {/*规格参数*/}
                    <div id="m2" pc={20} mobile={15}/>
                    <BaseParam baseParamData={baseParamData}/>
                    {/*视频展示*/}
                    <Journey2Video videoType={19}/>
                    {/*更多*/}
                    <GetMoreBox/>
                    {/*表单*/}
                    <PopForm/>
                    {/*视频本身*/}
                    <VideoWrap/>
                    {/*脚部*/}
                    <BasicFooter/>
                    {/*toast*/}
                    <Toast/>
                </div>
            );
        }
    }
);