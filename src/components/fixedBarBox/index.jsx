import React from 'react';
import style from './index.module.less';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '@store/reduxMap';
//  滚动定位的东西
export const FixedBarBox = connect(
    mapStateToProps,
    mapDispatchToProps,
)(
    class extends React.Component {
        //  锚点map
        anchorMap;
        //  锚点在锚点列表的id
        hashIndex;
        hash;

        constructor(props){
            super(props);
            this.state = {};
            this.hash = window.location.hash;
            this.anchorMap = {
                '#m1': 0,
                '#m2': 1,
            };
            this.hashIndex = this.anchorMap[this.hash] || 0;
            this.state = {
                activeIndex: this.hashIndex,
            };
        }

        componentDidUpdate(prevProps, prevState, snapshot){
            const { componentDidMountFinish } = this.props.REDUCER_ABOUT_US_MAP;
            const { isRelativeWide } = this.props.REDUCER_BROWSER_INFO;
            const { barBoxAnchorList } = this.props.REDUCER_FIXED_TAB_BOX;
            //  组件初始化完成以前
            if (!componentDidMountFinish) {
                return;
            }
            barBoxAnchorList.forEach(item => {
                const element = window.document.querySelector(item.anchor);
                item.customOffsetTop = element.offsetTop - element.getAttribute(isRelativeWide ? 'pc' : 'mobile');
            });
            //  如果前一次没完成，这一次完成了，说明是数据回调了，父组件渲染完成
            if (componentDidMountFinish !== prevProps.REDUCER_ABOUT_US_MAP.componentDidMountFinish) {
                //  console.log('这玩意儿只执行一次');
                //  如果有hash
                if (this.hash) {
                    //  模拟点击
                    this.anchorClick(barBoxAnchorList[this.hashIndex].customOffsetTop, 'smooth');
                }
            }
            const { scrollTop: prevScrollTop } = prevProps.REDUCER_BROWSER_INFO;
            const { scrollTop: currentScrollTop } = this.props.REDUCER_BROWSER_INFO;
            //  仅考虑定位不同的情况
            if (prevScrollTop === currentScrollTop) {
                return;
            }
            //  倒序寻找最高的那一个被激活的锚点元素，然后给tabBox上色
            for (let i = barBoxAnchorList.length - 1; i >= 0; i--) {
                const value = barBoxAnchorList[i];
                //  console.log(value.customOffsetTop, currentScrollTop);
                //  +10是容错值
                if (value.customOffsetTop <= currentScrollTop + 10) {
                    this.setState(() => {
                        return {
                            activeIndex: i,
                        };
                    });
                    return;
                }
            }
        }

        //  点击锚点
        /***
         * @param {number} customOffsetTop
         * @param {string} behavior {instant,smooth }
         * */
        anchorClick(customOffsetTop, behavior){
            if (customOffsetTop === undefined || customOffsetTop == null) {
                throw new Error(`customOffsetTop:${customOffsetTop}未定义`);
            }
            window.document.documentElement.scrollTo({
                top: customOffsetTop,
                behavior,
            });
        }

        render(){
            const { activeIndex } = this.state;
            const { barBoxAnchorList, barBoxData } = this.props.REDUCER_FIXED_TAB_BOX;
            const anchorList = barBoxAnchorList.map((item, index) => {
                return (
                    <span
                        className={`${style.anchor} ${index === activeIndex ? style.active : ''}`}
                        key={index}
                        onClick={() => {this.anchorClick(item.customOffsetTop, 'smooth');}}
                    >{item.name}</span>
                );
            });
            return (
                <div className={style.floatBarBox}>
                    <div className={style.titleBox}>
                        <div className={style.themeDesc}>
                            <strong className={style.subTitle}>{barBoxData.subTitle}</strong>
                            <em className={style.subDescription}>{barBoxData.subDescription}</em>
                        </div>
                        <div className={style.titleNavInquireBtn}>
                            <div className={style.navTag}>
                                {anchorList}
                            </div>
                            <div className={style.inquireBtn}>合作咨询</div>
                        </div>
                    </div>
                </div>
            );
        }
    }
);