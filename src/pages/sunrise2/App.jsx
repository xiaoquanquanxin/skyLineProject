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
import { FourBlocks } from '@components/fourBlocks';
import { AiotBox } from '@components/sunrise2/aiotBox';
import { ApplyScene } from '@components/applyScene';
import { Sunrise2mainParam } from '@components/sunrise2/mainParam';
import { GetMoreBox } from '@components/getMoreBox';
import { PopForm } from '@components/popForm';

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    class App extends Component {
        constructor(props){
            super(props);

            this.state = {
                cdrbData: null,
                aiotBoxData: null,
                applySceneData: null,
                mainParamData1: null,
                mainParamData2: null,
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
                    aiotBoxData: {
                        title: '边缘计算赋能 AIoT',
                        desc: '智能物联网是未来的趋势所向，海量的碎片化场景与计算需求将使云端计算的负荷成倍增长。旭日处理器强大的边缘计算能力，可在帮助设备高效处理本地数据的同时，兼顾隐私保护。',
                        img: 'http://horizon.wx.h5work.com/images/product/sunrise2/j2-img02@2x.png',
                    },
                    //  应用场景
                    applySceneData: {
                        topList: ['http://horizon.wx.h5work.com/images/product/sunrise3/2@2x.png', 'http://horizon.wx.h5work.com/images/product/sunrise3/2@2x.png', 'http://horizon.wx.h5work.com/images/product/sunrise3/2@2x.png', 'http://horizon.wx.h5work.com/images/product/sunrise3/2@2x.png'],
                        bottomList: ['http://horizon.wx.h5work.com/images/product/sunrise3/7@2x.png?v=1.0', 'http://horizon.wx.h5work.com/images/product/sunrise3/7@2x.png?v=1.0', 'http://horizon.wx.h5work.com/images/product/sunrise3/7@2x.png?v=1.0', 'http://horizon.wx.h5work.com/images/product/sunrise3/7@2x.png?v=1.0', 'http://horizon.wx.h5work.com/images/product/sunrise3/7@2x.png?v=1.0']
                    },
                    //  主要参数、芯片规格
                    mainParamData1: {
                        title: '主要参数',
                        list: [{
                            label: '高性能',
                            list: ['● 支持 MIPI 、DVP 、BT.1120输入、输出', '● 最大输入分辨率 4K']
                        }, {
                            label: '高性能',
                            list: ['● 支持 MIPI 、DVP 、BT.1120输入、输出', '● 最大输入分辨率 4K最大输入分辨率 4K 最大输入分辨率 4K']
                        }, {
                            label: '高性能',
                            list: ['● 支持 MIPI 、DVP 、BT.1120输入、输出', '● 最大输入分辨率 4K']
                        }, {
                            label: '高性能',
                            list: ['● 支持 MIPI 、DVP 、BT.1120输入、输出', '● 最大输入分辨率 4K']
                        }]
                    },
                    mainParamData2: {
                        title: '芯片规格',
                        list: [{
                            label: '高性能',
                            list: ['● 支持 MIPI 、DVP 、BT.1120输入、输出', '● 最大输入分辨率 4K']
                        }, {
                            label: '高性能',
                            list: ['● 支持 MIPI 、DVP 、BT.1120输入、输出', '● 最大输入分辨率 4K']
                        }, {
                            label: '高性能',
                            list: ['● 支持 MIPI 、DVP 、BT.1120输入、输出', '● 最大输入分辨率 4K']
                        }]
                    },
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
            const { cdrbData, aiotBoxData, applySceneData, mainParamData1, mainParamData2 } = this.state;
            return (
                <div className="App">
                    {/*头部*/}
                    <BasicHeader/>
                    {/*合作咨询定位组件*/}
                    <ScrollFixed RenderElement={FixedBarBox}/>
                    <div id="m1" pc={60} mobile={30}/>
                    <BannerManage bannerType={9}/>
                    <FourBlocks data={cdrbData}/>
                    {/*边缘计算赋能 AIoT*/}
                    <AiotBox aiotBoxData={aiotBoxData}/>
                    {/*应用场景*/}
                    {/*应用场景，无文字，纯图片*/}
                    <ApplyScene applySceneData={applySceneData} sceneType={0}/>
                    {/*主要参数*/}
                    <div id="m2" pc={60} mobile={40}/>
                    <Sunrise2mainParam mainParamData={mainParamData1}/>
                    <Sunrise2mainParam mainParamData={mainParamData2}/>
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