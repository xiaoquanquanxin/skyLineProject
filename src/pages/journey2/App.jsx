import React, { Component } from 'react';
import { BasicHeader } from '@components/basicHeader';
import { BasicFooter } from '@components/basicFooter';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '@store/reduxMap';
import { requestGetBannerByType } from '@api/index';
import { commonRelativeWideFn, getBrowserInfo } from '@utils/utils';
import { navSortByRank } from '@utils/utils';
import './index.less';
import { AiotBarBox } from '@components/aiot';
import { ScrollFixed } from '@components/scrollFixed';
import { BannerManage } from '@components/bannerManage';
import { Journey2cdrb } from '@components/journey2/cdrb';
import { HighPerception } from '@components/journey2/HighPerception';
import { EdgeComputing } from '@components/journey2/edgeComputing';
import { ProductMatrix } from '@components/journey2/productMatrix';
import { BaseParam } from '@components/journey2/baseParam';

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    class App extends Component {
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

                }
            };
        }

        componentDidMount(){
            requestGetBannerByType(19)
                .then(v => {
                    navSortByRank(v.data, 'rank');
                });

        }

        render(){
            const { cdrbData, highPerceptionData, productMatrixData, baseParamData } = this.state;
            return (
                <div className="App">
                    {/*头部*/}
                    <BasicHeader/>
                    {/*合作咨询定位组件*/}
                    <ScrollFixed RenderElement={AiotBarBox}/>
                    {/*banner轮播*/}
                    <BannerManage bannerType={8}/>
                    {/*四个一块*/}
                    <Journey2cdrb data={cdrbData}/>
                    {/*高知觉*/}
                    <HighPerception data={highPerceptionData}/>
                    <EdgeComputing data={highPerceptionData}/>
                    <HighPerception data={highPerceptionData}/>
                    {/*地平线智能驾驶产品矩阵*/}
                    <ProductMatrix data={productMatrixData}/>
                    {/*规格参数*/}
                    <BaseParam data={baseParamData}/>
                    {/*脚部*/}
                    <BasicFooter/>
                </div>
            );
        }
    }
);