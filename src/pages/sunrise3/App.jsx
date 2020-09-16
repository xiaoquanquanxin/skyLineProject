import React, { Component } from 'react';
import { BasicHeader } from '@components/basicHeader';
import { BasicFooter } from '@components/basicFooter';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '@store/reduxMap';
import { commonRelativeWideFn, getBrowserInfo } from '@utils/utils';
import './index.less';
import { ScrollFixed } from '@components/scrollFixed';
import { FixedBarBox } from '@components/fixedBarBox';
import { BannerManage } from '@components/bannerManage';

import { FourBlocks } from '@components/fourBlocks';

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    class App extends Component {
        constructor(props){
            super(props);
            this.state = {
                cdrbData: null,
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
                };
            });
        }

        render(){
            const { cdrbData } = this.state;
            return (
                <div className="App">
                    {/*头部*/}
                    <BasicHeader/>
                    {/*合作咨询定位组件*/}
                    <ScrollFixed RenderElement={FixedBarBox}/>
                    <BannerManage bannerType={10}/>
                    <FourBlocks data={cdrbData}/>
                    {/*脚部*/}
                    <BasicFooter/>
                </div>
            );
        }
    }
);