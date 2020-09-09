import React from 'react';
import style from './index.module.less';
import { scrollListener } from '@utils/eventListener';

export const AboutTabBox = class extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            //  是否固定布局
            isFixed: false,
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot){

    }

    //  初始化
    componentDidMount(){
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

    getFixed(topValue){
        const el = document.querySelector('#aboutTabBox');
        if (!el) {
            return false;
        }
        return (topValue >= el.offsetTop);
    }

    render(){
        const { newsCategoryData } = this.props;
        if (!newsCategoryData) {
            return '';
        }
        const { isFixed } = this.state;
        return (
            <div className={style.aboutTabBox} id='aboutTabBox'>
                <div className={`${style.aboutTabInner} ${isFixed ? style.isFixed : ''}`}>
                    <div className={style.aboutTab}>
                        <span className={style.active}>全部新闻</span>
                        <span className={style}>企业资讯</span>
                        <span className={style}>生态合作</span>
                        <span className={style}>产品技术</span>
                        <span className={style}>公司活动</span>
                    </div>
                </div>
            </div>
        );
    }
};