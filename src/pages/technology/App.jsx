import React, { Component } from 'react';
import './index.less';
import { BasicHeader } from '@components/basicHeader';
import { BasicFooter } from '@components/basicFooter';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '@store/reduxMap';
import { requestGetBannerByType } from '@api/index';
import { commonRelativeWideFn, getBrowserInfo } from '@utils/utils';
import { navSortByRank } from '@utils/utils';
import { BannerManage } from '@components/bannerManage';
import { TechnologyVideo } from '@components/technology/technologyVideo';
import { VideoWrap } from '@components/video';
import { Bpu } from '@components/technology/bpu';
import { TechnologyPerformance } from '@components/technology/performance';
import { MAPS } from '@components/technology/MAPS';
import { XinPeriod } from '@components/technology/xinPeriod';

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    class App extends Component {
        constructor(props){
            super(props);
            this.state = {
                bpuData: null,
                performanceData: null,
                mapsData: null,
                xinPeriodData: null,
            };
            commonRelativeWideFn(this.props.setRelativeWideFn);
            //  页面滚动监听
            getBrowserInfo(this.props.setBrowserScrollInfoFn);
        }

        componentDidMount(){
            this.setState(() => {
                return {
                    bpuData: {
                        desc: '地平线具有世界领先的深度学习和决策推理算法开发能力，可将算法集成在高性能、低功耗、低成本的边缘人工智能处理器及软硬平台上；同时自主设计研发了创新性的人工智能专用处理器—— <br>BrainProcessing Unit（ BPU )，提供设备端上软硬结合的嵌入式人工智能解决方案。',
                        title: '为实际场景而生的 BPU 架构',
                        list: [{ name: 1 }, { name: 1 }, { name: 1 }, { name: 1 }, { name: 1 }]
                    },
                    performanceData: {
                        title: 'AI 芯片真实性能远超对手',
                        list: [1, 2, 3, 4,]
                    },
                    mapsData: {
                        content: '地平线致力于构建实用性主导的评估标准，让芯片真实 AI 性能可感知。 2020 年，地平线提出了 MAPS 评估方法 ( Mean Accuracy - guaranteed Processing<br>Speed ) ，即在精度有保障范围内的平均处理速度，该评估方式旨在使用户能够通过可视化的图表感知 AI 芯片真实算力。其公式为：MAPS = 所围面积 /（最高精度-最低精度)。',
                    },
                    xinPeriodData: {
                        title: '持续攀登 引领 AI “芯” 时代',
                        desc: '基于创新的人工智能专用计算架构 BPU ( Brain Processing Unit ) ，地平线为自研 AI 芯片规划了完备的研发路线图。',
                        list: [{ name: '征程2', }, { name: 'xxx2', }, { name: 'xxx3', }, { name: 'xxx4', }, { name: 'xxx5', }, { name: 'xxx6', }]
                    }
                };
            });
        }

        render(){
            const { bpuData, performanceData, mapsData, xinPeriodData } = this.state;
            return (
                <div className="App">
                    {/*头部*/}
                    <BasicHeader/>
                    <BannerManage bannerType={6}/>
                    {/*bpu框架*/}
                    <Bpu bpuData={bpuData}/>
                    {/*AI 芯片真实性能远超对手*/}
                    <TechnologyPerformance performanceData={performanceData}/>
                    {/*关于 MAPS 评估方式*/}
                    <MAPS mapsData={mapsData}/>
                    {/*持续攀登 引领 AI “芯” 时代*/}
                    <XinPeriod xinPeriodData={xinPeriodData}/>
                    {/*视频*/}
                    <TechnologyVideo videoType={7}/>
                    {/*视频本身*/}
                    <VideoWrap/>
                    {/*脚部*/}
                    <BasicFooter/>
                </div>
            );
        }
    }
);