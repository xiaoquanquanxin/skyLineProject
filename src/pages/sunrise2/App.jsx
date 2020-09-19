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
import { AiotBox } from '@components/sunrise2/aiotBox';
import { ApplyScene } from '@components/applyScene';
import { Sunrise2mainParam } from '@components/sunrise2/mainParam';
import { GetMoreBox } from '@components/getMoreBox';
import { PopForm } from '@components/popForm';
import './index.less';
import { requestGetClientCase, requestGetImgTitle, requestGetPageContent } from '@api/index';
import { SUNRISE2, NAV_CAT_ID } from '@utils/constant';
import { Toast } from '@components/toast';

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

            Promise.all([
                //  获取页面文案接口
                requestGetPageContent(SUNRISE2.name)
                    .then(data => {
                        this.setState((state) => {
                            console.log(data);
                            return {};
                        });
                    }),
                //  获取图片标题接口
                requestGetImgTitle(SUNRISE2.name)
                    .then(data => {
                        console.log(data);
                    }),
                //  客户案例
                requestGetClientCase(SUNRISE2.type)
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
                    {/*toast*/}
                    <Toast/>
                    {/*脚部*/}
                    <BasicFooter/>
                </div>
            );
        }
    }
);