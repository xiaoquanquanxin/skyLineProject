import React from 'react';
import style from './index.module.less';
import { RobotoCondensed } from '@components/sunrise3/robotoCondensed';

export const SuperIsp = ({
    superIspData
}) => {
    superIspData = superIspData || {};
    return (
        <div className={style.superIsp}>
            <div className={style.superIspIn}>
                <img className={style.img} src={superIspData.img} alt=''/>
                <div className={style.descText}>
                    <p className={style.title} dangerouslySetInnerHTML={{ __html: superIspData.title }}/>
                    <div className={style.desc} dangerouslySetInnerHTML={{ __html: superIspData.desc }}/>
                    <ul className={style.sTitle}>
                        <RobotoCondensed data={{}}/>
                    </ul>
                </div>
            </div>
        </div>
    );
};