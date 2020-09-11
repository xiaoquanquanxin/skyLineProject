import React, { Component } from 'react';
import { BasicHeader } from '@components/basicHeader';
import { BasicFooter } from '@components/basicFooter';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '@store/reduxMap';
import { requestGetBannerByType, requestGetDriverClient } from '@api/index';
import { commonRelativeWideFn } from '@utils/utils';
import { navSortByRank } from '@utils/utils';
import './index.less';

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    class App extends Component {
        constructor(props){
            super(props);
        }

        componentDidMount(){
            //  发请求，取页面数据
            requestGetBannerByType(13)
                .then(v => {
                    navSortByRank(v.data, 'rank');
                });
            requestGetBannerByType(20)
                .then(v => {
                    navSortByRank(v.data, 'rank');
                });
            requestGetDriverClient()
                .then(v => {
                    navSortByRank(v.data, 'rank');
                });
            commonRelativeWideFn(this.props.setRelativeWideFn);
        }

        render(){
            return (
                <div className="App">
                    {/*头部*/}
                    <BasicHeader/>
                    {/*脚部*/}
                    <BasicFooter/>
                </div>
            );
        }
    }
);