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
            };
        }

        componentDidMount(){
            this.getNewsList();
        }

        componentDidUpdate(prevProps, prevState, snapshot){
            //  console.log(prevProps.REDUCER_ABOUT_TAB_BOX, this.props.REDUCER_ABOUT_TAB_BOX);
            const { activeIndex: prevActiveIndex } = prevProps.REDUCER_ABOUT_TAB_BOX;
            const { activeIndex } = this.props.REDUCER_ABOUT_TAB_BOX;
            //  console.log(prevActiveIndex, activeIndex);

            //  只有这个activeIndex变化了，才重置零
            if (prevActiveIndex !== activeIndex) {
                this.setState(() => {
                    return {
                        page: 0,
                        dataList: null,
                    };
                });
                this.getNewsList();
            }
        }

        getNewsList(){
            const { activeIndex } = this.props.REDUCER_ABOUT_TAB_BOX;
            //  console.log('list请求数据', activeIndex,this.state.page);
            const { page, dataList } = this.state;
            requestGetNewsList(activeIndex, page)
                .then(v => {
                    console.log(v);
                    //  主数据没有排序
                    //  navSortByRank(v.data, 'rank');
                    //  相关文章数据也没有排序
                    //  navSortByRank(v.relate, 'rank');
                    this.setState(() => {
                            return {
                                dataList: dataList ? dataList.concat(v.data) : v.data,
                                relateList: v.relate,
                            };
                        }
                    );

                });
        }

        render(){
            const { dataList, relateList } = this.state;
            if (!dataList || !dataList.length) {
                return '';
            }
            //  主数据模块
            const mainList = dataList.map(item => {
                return (
                    <MainListItem key={item.id} data={item}/>
                );
            });

            //  相关文章数据模块
            const relativeArticleList = relateList.map(item => {
                return (
                    <RelativeArticle key={item.id} data={item}/>
                );
            });
            return (
                <div className={style.listRelative}>
                    <div className={style.listInner}>
                        <div className={style.listBox}>
                            <ul className={style.mainList}>
                                {mainList}
                            </ul>
                            <div className={style.addMore}>加载更多</div>
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
