import React from 'react';
import style from './index.module.less';
import performanceSub from '@media/technology/performanceSub.png';

export const MAPS = class extends React.Component {
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
        const { mapsData } = this.props;
        if (!mapsData) {
            return '';
        }
        const { isOpen } = this.state;
        return (
            <div className={style.assessment}>
                <div className={style.assessmentIn}>
                    <div className={style.titleDescBtn}>
                        <p className={style.title}>关于 MAPS 评估方式</p>
                        <div className={style.descBtn}>
                            <div className={style.desc}>
                                <span className={`${style.content} ${isOpen ? style.active : ''}`}
                                      dangerouslySetInnerHTML={{ __html: mapsData.content }}/>
                                <div className={style.btn} onClick={() => {this.openOrClose();}}>
                                    {isOpen
                                        ? <b className={style.close}>收起</b>
                                        : <span className={style.open}>展开</span>
                                    }
                                    <i className={style.arrow} style={isOpen ? { transform: 'rotateZ(180deg)' } : {}}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={style.chartDescItem}>
                        <img src={performanceSub} className={style.img} alt=''/>
                    </div>
                </div>
            </div>
        );
    }
};