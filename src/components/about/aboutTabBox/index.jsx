import React from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from '@store/reduxMap';
import style from './index.module.less';
import { getUserAgentType } from '@utils/utils';

//  如果是safari
if (getUserAgentType.isSafari) {
    require('smoothscroll-polyfill').polyfill();
}
export const AboutTabBox = connect(
    mapStateToProps,
)(class extends React.Component {
    //  锚点列表
    anchorList;
    //  锚点map
    anchorMap;
    //  锚点在锚点列表的id
    hashIndex;
    hash;

    constructor(props){
        super(props);
        this.anchorList = [{
            anchor: '#tab1',
            name: '公司简介',
            customOffsetTop: 0,
        }, {
            anchor: '#tab2',
            name: '发展历程',
            customOffsetTop: 0,
        }, {
            anchor: '#tab3',
            name: '投资伙伴',
            customOffsetTop: 0,
        }, {
            anchor: '#tab4',
            name: '联系我们',
            customOffsetTop: 0,
        }];
        this.anchorMap = {
            '#tab1': 0,
            '#tab2': 1,
            '#tab3': 2,
            '#tab4': 3,
        };
        this.hash = window.location.hash;
        this.hashIndex = this.anchorMap[this.hash] || 0;
        this.state = {
            activeIndex: this.hashIndex,
        };
    }

    componentDidMount(){
//        //  fixme   safari
//        //  ⚠️⚠️⚠️⚠️
//        setTimeout(() => {
//            //  模拟点击
//            window.requestAnimationFrame(() => {
//                console.log(this.hash);
//                //  如果有hash数据和元素
//                if (this.hash) {
//                    this.anchorClick(this.anchorList[this.hashIndex].customOffsetTop, 'smooth');
//                }
//            });
//        }, 1000);
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        const { componentDidMountFinish } = this.props.REDUCER_ABOUT_US_MAP;
        const { isRelativeWide } = this.props.REDUCER_BROWSER_INFO;
        //  组件初始化完成以前
        if (!componentDidMountFinish) {
            return;
        }
        this.anchorList.forEach(item => {
            const element = window.document.querySelector(item.anchor);
            item.customOffsetTop = element.offsetTop - element.getAttribute(isRelativeWide ? 'pc' : 'mobile');
        });
        //  如果前一次没完成，这一次完成了，说明是数据回调了，父组件渲染完成
        if (componentDidMountFinish !== prevProps.REDUCER_ABOUT_US_MAP.componentDidMountFinish) {
            //  console.log('这玩意儿只执行一次');
            //  如果有hash
            if (this.hash) {
                //  模拟点击
                this.anchorClick(this.anchorList[this.hashIndex].customOffsetTop, 'smooth');
            }
        }
        const { scrollTop: prevScrollTop } = prevProps.REDUCER_BROWSER_INFO;
        const { scrollTop: currentScrollTop } = this.props.REDUCER_BROWSER_INFO;
        //  仅考虑定位不同的情况
        if (prevScrollTop === currentScrollTop) {
            return;
        }
        //  倒序寻找最高的那一个被激活的锚点元素，然后给tabBox上色
        for (let i = this.anchorList.length - 1; i >= 0; i--) {
            const value = this.anchorList[i];
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
        const linkList = this.anchorList.map((item, index) => {
            return (
                <span className={`${style.link} ${index === activeIndex ? style.active : ''}`}
                      key={index}
                      onClick={() => {this.anchorClick(item.customOffsetTop, 'smooth');}}
                >{item.name}</span>
            );
        });
        return (
            <div className={style.aboutTabBox}>
                <div className={style.aboutTab}>
                    {linkList}
                </div>
            </div>
        );
    }
});