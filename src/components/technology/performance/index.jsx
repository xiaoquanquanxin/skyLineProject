import React from 'react';
import style from './index.module.less';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '@store/reduxMap';
//  性能
export const TechnologyPerformance = connect(
    mapStateToProps,
    mapDispatchToProps,
)(class extends React.Component {
        constructor(props){
            super(props);
            this.state = {
                //  是否展开
                isOpen: false
            };
        }

        //  展开或关闭
        openOrClose(){
            const { isOpen } = this.state;
            this.setState(() => {
                return {
                    isOpen: !isOpen
                };
            });
        }

        render(){
            const performanceData = this.props.performanceData || {};
            if (!performanceData) {
                return '';
            }
            const { isOpen } = this.state;
            const { REDUCER_BROWSER_INFO } = this.props;
            const { isRelativeWide } = REDUCER_BROWSER_INFO;
            //  切字符串
            if (performanceData.desc) {
                performanceData._desc = performanceData.desc.replace('[[[more]]]',
                    isRelativeWide
                        ? '<br/>'
                        : ''
                );
            }
            return (
                <div className={style.performance}>
                    <div className={style.performanceIn}>
                        <p className={style.title}>{performanceData.title}</p>
                        <div className={style.descBtn}>
                            <div className={style.desc}>
                             <span className={`${style.content} ${isOpen ? style.active : ''}`}
                                   dangerouslySetInnerHTML={{ __html: performanceData._desc }}/>
                                <div className={style.btn} onClick={() => {this.openOrClose();}}>
                                    {isOpen
                                        ? <b className={style.close}>收起</b>
                                        : <span className={style.open}>展开</span>
                                    }
                                    <i className={style.arrow} style={isOpen ? { transform: 'rotateZ(180deg)' } : {}}/>
                                </div>
                            </div>
                        </div>
                        <div className={style.chartDescItem}>
                            <img src={performanceData.img} className={style.img} alt=''/>
                        </div>
                    </div>
                </div>
            );
        }
    }
);