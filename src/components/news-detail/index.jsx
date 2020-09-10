import React from 'react';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '@store/reduxMap';
import { requestGetNewsCategory, requestGetNewsDetail } from '@api/index';
import { getSearchString, navSortByRank } from '@utils/utils';
import { Crumb } from '@components/news-detail/crumb';
import { NewsMainContent } from '@components/news-detail/newsMainContent';
import style from './index.module.less';
import { RelativeArticle } from '@components/relativeArticle';

export const NewsDetail = connect(
    mapStateToProps,
    mapDispatchToProps,
)(class extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            //  主数据
            mainData: null,
            //  右侧相关文章数据
            relateList: null,
            //  详情id
            detailId: getSearchString('id'),
        };
    }

    componentDidMount(){
        const { detailId } = this.state;
        //  发请求，取页面数据
        requestGetNewsCategory()
            .then(v => {
                navSortByRank(v.data, 'rank');
            });
        //  新闻详情数据
        requestGetNewsDetail(detailId)
            .then(v => {
                //  console.log(v.data);
                this.setState(() => {
                    return {
                        mainData: v.data,
                        relateList: v.relate
                    };
                });
            });
    }

    render(){
        const { relateList, mainData } = this.state;
        return (
            <div className={style.newsDetailBox}>
                <div className={style.newsDetailInner}>
                    <div className={style.content}>
                        {/*面包屑*/}
                        <Crumb/>
                        {/*主要内容*/}
                        <NewsMainContent mainData={mainData}/>
                    </div>
                    {/*右侧*/}
                    <div className={style.relativeArticleWrap}>
                        <RelativeArticle relateList={relateList}/>
                    </div>
                </div>
            </div>
        );
    }

});