import React from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from '@store/reduxMap';
import style from './index.module.less';

export const AboutTabBox = connect(
    mapStateToProps,
    mapStateToProps,
)(class extends React.Component {
    //  锚点列表
    anchorList;
    //  锚点map
    anchorMap;

    constructor(props){
        super(props);
        this.anchorList = [{
            anchor: '#tab1',
            name: '公司简介',
        }, {
            anchor: '#tab2',
            name: '发展历程',
        }, {
            anchor: '#tab3',
            name: '投资伙伴',
        }, {
            anchor: '#tab4',
            name: '联系我们',
        }];
        this.anchorMap = {
            '#tab1': 0,
            '#tab2': 1,
            '#tab3': 2,
            '#tab4': 3,
        };
        this.state = {
            activeIndex: this.anchorMap[window.location.hash] || 0,
        };
    }

    componentDidMount(){
        //  模拟点击
        this.anchorClick(this.anchorList[this.state.activeIndex].anchor);
    }

    //  点击锚点
    anchorClick(el){
        const element = document.querySelector(el);
        if (!element) {
            throw new Error(`元素${el}未定义`);
        }
        const activeIndex = this.anchorMap[el];
        this.setState(() => {
            return {
                activeIndex,
            };
        }, () => {
            window.scrollTo({
                top: element.offsetTop,
                behavior: 'smooth'
            });
        });
    }

    render(){
        const { activeIndex } = this.state;
        const linkList = this.anchorList.map((item, index) => {
            return (
                <span className={`${style.link} ${index === activeIndex ? style.active : ''}`}
                      key={index}
                      onClick={() => {this.anchorClick(item.anchor);}}
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