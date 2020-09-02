import React from 'react';
import style from './index.less';

export const LearnMore = () => {
    return (
        <div className={style.learnMore}>
            <img src={require('@media/index/HomeAI.gif')}
                 className={style.homeAI}
                 alt=''
            />
            <div className={style.learnMoreContent}>
                <h1 className={style.learnMoreTitle}>旭日初升，踏上征程</h1>
                <a href='' className={style.learnMoreLink}>了解更多</a>
            </div>
        </div>
    );
};
