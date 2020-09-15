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
import { FixedBarBox } from '@components/aiot';
import { BannerManage } from '@components/bannerManage';

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
        }

        componentDidMount(){

        }

        render(){
            return (
                <div className="App">
                    {/*头部*/}
                    <BasicHeader/>
                    {/*合作咨询定位组件*/}
                    <ScrollFixed RenderElement={FixedBarBox}/>
                    {/*banner轮播*/}
                    <BannerManage bannerType={11}/>
                    {/*脚部*/}
                    <BasicFooter/>
                </div>
            );
        }
    }
);