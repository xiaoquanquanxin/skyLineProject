import React from 'react';
import style from './index.module.less';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '@store/reduxMap';
import { splitDesc } from '@utils/utils';
//  性能
export const TechnologyPerformance = connect(
    mapStateToProps,
    mapDispatchToProps,
)(
    class extends React.Component {
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
            //  切字符串
            if (performanceData.desc) {
                performanceData.desc_active = splitDesc(performanceData.desc, REDUCER_BROWSER_INFO.isRelativeWide);
                performanceData.desc_normal = performanceData.desc.split('[[[more]]]')[0];
            }
            return (
                <div className={style.performance}>
                    <div className={style.performanceIn}>
                        <p className={style.title}>{performanceData.title}</p>
                        <div className={style.descBtn}>
                            <div className={style.desc}>
                             <span className={`${style.content} ${isOpen ? style.active : ''}`}
                                   dangerouslySetInnerHTML={{
                                       __html:
                                           isOpen
                                               ? performanceData.desc_active
                                               : performanceData.desc_normal
                                   }}/>
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