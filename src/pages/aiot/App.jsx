import React, { Component } from 'react';
import { BasicHeader } from '@components/basicHeader';
import { BasicFooter } from '@components/basicFooter';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '@store/reduxMap';
import {
    requestGetBannerByType, requestGetClientCase, requestGetImgTitle,
    requestGetIotPartner,
    requestGetPageContent,
    requestGetProductPartner
} from '@api/index';
import { clipData, commonRelativeWideFn, getBrowserInfo } from '@utils/utils';
import { navSortByRank } from '@utils/utils';
import './index.less';
import { BannerManage } from '@components/bannerManage';
import { ScrollFixed } from '@components/scrollFixed';
import { FixedBarBox } from '@components/fixedBarBox';
import { Advantages } from '@components/open-explorer/advantages';
import { NAV_CAT_ID, AIOT, JOURNEY3 } from '@utils/constant';
import { TechnicalSolution } from '@components/aiot/technicalSolution';
import { ApplyScene } from '@components/applyScene';
import { AdvertisementBanner } from '@components/bannerManage/advertisementBanner';

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    class App extends Component {
        constructor(props){
            super(props);
            this.state = {
                //  方案优势
                advantagesData: null,
                //  技术方案
                technicalSolutionData: null,
                //  应用场景
                applySceneData: null,
                //  合作伙伴
                customList: null,
            };
            //  页面宽度监听
            commonRelativeWideFn(this.props.setRelativeWideFn);
            //  页面滚动监听
            getBrowserInfo(this.props.setBrowserScrollInfoFn);
        }

        componentDidMount(){
            //  AIOT
            Promise.all([
//                requestGetProductPartner()
//                    .then(v => {
//                        this.setState(() => {
//                            return {
//                                customList: v.data,
//                            };
//                        });
//                    }),
                //  获取页面文案接口
                requestGetPageContent(AIOT.name)
                    .then(data => {
                        console.log(data);
                        this.setState((state) => {
                            return {
                                //  特色与优势
                                advantagesData: Object.assign({}, state.advantagesData, data[0]),
//                                //  功能模块
//                                moduleNavData: Object.assign({}, state.moduleNavData, data[1]),
//                                //  “天工开物” AI 开发平台
//                                openExplorerData: Object.assign({}, state.openExplorerData, data[2]),
                            };
                        });
                    }),
                //  获取图片标题接口
                requestGetImgTitle(AIOT.name)
                    .then(data => {
                        //  特色与优势
                        const advantagesDataList = clipData(data, NAV_CAT_ID, data[0][NAV_CAT_ID]);
                        //  技术方案
                        const technicalSolutionData = clipData(data, NAV_CAT_ID, data[0][NAV_CAT_ID]);
                        this.setState((state) => {
                            return {
                                //  特色与优势
                                advantagesData: Object.assign({}, state.advantagesData, { list: advantagesDataList }),
                                //  技术方案
                                technicalSolutionData: Object.assign({}, state.technicalSolutionData, { list: technicalSolutionData })
                            };
                        });
                    }),
                //  客户案例
                requestGetClientCase(AIOT.type)
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

                    }),
                //  合作伙伴
                requestGetIotPartner()
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
                advantagesData,
                technicalSolutionData,
                applySceneData,
                customList
            } = this.state;
            return (
                <div className="App">
                    {/*头部*/}
                    <BasicHeader/>
                    {/*合作咨询定位组件*/}
                    {/*<ScrollFixed RenderElement={FixedBarBox}/>*/}
                    <BannerManage bannerType={18}/>
                    {/*特色与优势*/}
                    <Advantages advantagesData={advantagesData}/>
                    {/*技术方案*/}
                    <TechnicalSolution technicalSolutionData={technicalSolutionData}/>
                    {/*应用场景，无文字，纯图片*/}
                    <ApplyScene applySceneData={applySceneData} sceneType={1}/>
                    {/*合作伙伴*/}
                    <AdvertisementBanner
                        data={customList}
                        title='合作伙伴'
                        styleType={3}
                    />
                    {/*脚部*/}
                    <BasicFooter/>
                </div>
            );
        }
    }
);