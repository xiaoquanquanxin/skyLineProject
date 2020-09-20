import React from 'react';
import style from './index.module.less';
import layout from '@css/layout.module.less';
import { BasicTitleDesc } from '@components/basicTitleDesc';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '@store/reduxMap';

//  客户案例
export const NCustomerCase = connect(
    mapStateToProps,
    mapDispatchToProps,
)(({
    nCustomerCaseData,
    setVideoOpenStatus
}) => {
    nCustomerCaseData = nCustomerCaseData || {};
    return (
        <div className={style.customerCase}>
            <div className={style.customerCaseIn}>
                <BasicTitleDesc data={{ title: '客户案例' }}/>
                <div className={`${layout.imgCenter2} ${style.imgCenter2}`}
                     style={{ backgroundImage: `url(${nCustomerCaseData.img})` }}
                     onClick={() => {setVideoOpenStatus(true, nCustomerCaseData && nCustomerCaseData.video);}}
                />
                <div className={style.nameDesc}>
                    <p className={style.name}
                       dangerouslySetInnerHTML={{ __html: nCustomerCaseData.title }}/>
                    <div className={style.line}/>
                    <div className={style.desc}
                         dangerouslySetInnerHTML={{ __html: nCustomerCaseData.desc }}/>
                </div>
            </div>
        </div>
    );
});