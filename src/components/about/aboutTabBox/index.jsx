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

    constructor(props){
        super(props);
        this.anchorList = [{
            anchor: '#tab1',
            name: '公司简介',
            element: null,
        }, {
            anchor: '#tab2',
            name: '发展历程',
            element: null,
        }, {
            anchor: '#tab3',
            name: '投资伙伴',
            element: null,
        }, {
            anchor: '#tab4',
            name: '联系我们',
            element: null,
        }];
        this.anchorMap = {
            '#tab1': 0,
            '#tab2': 1,
            '#tab3': 2,
            '#tab4': 3,
        };
        this.hashIndex = this.anchorMap[window.location.hash] || 0;
        this.state = {
            activeIndex: this.hashIndex,
        };
        //  console.log(this.hashIndex);
    }

    componentDidMount(){
        this.anchorList.forEach(item => {
            item.element = document.querySelector(item.anchor);
        });
        //  模拟点击
        window.requestAnimationFrame(() => {
            //  fixme   safari
            //  ⚠️⚠️⚠️⚠️
            setTimeout(() => {
                this.anchorClick(this.anchorList[this.hashIndex].element, 'smooth');
            }, 200);
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        const { scrollTop: prevScrollTop } = prevProps.REDUCER_BROWSER_INFO;
        const { scrollTop: currentScrollTop } = this.props.REDUCER_BROWSER_INFO;
        //  仅考虑定位不同的情况
        if (prevScrollTop === currentScrollTop) {
            return;
        }
        //  倒序寻找最高的那一个被激活的锚点元素，然后给tabBox上色
        for (let i = this.anchorList.length - 1; i >= 0; i--) {
            const value = this.anchorList[i];
            if (value.element.offsetTop <= currentScrollTop) {
                //  console.log(i, value.anchor);
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
     * @param {HTMLElement} element
     * @param {string} behavior {instant,smooth }
     * */
    anchorClick(element, behavior){
        if (!element) {
            throw new Error(`元素${element}未定义`);
        }
        window.document.documentElement.scrollTo({
            top: element.offsetTop,
            behavior,
        });
    }

    render(){
        const { activeIndex } = this.state;
        const linkList = this.anchorList.map((item, index) => {
            return (
                <span className={`${style.link} ${index === activeIndex ? style.active : ''}`}
                      key={index}
                      onClick={() => {this.anchorClick(item.element, 'smooth');}}
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