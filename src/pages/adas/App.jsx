import React, { Component } from 'react';
import { BasicHeader } from '@components/basicHeader';
import { BasicFooter } from '@components/basicFooter';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '@store/reduxMap';
import { requestGetBannerByType, requestGetDriverClient } from '@api/index';
import { commonRelativeWideFn, getBrowserInfo } from '@utils/utils';
import { navSortByRank } from '@utils/utils';
import './index.less';
import { BannerManage } from '@components/bannerManage';
import { ScrollFixed } from '@components/scrollFixed';
import { FixedBarBox } from '@components/aiot';

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    class App extends Component {
        constructor(props){
            super(props);
        }

        componentDidMount(){
            requestGetBannerByType(20)
                .then(v => {
                    navSortByRank(v.data, 'rank');
                });
            requestGetDriverClient()
                .then(v => {
                    navSortByRank(v.data, 'rank');
                });
            //  页面宽度监听
            commonRelativeWideFn(this.props.setRelativeWideFn);
            //  页面滚动监听
            getBrowserInfo(this.props.setBrowserScrollInfoFn);
        }

        render(){
            return (
                <div className="App">
                    {/*头部*/}
                    <BasicHeader/>
                    {/*合作咨询定位组件*/}
                    <ScrollFixed RenderElement={FixedBarBox}/>
                    <BannerManage bannerType={13}/>
                    {/*脚部*/}
                    <BasicFooter/>
                </div>
            );
        }
    }
);