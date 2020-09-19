import React, { Component } from 'react';
import { BasicHeader } from '@components/basicHeader';
import { BasicFooter } from '@components/basicFooter';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '@store/reduxMap';
import {

    requestGetClientCase,
    requestGetImgTitle,
    requestGetPageContent
} from '@api/index';
import { clipData, commonRelativeWideFn, getBrowserInfo } from '@utils/utils';
import { navSortByRank } from '@utils/utils';
import './index.less';
import { BannerManage } from '@components/bannerManage';
import { ScrollFixed } from '@components/scrollFixed';
import { FixedBarBox } from '@components/fixedBarBox';
import { ADAS, NAV_CAT_ID } from '@utils/constant';
import { CustomerCase } from '@components/CustomerCase';
import { FourBlocks } from '@components/fourBlocks';
import { JourneyAlgorithm } from '@components/adas/journeyAlgorithm';
import { VideoWrap } from '@components/video';
import { EnablingMode } from '@components/adas/enablingMode';
import { ProductSetting } from '@components/adas/productSetting';
import { UseScene } from '@components/adas/useScene';
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
                //  四个一块的
                cdrbData: null,
                //  征程2 视觉感知算法
                jAData: null,
                //  赋能模式
                enablingModeData: null,
                //  产品配置
                productSettingData: null,
                //  应用场景
                useSceneData: null,
                //  客户案例
                customerCaseData: null,

            };
            //  页面宽度监听
            commonRelativeWideFn(this.props.setRelativeWideFn);
            //  页面滚动监听
            getBrowserInfo(this.props.setBrowserScrollInfoFn);
            const { setBarBoxAnchorList } = props;
            setBarBoxAnchorList(['方案概述', '客户案例']);
        }

        componentDidMount(){

            //  ADAS
            Promise.all([
                //  获取页面文案接口
                requestGetPageContent(ADAS.name)
                    .then(data => {
                        console.log(data);
                        this.setState((state) => {
                            return {
                                //  征程2 视觉感知算法
                                jAData: Object.assign({}, state.jAData, data[0]),
                                //  赋能模式
                                enablingModeData: Object.assign({}, state.enablingModeData, data[1]),
                                //  产品配置
                                productSettingData: Object.assign({}, state.productSettingData, data[2]),
                            };
                        });
                    }),
                //  获取图片标题接口
                requestGetImgTitle(ADAS.name)
                    .then(data => {
                        //  四个一块的
                        const cdrbData = clipData(data, NAV_CAT_ID, data[0][NAV_CAT_ID]);
                        //  应用场景
                        const useSceneData = clipData(data, NAV_CAT_ID, data[0][NAV_CAT_ID]);
                        this.setState((state) => {
                            return {
                                //  四个一块的
                                cdrbData: Object.assign([], state.cdrbData, cdrbData),
                                //  应用场景
                                useSceneData: Object.assign([], state.useSceneData, useSceneData),
                            };
                        });

                    }),
                //  客户案例
                requestGetClientCase(ADAS.type)
                    .then(data => {
                        console.log(data);
                        this.setState((state) => {
                            return {
                                customerCaseData: Object.assign({}, state.customerCaseData, { list: data })
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
                cdrbData,
                customerCaseData,
                jAData,
                enablingModeData,
                useSceneData,
                productSettingData,
            } = this.state;
            return (
                <div className="App">
                    {/*头部*/}
                    <BasicHeader/>
                    {/*合作咨询定位组件*/}
                    <ScrollFixed RenderElement={FixedBarBox}/>
                    <div id="m1" pc={60} mobile={30}/>
                    {/*轮播*/}
                    <BannerManage bannerType={13}/>
                    {/*四个一块*/}
                    <FourBlocks data={cdrbData} isLight={true}/>
                    {/*征程2 视觉感知算法*/}
                    <JourneyAlgorithm jAData={jAData}/>
                    {/*赋能模式*/}
                    <EnablingMode enablingModeData={enablingModeData}/>
                    {/*产品配置*/}
                    <ProductSetting productSettingData={productSettingData}/>
                    {/*应用场景*/}
                    <UseScene useSceneData={useSceneData}/>
                    <div id="m2" pc={20} mobile={15}/>
                    {/*客户案例*/}
                    <CustomerCase customerCaseData={customerCaseData}/>
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