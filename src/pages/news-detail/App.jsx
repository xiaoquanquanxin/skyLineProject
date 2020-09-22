import React, { Component } from 'react';
import { BasicHeader } from '@components/basicHeader';
import { BasicFooter } from '@components/basicFooter';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '@store/reduxMap';
import { commonRelativeWideFn, getBrowserInfo } from '@utils/utils';
import './index.less';
import { NewsDetail } from '@components/news-detail';

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    class App extends Component {
        componentDidMount(){
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
                    {/*新闻详情*/}
                    <NewsDetail/>
                    {/*脚部*/}
                    <BasicFooter/>
                </div>
            );
        }
    }
);