import React from 'react';
import style from './index.module.less';
import { BasicTitleDesc } from '@components/basicTitleDesc';

//  方案优势
export const MultipleAdvantages = class extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            activeIndex: 2,
        };
        this.mouseHover.bind(this);
    }

    mouseHover(activeIndex){
        this.setState(() => {
            return {
                activeIndex
            };
        });
    }

    render(){
        const maData = this.props.maData || {};
        const { activeIndex } = this.state;
        const { maDataNormal, maDataHover } = maData;
        if (!maDataNormal) {
            return '';
        }
        const list = maDataNormal.map((item, index) => {
            const hoverData = maDataHover[index];
            return (
                <li className={`${style.item} ${activeIndex === index ? style.active : ''}`}
                    onMouseOver={() => {this.mouseHover(index);}}
                    style={{ backgroundImage: `url(${item.img || '' })` }}
                    key={index}
                >
                    <div className={style.thumb}
                         style={{ backgroundImage: `url(${hoverData.img || '' })` }}>
                        <p className={style.name} dangerouslySetInnerHTML={{ __html: item.title }}/>
                        <div className={style.desc} dangerouslySetInnerHTML={{ __html: hoverData.desc }}/>
                    </div>
                </li>
            );
        });
        return (
            <div className={style.multipleAdvantages}>
                <div className={style.multipleAdvantagesIn}>
                    <BasicTitleDesc data={{ title: '方案优势' }} isLight={true}/>
                    <ul className={style.list}>
                        {list}
                    </ul>
                </div>
            </div>
        );
    }

};