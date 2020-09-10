import React from 'react';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '@store/reduxMap';
import { requestGetNewsList } from '@api/index';

import { MainListItem } from '@components/news/newsList/mainListItem';
import { RelativeArticle } from '@components/news/newsList/relativeArticle';
import style from './index.module.less';

export const NewsList = connect(
    mapStateToProps,
    mapDispatchToProps
)(class extends React.Component {

        constructor(props){
            super(props);
            this.state = {
                page: 1,
                //  主数据
                dataList: null,
                //  相关文章数据
                relateList: null,
                //  有更多数据
                hasMoreData: true,
            };
        }

        componentDidMount(){
            this.getNewsList();
        }

        //  仅关心是否分页
        componentDidUpdate(prevProps, prevState, snapshot){
            //  console.log(prevProps.REDUCER_ABOUT_TAB_BOX, this.props.REDUCER_ABOUT_TAB_BOX);
            const { activeIndex: prevActiveIndex } = prevProps.REDUCER_ABOUT_TAB_BOX;
            const { activeIndex } = this.props.REDUCER_ABOUT_TAB_BOX;
            //  console.log(prevActiveIndex, activeIndex);

            //  只有这个activeIndex变化了，才重置零
            if (prevActiveIndex !== activeIndex) {
                this.setState(() => {
                    return {
                        //  重置页码
                        page: 1,
                        //  数据
                        dataList: null,
                        //  相关文章
                        relateList: null,
                        //  更多数据
                        hasMoreData: true,
                    };
                });
                //  必须等一帧
                window.requestAnimationFrame(() => {
                    this.getNewsList();
                });
            }
        }

        getNewsList(){
            const { activeIndex } = this.props.REDUCER_ABOUT_TAB_BOX;
            //  console.log('list请求数据', activeIndex,this.state.page);
            const { page, dataList, relateList, hasMoreData } = this.state;
            //  如果没有更多数据
            if (!hasMoreData) {
                return false;
            }
            requestGetNewsList(activeIndex, page)
                .then(v => {
                    console.log(v);
                    //  主数据没有排序
                    //  navSortByRank(v.data, 'rank');
                    //  相关文章数据也没有排序
                    //  navSortByRank(v.relate, 'rank');
                    this.setState(() => {
                            return {
                                hasMoreData: v.data.length === 5,
                                dataList: dataList ? dataList.concat(v.data) : v.data,
                                relateList: relateList ? relateList : v.relate,
                            };
                        }
                    );
                });
        }

        //  加载更多
        loadMore(){
            const { page } = this.state;
            this.setState(() => {
                return {
                    page: page + 1,
                };
            });
            //  必须等一帧
            window.requestAnimationFrame(() => {
                this.getNewsList();
            });
        }

        render(){
            const { dataList, relateList, hasMoreData } = this.state;
            //  主数据模块
            const mainList = (dataList && dataList.length && dataList.map(item => {
                return (
                    <MainListItem key={item.id} data={item}/>
                );
            })) || [];

            //  相关文章数据模块
            const relativeArticleList = (relateList && relateList.length && relateList.map(item => {
                return (
                    <RelativeArticle key={item.id} data={item}/>
                );
            })) || [];
            return (
                <div className={style.listRelative}>
                    <div className={style.listInner}>
                        <div className={style.listBox}>
                            <ul className={style.mainList}>
                                {mainList}
                            </ul>
                            {
                                !hasMoreData
                                    ? <div className={style.emptyText}>没有更多了...</div>
                                    : <div className={style.addMore} onClick={() => {this.loadMore();}}>加载更多</div>
                            }
                        </div>
                        <dl className={style.relativeListBox}>
                            <dt className={style.relativeTitle}>相关文章</dt>
                            {relativeArticleList}
                        </dl>
                    </div>
                </div>
            );
        }
    }
);
