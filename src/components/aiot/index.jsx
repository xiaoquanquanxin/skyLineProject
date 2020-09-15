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
        constructor(props){
            super(props);
        }

        componentDidMount(){

        }

        render(){
            const { barBoxData, barBoxAnchor } = this.props.barBoxData;
            console.log(barBoxAnchor, barBoxData);

            return (
                <div className={style.floatBarBox}>
                    <div className={style.titleBox}>
                        <div className={style.themeDesc}>
                            <strong className={style.title}>智能物联网</strong>
                            <em className={style.desc}>旭日系列——面向智能物联网的 AI 应用解决方案</em>
                        </div>
                        <div className={style.titleNavInquireBtn}>
                            <div className={style.navTag}>
                                <a href="#m1" className={style.anchor}>方案概述</a>
                                <a href="#m2" className={style.anchor}>合作伙伴</a>
                            </div>
                            <div className={style.inquireBtn}>合作咨询</div>
                        </div>
                    </div>
                </div>
            );
        }
    }
);