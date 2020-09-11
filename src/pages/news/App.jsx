import React, { Component } from 'react';
import { BasicHeader } from '@components/basicHeader';
import { BasicFooter } from '@components/basicFooter';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '@store/reduxMap';
import { requestGetBannerByType, requestGetNewsCategory, requestGetNewsList } from '@api/index';
import { commonRelativeWideFn, getBrowserInfo } from '@utils/utils';
import { navSortByRank } from '@utils/utils';
import { NewsBanner } from '@components/news/newsBanner';
import { AboutTabBox } from '@components/news/aboutTabBox';
import { NewsList } from '@components/news/newsList';
import './index.less';

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    class App extends React.Component {
        constructor(props){
            super(props);
            this.state = {
                //  banner数据
                bannerData: null,
            };
        }

        componentDidMount(){
            //  发请求，取页面数据
            requestGetBannerByType(4)
                .then(v => {
                    //  应该没有轮播
                    this.setState(() => {
                        return {
                            bannerData: v.data[0]
                        };
                    });
                });
            //  页面宽度监听
            commonRelativeWideFn(this.props.setRelativeWideFn);
            //  页面滚动监听
            getBrowserInfo(this.props.setBrowserScrollInfoFn);
        }

        render(){
            const {
                bannerData,

            } = this.state;
            return (
                <div className="App">
                    {/*头部*/}
                    <BasicHeader/>
                    {/*banner*/}
                    <NewsBanner bannerData={bannerData}/>
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