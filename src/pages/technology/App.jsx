import React, { Component } from 'react';
import './index.less';
import { BasicHeader } from '@components/basicHeader';
import { BasicFooter } from '@components/basicFooter';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '@store/reduxMap';
import { requestGetBannerByType } from '@api/index';
import { commonRelativeWideFn } from '@utils/common';
import { navSortByRank } from '@utils/utils';

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
            requestGetBannerByType(6)
                .then(v => {
                    v.data && v.data.length && navSortByRank(v.data, 'rank');
                });
            requestGetBannerByType(7)
                .then(v => {
                    v.data && v.data.length && navSortByRank(v.data, 'rank');
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