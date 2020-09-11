import React, { Component } from 'react';
import { BasicHeader } from '@components/basicHeader';
import { BasicFooter } from '@components/basicFooter';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '@store/reduxMap';
import { commonRelativeWideFn, getBrowserInfo } from '@utils/utils';
import { AboutTabBox } from '@components/news/aboutTabBox';
import { NewsList } from '@components/news/newsList';
import './index.less';
import { AboutBanner } from '@components/bannerManage/aboutBanner';

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    class App extends React.Component {
        constructor(props){
            super(props);
        }

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
                    {/*banner*/}
                    <AboutBanner bannerType={4}/>
                    {/*菜单*/}
                    <AboutTabBox/>
                    {/*新闻内容*/}
                    <NewsList/>
                    {/*<br/>*/}
                    {/*脚部*/}
                    <BasicFooter/>
                </div>
            );
        }
    }
);