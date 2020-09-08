import React, { Component } from 'react';
import { BasicHeader } from '@components/basicHeader';
import { BasicFooter } from '@components/basicFooter';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '@store/reduxMap';
import { requestGetBannerByType, requestGetProductPartner } from '@api/index';
import { commonRelativeWideFn } from '@utils/common';
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
            requestGetBannerByType(12)
                .then(v => {
                    v.data && v.data.length && navSortByRank(v.data, 'rank');
                });
            requestGetProductPartner()
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