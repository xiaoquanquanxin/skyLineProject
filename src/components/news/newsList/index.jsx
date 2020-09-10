import React from 'react';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '@store/reduxMap';

import { requestGetNewsList } from '@api/index';
import { navSortByRank } from '@utils/utils';
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
                    <NewsListItem key={item.id} data={item}/>
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
//  每一项
const NewsListItem = connect(
    mapStateToProps,
    mapDispatchToProps
)(({
    data,
    REDUCER_ABOUT_TAB_BOX,
}) => {
    const { newsCategoryDataMap } = REDUCER_ABOUT_TAB_BOX;
    if (newsCategoryDataMap === null) {
        return '';
    }

    return (
        <li key={data.id} className={style.mainListItem}>
            <div className={style.imgBox}>
                <img src={data.img} className={style.mainImg} alt={data.span}/>
                <div className={style.belongType}>
                    <img src={data.thumb} className={style.belongTypeImg} alt={data.span}/>
                    <span className={style.span}>{newsCategoryDataMap[data.category_id].name || ''}</span>
                </div>
            </div>
            <div className={style.titleDateDesc}>
                <p className={style.title}>{data.title}</p>
                <p className={style.date}>{transformDateType(data.publish_date)}</p>
                <div className={style.desc}>
                    {'⚠️这个不对' + matchReg(data.content) + '...'}
                </div>
            </div>
        </li>
    );
});

//  右侧列表相关文章
const RelativeArticle = ({
    data
}) => {
    //  console.log(data);
    return (
        <dd className={style.relativeItem}>
            <div className={style.imgBox}>
                <img src={data.img} className={style.img} alt=''/>
            </div>
            <div className={style.contentBox}>
                <p className={style.title}>{data.title}</p>
                <p className={style.date}>{transformDateType(data.publish_date)}</p>
            </div>
        </dd>
    );
};

//  匹配规则
function matchReg(str){
    let reg = /<\/?.+?\/?>/g;
    return str.replace(reg, '').substr(0, 93);
}

//  转换时间格式
function transformDateType(string){
    return string.replace('-', '年').replace('-', '月') + '日';
}