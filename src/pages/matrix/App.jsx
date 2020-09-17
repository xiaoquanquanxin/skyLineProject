import React, { Component } from 'react';
import { BasicHeader } from '@components/basicHeader';
import { BasicFooter } from '@components/basicFooter';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '@store/reduxMap';
import { requestGetBannerByType } from '@api/index';
import { commonRelativeWideFn, getBrowserInfo } from '@utils/utils';
import { navSortByRank } from '@utils/utils';
import './index.less';
import { ScrollFixed } from '@components/scrollFixed';
import { FixedBarBox } from '@components/fixedBarBox';
import { BannerManage } from '@components/bannerManage';
import { AwardsBox } from '@components/matrix/awardsBox';
import { FourBlocks } from '@components/fourBlocks';
import { MatrixPerception } from '@components/matrix/matrixPerception';
import { ToolSuite } from '@components/matrix/toolSuite';
import { ChainBox } from '@components/matrix/chainBox';
import { HardwareSpecification } from '@components/matrix/hardwareSpecification';
import { GetMoreBox } from '@components/getMoreBox';
import { PopForm } from '@components/popForm';
import { MatrixApplyScene } from '@components/matrix/matrixApplyScene';

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    class App extends Component {
        constructor(props){
            super(props);
            this.state = {
                //  荣获多项国际大奖
                awardsBoxData: null,
                //  四个一块的
                cdrbData: null,
                //  高性能图像感知能力
                perceptionData: null,
                //  开发工具套件
                toolSuiteData: null,
                //  开放工具链
                chainBoxData: null,
                //  硬件关键规格
                hsData: null,
                //  应用场景
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
                    //  荣获多项国际大奖
                    awardsBoxData: {
                        title: '荣获多项国际大奖',
                        list: [{
                            img: 'http://horizon.wx.h5work.com/images/product/martix/logo-1@2x.png',
                            name: '2019 CES<br>INNOVATION AWARDS',
                            desc: '凭借强大的感知计算能力，地平线 Matrix 荣获车辆智能和自动驾驶技术类 2019 CES 创新奖，这也是该分类奖项下唯一获此殊荣的中国产品。'
                        }, {
                            img: 'http://horizon.wx.h5work.com/images/product/martix/logo-2@2x.png',
                            name: '2019 CES<br>INNOVATION AWARDS',
                            desc: '凭借强大的感知计算能力，地平线 Matrix 荣获车辆智能和自动驾驶技术类 2019 CES 创新奖，这也是该分类奖项下唯一获此殊荣的中国产品。'
                        }, {
                            img: 'http://horizon.wx.h5work.com/images/product/martix/logo-2@2x.png',
                            name: '2019 CES<br>INNOVATION AWARDS',
                            desc: '凭借强大的感知计算能力，地平线 Matrix 荣获车辆智能和自动驾驶技术类 2019 CES 创新奖，这也是该分类奖项下唯一获此殊荣的中国产品。'
                        }]
                    },
                    //  四个一块的
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
                    //  高性能图像感知能力
                    perceptionData: {
                        title: '高性能图像感知能力',
                        desc: '通过稀疏化和定点化的神经网络，高效实现全面而高精度的感知任务，包括多达 23 类的像素级语义分割以及全面的目标物体 2D/3D 检测和分类。',
                        list: [{
                            name: '常见道路动态物体',
                            nameDesc: '多种类型交通灯、交通牌、路面标识等',
                            img: 'http://horizon.wx.h5work.com/images/product/martix/matrix-img04@2x.png'
                        }, {
                            name: '常见道路动态物体',
                            nameDesc: '多种类型交通灯、交通牌、路面标识等',
                            img: 'http://horizon.wx.h5work.com/images/product/martix/matrix-img04@2x.png'
                        }, {
                            name: '常见道路动态物体',
                            nameDesc: '多种类型交通灯、交通牌、路面标识等',
                            img: 'http://horizon.wx.h5work.com/images/product/martix/matrix-img04@2x.png'
                        }],
                        img: 'http://horizon.wx.h5work.com/images/product/martix/board@2x.png',
                    },
                    //  开发工具套件
                    toolSuiteData: {
                        title: '开发工具套件',
                        desc: '与计算平台配套提供数据采集和回灌工具，提升开发验证效率，降低开发成本。',
                        list: [{
                            name: '抓帧器',
                            img: 'http://horizon.wx.h5work.com/images/product/martix/matrix-img06@2x.png',
                            desc: '车载数据采集平台，提供最多 12 路视频输入'
                        }, {
                            name: '抓帧器',
                            img: 'http://horizon.wx.h5work.com/images/product/martix/matrix-img06@2x.png',
                            desc: '车载数据采集平台，提供最多 12 路视频输入'
                        }]
                    },
                    //  开放工具链
                    chainBoxData: {
                        img: 'http://horizon.wx.h5work.com/images/product/martix/matrix-img08@2x.png',
                        title: '开放工具链',
                        desc: '地平线自主研发的工具链，开发者和研究人员可以基于地平线 Matrix 平台部署神经网络模型，进行开发、验证、优化和部署，支持多种主流框架。',
                    },
                    //  硬件关键规格
                    hsData: {
                        title: '硬件关键规格',
                        desc: '针对不同应用场景的传感器布置方案，Matrix 系列分别推出 4 路和 1 路接入的两种平台，灵活满足模块化需求。',
                        imgList: [{
                            name: 'Matrix 2 <sup>Mono</sup>',
                            img: 'http://horizon.wx.h5work.com/images/product/martix/matrix-img09@2x.png',
                        }, {
                            name: 'Matrix 2 <sup>Mono</sup>',
                            img: 'http://horizon.wx.h5work.com/images/product/martix/matrix-img09@2x.png',
                        }],
                        tableList: [{
                            name: '征程2 处理芯片',
                            content1: true,
                            content2: true,
                        }, {
                            name: '视频输入',
                            content1: '1 路 1080p@30fps',
                            content2: '4 路 1080p@30fps',
                        }, {
                            name: '功耗',
                            content1: '8W ，被动散热',
                            content2: '20W ，被动散热',
                        }, {
                            name: '语义分割目标检测和分类',
                            content1: true,
                            content2: true,
                        }, {
                            name: '60ms 低延时',
                            content1: true,
                            content2: true,
                        }, {
                            name: '工作环境',
                            content1: '-40 °C ~ 85 °C',
                            content2: '-40 °C ~ 85 °C',
                        }]
                    },

                    //  应用场景
                    applySceneData: {
                        title: '应用场景',
                        desc: '地平线通过提供即装即用的视觉感知方案赋能客户，使客户得以专注于用户体验差异化的提升和车队的规模化部署运营，从而在快速发展的市场中赢得先机。',
                        list: [{
                            name: '无人的士/小巴',
                            img: 'http://horizon.wx.h5work.com/images/product/martix/matrix-img13@2x.png'
                        }, {
                            name: '无人的士/小巴',
                            img: 'http://horizon.wx.h5work.com/images/product/martix/matrix-img13@2x.png'
                        }, {
                            name: '无人的士/小巴',
                            img: 'http://horizon.wx.h5work.com/images/product/martix/matrix-img13@2x.png'
                        }]
                    }
                };
            });
            setTimeout(() => {
                const { setComponentDidMountFinish } = this.props;
                console.log('请求成功了');
                //  父组件初始化完成
                setComponentDidMountFinish(true);
            }, 20);
        }

        render(){
            const { awardsBoxData, cdrbData, perceptionData, toolSuiteData, chainBoxData, hsData, applySceneData } = this.state;
            return (
                <div className="App">
                    {/*头部*/}
                    <BasicHeader/>
                    {/*合作咨询定位组件*/}
                    <ScrollFixed RenderElement={FixedBarBox}/>
                    <div id="m1" pc={60} mobile={30}/>
                    {/*banner轮播*/}
                    <BannerManage bannerType={11}/>
                    {/*荣获多项国际大奖*/}
                    <AwardsBox awardsBoxData={awardsBoxData}/>
                    {/*四个一块*/}
                    <FourBlocks data={cdrbData} isLight={true}/>
                    {/*高性能图像感知能力*/}
                    <MatrixPerception perceptionData={perceptionData}/>
                    {/*开发工具套件*/}
                    <ToolSuite toolSuiteData={toolSuiteData}/>
                    {/*开放工具链*/}
                    <ChainBox chainBoxData={chainBoxData}/>
                    {/*硬件关键规格*/}
                    <div id="m2" pc={60} mobile={80}/>
                    {/*硬件关键规格*/}
                    <HardwareSpecification hsData={hsData}/>
                    {/*应用场景*/}
                    <MatrixApplyScene applySceneData={applySceneData}/>
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