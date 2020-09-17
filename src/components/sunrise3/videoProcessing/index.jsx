import React from 'react';
import style from './index.module.less';

export const VideoProcessing = ({
    videoProcessingData
}) => {
    videoProcessingData = videoProcessingData || {};
    return (
        <div className={style.videoProcessing}>
            <p className={style.title} dangerouslySetInnerHTML={{ __html: videoProcessingData.title }}/>
            <div className={style.desc} dangerouslySetInnerHTML={{ __html: videoProcessingData.desc }}/>
            <img className={style.img} alt=''
                 src={videoProcessingData.img}
            />
        </div>
    );
};