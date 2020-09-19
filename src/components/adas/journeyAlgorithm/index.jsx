import React from 'react';
import style from './index.module.less';
import { BasicTitleDesc } from '@components/basicTitleDesc';

import playImg from '@media/video/video-play.png';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '@store/reduxMap';

//  征程2 视觉感知算法
export const JourneyAlgorithm = connect(
    mapStateToProps,
    mapDispatchToProps,
)(({
        jAData,
        setVideoOpenStatus,
    }) => {
        jAData = jAData || {};
        let list = [];
        if (jAData.content) {
            //  不是回车、换行
            const content = jAData.content.split(/(\r|\n|\t|\v)/).filter(item => {
                return (item !== '\r') && (item !== '\n') && (item !== '\t') && (item !== '\v') && item;
            });
            //  console.log(content);
            for (let i = 0; i < content.length; i += 2) {
                list.push(<JAItem key={i} data={{ name: content[i], desc: content[i + 1] }}/>);
            }
        }
        return (
            <div className={style.journeyAlgorithm}>
                <div className={style.journeyAlgorithmIn}>
                    <BasicTitleDesc data={jAData}/>
                    <div className={style.videoDesc}>
                        <div className={style.videoBox} style={{ backgroundImage: `url(${jAData.img})` }}>
                            <img className={style.img} alt='' src={playImg}
                                 onClick={() => {setVideoOpenStatus(true, jAData && jAData.video);}}
                            />
                        </div>
                        <ul className={style.descList}>
                            {list}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
);
//  每一项
const JAItem = ({ data }) => {
    return (
        <li className={style.item}>
            <p className={style.name} dangerouslySetInnerHTML={{ __html: data.name }}/>
            <div className={style.desc} dangerouslySetInnerHTML={{ __html: data.desc }}/>
        </li>
    );
};
