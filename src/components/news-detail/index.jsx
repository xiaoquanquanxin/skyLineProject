import React from 'react';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '@store/reduxMap';
import { requestGetNewsCategory, requestGetNewsDetail } from '@api/index';
import { navSortByRank } from '@utils/utils';
import style from './index.module.less';
import { Crumb } from '@components/news-detail/crumb';

export const NewsDetail = connect(
    mapStateToProps,
    mapDispatchToProps,
)(class extends React.Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        //  发请求，取页面数据
        requestGetNewsCategory()
            .then(v => {
                navSortByRank(v.data, 'rank');
            });
        requestGetNewsDetail(1)
            .then(v => {
                console.log(v.data, v.relate);
                navSortByRank(v.relate, 'rank');
            });
    }

    render(){
        return (
            <div className={style.newsDetailBox}>
                <div className={style.newsDetailInner}>
                    <div className={style.content}>
                        <Crumb/>
                    </div>
                </div>
            </div>
        );
    }

});