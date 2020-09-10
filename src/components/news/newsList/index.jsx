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
                    this.setState(() => {
                            return {
                                dataList: dataList ? dataList.concat(v.data) : v.data,
                            };
                        }
                    );
                    navSortByRank(v.relate, 'rank');
                });
        }

        render(){
            const { dataList } = this.state;
            if (!dataList || !dataList.length) {
                return '';
            }
            const list = dataList.map(item => {
                return (
                    <NewsListItem key={item.id} data={item}/>
                );
            });
            return (
                <div className={style.listRelative}>
                    <div className={style.listInner}>
                        <div className={style.listBox}>
                            <ul className={style.list}>
                                {list}
                            </ul>
                        </div>
                    </div>
                </div>
            );
        }
    }
);
//  每一项
const NewsListItem = ({
    data,
}) => {
    return (
        <li key={data.id} className={style.item}>
            <div className={style.imgBox}>
                <img src={data.img} className={style.mainImg} alt={data.span}/>
                <div className={style.belongType}>
                    <img src={data.thumb} className={style.belongTypeImg} alt={data.span}/>
                    <span className={style.span}>{data.category_id}</span>
                </div>
            </div>
            <div className={style.titleDateDesc}>
                <p className={style.title}>{data.title}</p>
                <p className={style.date}>{data.publish_date}</p>
                <div className={style.desc}>
                    故规则复杂
                </div>
            </div>
        </li>
    );
};