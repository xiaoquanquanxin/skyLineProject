import React from 'react';
import style from './index.module.less';

export const Bpu = class extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            //  激活的id
            activeIndex: null
        };
        this.setActive = this.setActive.bind(this);
    }

    setActive(activeIndex){
        this.setState(() => {
            return {
                activeIndex,
            };
        });
    }

    render(){
        const { bpuData } = this.props;
        const { activeIndex } = this.state;
        let list;
        if (bpuData && bpuData.list) {
            list = bpuData.list.map((item, index) => {
                return (
                    <BpuItem key={index}
                             bpuData={item}
                             activeIndex={activeIndex}
                             index={index}
                             setActive={this.setActive}/>
                );
            });
        }
        return (
            <div className={style.bpu}>
                <div className={style.bpuIn}>
                    <p className={style.title} dangerouslySetInnerHTML={{ __html: bpuData && bpuData.title }}/>
                    <div className={style.desc} dangerouslySetInnerHTML={{ __html: bpuData && bpuData.desc }}/>
                    <div className={style.bpuUlBox}>
                        <ul className={style.list}>
                            {list}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }

};

//  每一项
const BpuItem = ({
    data,
    activeIndex,
    index,
    setActive,
}) => {
    const imageUrl = 'http://horizon.wx.h5work.com/images/technology/4.png';
    return (
        <li className={`${style.item} ${index === activeIndex ? style.active : ''}`}
            onMouseEnter={() => {setActive(index);}}>
            <div className={style.imgCenter2}
                 style={{ backgroundImage: `url(${imageUrl})` }}
            />
            <p className={style.name}>高斯架构</p>
            <div className={style.line}/>
            <div className={style.sdesc}>
                · 1080p@30fps<br/>· 每帧检测 200 个目标<br/>· 同时检测多达 8 类目标<br/>·支持目标识别
            </div>
        </li>
    );
};