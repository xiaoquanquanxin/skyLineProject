import React, { Component } from 'react';
import { BasicHeader } from '@components/basicHeader';
import { BasicFooter } from '@components/basicFooter';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '@store/reduxMap';
import { requestGetBannerByType, requestGetPageContent } from '@api/index';
import { commonRelativeWideFn, getBrowserInfo, setJSONData } from '@utils/utils';
import { navSortByRank } from '@utils/utils';
import './index.less';
import { BannerManage } from '@components/bannerManage';
import { ScrollFixed } from '@components/scrollFixed';
import { FixedBarBox } from '@components/fixedBarBox';
import { SubBanner } from '@components/autonomous-driving/subBanner';
import { AUTONOMOUS_DRIVING } from '@utils/constant';
import { AdBox } from '@components/autonomous-driving/adBox';
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
                //  二级banner
                subBannerData: null,
                //  adBoxData
                adBoxData: null,
            };
            //  页面宽度监听
            commonRelativeWideFn(this.props.setRelativeWideFn);
            //  页面滚动监听
            getBrowserInfo(this.props.setBrowserScrollInfoFn);
            const { setBarBoxAnchorList } = props;
            setBarBoxAnchorList(['', '',]);
        }

        componentDidMount(){
            //  JSON
            this.setState((state) => {
                return {};
                return {
                    adBoxData: Object.assign({}, state.adBoxData, {
                        dataList: [
                            {
                                data: [
                                    { 'title': '即装即用', 'desc': '快速部署，助力商业落地', },
                                    { 'title': '车规级', 'desc': '车规级设计和测试，稳定可靠', },
                                    { 'title': '高性能感知算法', 'desc': '功能全面、高精度和鲁棒性', },
                                    { 'title': '开放工具链', 'desc': '开放易用，赋能定制优化', },
                                    { 'title': '配套开发套件', 'desc': '提升数据采集和测试验证效率', },
                                ],
                                list: [
                                    '无人的士和小巴将引领出行方式的深刻变革，撬动巨大的社会经济效益。随着商业部署竞争的加剧，快速落地产品的能力成为了商业模式探索的关键。',
                                    '千台级出货量已赋能多家国内外客户，在多种运营模式下实现规模部署，助力客户领跑商业化探索。'
                                ]
                            },
                            {
                                data: [
                                    { 'title': '被动散热', 'desc': '降低系统级成本，并提升稳定性', },
                                    { 'title': '即装即用', 'desc': '快速部署，助力商业落地', },
                                    { 'title': '感知算法包+开放工具链', 'desc': '面向各类运营场景定制优化', },
                                    { 'title': '配套开发套件', 'desc': '提升数据采集和测试验证效率', },
                                ],
                                list: [
                                    '最后一公里配送需求日益旺盛，而无人物流小车可以带来巨大的降本潜力。受限于空间和成本，功耗是无人小车落地的一大痛点。',
                                    '赋能多家国内外物流小车客户，助力客户在各类场景环境下加速落地。'
                                ]
                            },
                            {
                                data: [
                                    { 'title': '即装即用', 'desc': '快速部署，助力商业落地', },
                                    { 'title': '车规级', 'desc': '车规级设计和测试，稳定可靠', },
                                    { 'title': '高性能感知算法', 'desc': '功能全面、高精度和鲁棒性', },
                                    { 'title': '开放工具链', 'desc': '开放易用，赋能定制优化', },
                                    { 'title': '配套开发套件', 'desc': '提升数据采集和测试验证效率', },
                                ],
                                list: [
                                    '司机人力是干线物流成本的重要组成部分，而无人驾驶则可以帮助实现大幅降本。',
                                    '已赋能多家国内外客户实现加速落地部署。'
                                ]
                            },
                        ]
                    })
                };
            });
            //  AIOT
            Promise.all([
                //  subBanner数据
                requestGetBannerByType(15)
                    .then(v => {
                        this.setState(() => {
                            return {
                                subBannerData: v.data[0]
                            };
                        });
                    }),
                //  获取页面文案接口
                requestGetPageContent(AUTONOMOUS_DRIVING.name)
                    .then(data => {
                        navSortByRank(data, 'id');
                        setJSONData(data[0]);
                        setJSONData(data[1]);
                        setJSONData(data[2]);
                        this.setState((state) => {
                            return {
                                adBoxData: Object.assign({}, state.adBoxData, { list: data })
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
                subBannerData,
                adBoxData,
            } = this.state;
            let AdBoxComponents;
            if (adBoxData && adBoxData.list) {
                AdBoxComponents = adBoxData.list.map((item, index) => {
                    return (
                        <AdBox key={index}
                               adBoxData={item}
                               index={index}/>
                    );
                });
            }
            return (
                <div className="App">
                    {/*头部*/}
                    <BasicHeader/>
                    {/*合作咨询定位组件*/}
                    <ScrollFixed RenderElement={FixedBarBox}/>
                    <BannerManage bannerType={14}/>
                    {/*二级banner*/}
                    <SubBanner subBannerData={subBannerData}/>
                    <div id="m1" pc={60} mobile={30}/>
                    {/*自动驾驶 的box , 3个*/}
                    {AdBoxComponents}
                    <div id="m2" pc={60} mobile={30}/>
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

