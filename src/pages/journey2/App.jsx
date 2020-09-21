import React, { Component } from 'react';
import { BasicHeader } from '@components/basicHeader';
import { BasicFooter } from '@components/basicFooter';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '@store/reduxMap';
import { clipData, commonRelativeWideFn, getBrowserInfo, setJSONData } from '@utils/utils';
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
import { VideoWrap } from '@components/video';
import { PopForm } from '@components/popForm';
import { Toast } from '@components/toast';
import { requestGetClientCase, requestGetImgTitle, requestGetPageContent } from '@api/index';
import { JOURNEY2, NAV_CAT_ID } from '@utils/constant';
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
                //  高性能视觉感知1
                hPData1: null,
                hPData3: null,
                hPData2: null,
                //  地平线智能驾驶产品矩阵
                productMatrixData: null,
                //  JSON
                baseParamData: {
//                    listTitle: '规格参数',
//                    list: [
//                        {
//                            label: 'CPU处理器',
//                            desc: 'Dual-Core ARM<sup>®</sup> Cortex<sup>®</sup>-A53 up to 1 GHz',
//                        },
//                        {
//                            label: 'AI处理器',
//                            desc: 'Dual-Core Bernoulli architecture BPU',
//                        },
//                        {
//                            label: '外围存储接口',
//                            desc: '32-bit LPDDR4 @ 2667 MHz (MAX 2GB)<br>SPI-Nor Flash interface',
//                        },
//                        {
//                            label: '视频输入输出',
//                            desc: '1080p@30fps, 1080p@60fps, 720p@120fps<br/>MIPI interface: CSI-2 RX and TX, 4 lanes each',
//                        },
//                        {
//                            label: 'AI 工具链',
//                            desc: '支持主流的神经网络<br/>模型编译和优化工具<br/>灵活易用的 SDK 和 API'
//                        },
//                        {
//                            label: '外围接口',
//                            desc: '2 × I2S , 3 × SPI , 4 × I2C , and 4 × UART<br/>1 × Gigabit Ethernet MAC , 2 × SDIO<br/>Multiple GPIO and PWM'
//                        },
//                        {
//                            label: '芯片物理规格',
//                            desc: '车规级认证：AEC-Q100 Grade 2 <br/> Tj温度：-40°C ~ 125°C'
//                        },
//                        {
//                            label: '',
//                            desc: '典型功耗：2W <br/>封装：FCBGA388 , 17 × 17 mm, 0.8 mm pitch',
//                        }
//                    ]
                }
            };
        }

        componentDidMount(){
            Promise.all([
                //  获取页面文案接口
                requestGetPageContent(JOURNEY2.name)
                    .then(data => {
                        this.setState((state) => {
                            console.log(data[4]);
                            setJSONData(data[4]);
                            return {
                                //  高性能视觉感知1
                                hPData1: Object.assign({}, state.hPData1, data[0]),
                                hPData2: Object.assign({}, state.hPData2, data[1]),
                                hPData3: Object.assign({}, state.hPData3, data[2]),
                                //  地平线智能驾驶产品矩阵
                                productMatrixData: Object.assign({}, state.productMatrixData, data[3]),
                                //  规格参数
                                baseParamData: Object.assign({}, state.baseParamData, data[4]),
                            };
                        });
                    }),
                //  获取图片标题接口
                requestGetImgTitle(JOURNEY2.name)
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
//                //  客户案例  ，视频用
//                requestGetClientCase(JOURNEY2.type)
//                    .then(data => {
//                        console.log(data);
//                    })
            ]).then(() => {
                const { setComponentDidMountFinish } = this.props;
                //  父组件初始化完成
                setComponentDidMountFinish(true);
                console.log('setState结果是🍎', this.state);
            });
        }

        render(){
            const {
                cdrbData,
                hPData1,
                hPData2,
                hPData3,
                productMatrixData,
                baseParamData
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
                    {/*高知觉*/}
                    <HighPerception data={hPData1}/>
                    <EdgeComputing data={hPData2}/>
                    <HighPerception data={hPData3}/>
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
                    {/*toast*/}
                    <Toast/>
                    {/*视频本身*/}
                    <VideoWrap/>
                    {/*脚部*/}
                    <BasicFooter/>
                </div>
            );
        }
    }
);