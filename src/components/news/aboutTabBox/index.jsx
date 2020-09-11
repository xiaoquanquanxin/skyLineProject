import React, { createRef } from 'react';
import style from './index.module.less';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '@store/reduxMap';
import { requestGetNewsCategory } from '@api/index';
import { navSortByRank } from '@utils/utils';

export const AboutTabBox = connect(
    mapStateToProps,
    mapDispatchToProps
)(
    class extends React.Component {
        aboutTabBoxRef;

        constructor(props){
            super(props);
            this.aboutTabBoxRef = createRef();
        }

        //  初始化
        componentDidMount(){
            this.getNewsCategory();
        }

        //  拿菜单
        getNewsCategory(){
            requestGetNewsCategory()
                .then(v => {
                    navSortByRank(v.data, 'rank');
                    this.props.setNewsCategoryData(v.data);
                });
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
                //  redux存的关于我们的信息
                REDUCER_ABOUT_TAB_BOX,
                //  浏览器信息
                REDUCER_BROWSER_INFO
            } = this.props;
            //  数据
            const { newsCategoryData } = REDUCER_ABOUT_TAB_BOX;
            if (!newsCategoryData || newsCategoryData.length === 0) {
                return '';
            }
            //  页面滚动高度
            const { scrollTop } = REDUCER_BROWSER_INFO;
            //  页面定位元素
            const aboutTabBoxRef = this.aboutTabBoxRef.current;
            //  是否固定
            const isFixed = (aboutTabBoxRef && aboutTabBoxRef.offsetTop) < scrollTop;
            const list = newsCategoryData.map((item) => {
                return <span key={item.id}
                             className={`${REDUCER_ABOUT_TAB_BOX.activeIndex === item.id ? style.active : ''}`}
                             onClick={() => {this.setTabBoxActiveIndex(item.id);}}
                >{item.name}</span>;
            });
            return (
                <div className={style.aboutTabBox} ref={this.aboutTabBoxRef}
                    //  如果数据大于4个，并且是移动端
                     style={(list.length > 4 && !REDUCER_BROWSER_INFO.isRelativeWide) ? {
                         height: '.8rem',
                         marginBottom: '.2rem'
                     } : {}}>
                    <div className={`${style.aboutTabInner} ${isFixed ? style.isFixed : ''}`}>
                        <div className={style.aboutTab}
                             style={REDUCER_BROWSER_INFO.isRelativeWide ? {} : {
                                 width: `${1.36 * (list.length + 1)}rem`,
                             }}>
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