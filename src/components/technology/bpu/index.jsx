import React, { createRef } from 'react';
import style from './index.module.less';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '@store/reduxMap';
import { FRAME_DELAY } from '@utils/constant';

export const Bpu = connect(
    mapStateToProps,
    mapDispatchToProps
)(
    class extends React.Component {
        listRef;
        boxRef;

        constructor(props){
            super(props);
            this.state = {
                //  激活的id
                activeIndex: 2,
            };
            this.setActive = this.setActive.bind(this);
            this.listRef = createRef();
            this.boxRef = createRef();
        }

        componentDidMount(){

        }

        setActive(activeIndex){
            this.setState(() => {
                return {
                    activeIndex,
                };
            });
        }

        componentDidUpdate(prevProps, prevState, snapshot){
            if (this.props.bpuData.list !== (prevProps.bpuData && prevProps.bpuData.list)) {
                window.requestAnimationFrame(() => {
                    setTimeout(() => {
                        //  list数据发生变化
                        //  console.log(this.boxRef.current);
                        //  console.log(this.listRef.current);
                        const boxRef = this.boxRef.current;
                        const listRef = this.listRef.current;
                        const diffX = (listRef.offsetWidth - boxRef.offsetWidth) / 2;
                        //  console.log(listRef.offsetWidth);
                        //  console.log(boxRef.offsetWidth);
                        //  console.log(diffX);
                        boxRef.scrollTo(diffX, 0);
                    }, FRAME_DELAY * 2);
                });
            }
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
                        <div className={style.bpuUlBox} ref={this.boxRef}>
                            <ul className={style.list} ref={this.listRef}>{list}</ul>
                        </div>
                    </div>
                </div>
            );
        }

    }
);

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