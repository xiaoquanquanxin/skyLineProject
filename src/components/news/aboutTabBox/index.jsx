import React from 'react';
import style from './index.module.less';
import { scrollListener } from '@utils/eventListener';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '@store/reduxMap';
import { requestGetNewsCategory } from '@api/index';
import { navSortByRank } from '@utils/utils';

export const AboutTabBox = connect(
    mapStateToProps,
    mapDispatchToProps
)(
    class extends React.Component {
        constructor(props){
            super(props);
            this.state = {
                //  是否固定布局
                isFixed: false,
                //  新闻菜单数据
                newsCategoryData: null,
                //  activeIndex
                activeIndex: 0,
            };
        }



        //  初始化
        componentDidMount(){
            this.getNewsCategory();
            this.getFixed(document.documentElement.scrollTop || document.body.scrollTop);
            //  页面滚动监听
            scrollListener((v) => {
                this.setState(() => {
                    return {
                        isFixed: this.getFixed(v),
                    };
                });
            });
        }

        //  拿菜单
        getNewsCategory(index){
            requestGetNewsCategory()
                .then(v => {
                    navSortByRank(v.data, 'rank');
                    this.setState(() => {
                        return {
                            newsCategoryData: v.data,
                        };
                    });
                });
        }

        getFixed(topValue){
            const el = document.querySelector('#aboutTabBox');
            if (!el) {
                return false;
            }
            return (topValue >= el.offsetTop);
        }

        //  设置激活
        setTabBoxActiveIndex(index){
            const { setTabBoxActiveIndex, REDUCER_ABOUT_TAB_BOX } = this.props;
            //  重复点击
            if (REDUCER_ABOUT_TAB_BOX.activeIndex === index) {
                return;
            }
            //  设置给store redux
            setTabBoxActiveIndex(index);
        }

        render(){
            const {
                isFixed,
                newsCategoryData,
            } = this.state;
            const {
                //  redux存的关于我们的信息
                REDUCER_ABOUT_TAB_BOX,
            } = this.props;
            if (!newsCategoryData || newsCategoryData.length === 0) {
                return '';
            }
            const list = newsCategoryData.map((item) => {
                return <span key={item.id}
                             className={`${REDUCER_ABOUT_TAB_BOX.activeIndex === item.id ? style.active : ''}`}
                             onClick={() => {this.setTabBoxActiveIndex(item.id);}}
                >{item.name}</span>;
            });
            return (
                <div className={style.aboutTabBox} id='aboutTabBox'>
                    <div className={`${style.aboutTabInner} ${isFixed ? style.isFixed : ''}`}>
                        <div className={style.aboutTab}>
                            <span className={`${REDUCER_ABOUT_TAB_BOX.activeIndex === 0 ? style.active : ''}`}
                                  onClick={() => {this.setTabBoxActiveIndex(0);}}
                            >全部新闻</span>
                            {list}
                        </div>
                    </div>
                </div>
            );
        }
    });