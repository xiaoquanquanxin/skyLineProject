import React, { createRef } from 'react';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '@store/reduxMap';
import style from './index.module.less';
import activeArrow from '@media/technology/arrow-next.svg';
import greyArrow from '@media/technology/arrow-next-gray.svg';
import layout from '@css/layout.module.less';
import Swiper from 'swiper';
import { FRAME_DELAY } from '@utils/constant';
import './index.less';
import 'swiper/dist/css/swiper.css';

export const XinPeriod = connect(
    mapStateToProps, mapDispatchToProps
)(
    class extends React.Component {
        swiperRef;
        mySwiper;

        constructor(props){
            super(props);
            this.state = {
                activeIndex: null,
            };
            this.swiperRef = createRef();
        }

        componentDidUpdate(prevProps, prevState, snapshot){
            //  以前没数据，说明这一次是注入数据
            if (!prevProps.xinPeriodData) {
                const { xinPeriodData } = this.props;
                console.log(xinPeriodData.list);
                window.requestAnimationFrame(() => {
                    this.setState(() => {
                        return {
                            activeIndex: 0,
                        };
                    });
                });
                return;
            }
            if (prevState.activeIndex == null) {
                this.mySwiper = new Swiper(this.swiperRef.current, {
                    autoplay: false,
                    loop: false,
                    slidesPerView: 5,
                });
                this.setActiveIndex();
            }
        }

        //  type -1前一个，1后一个
        switchover(type){
            switch (type) {
                case -1:
                    this.mySwiper.slidePrev();
                    break;
                case 1:
                    this.mySwiper.slideNext();
                    break;
                default:
                    throw new Error('type');
            }
            this.setActiveIndex();
        }

        setActiveIndex(){
            const { activeIndex } = this.mySwiper;
            this.setState(() => {
                return {
                    activeIndex,
                };
            });
            console.log(activeIndex);
        }

        render(){
            const { xinPeriodData } = this.props;
            if (!xinPeriodData) {
                return '';
            }
            let list;
            if (xinPeriodData.list) {
                list = xinPeriodData.list.map((item, index) => {
                    return (
                        <div key={item.id || index} className={`swiper-slide ${style.swiperSlide}`}>
                            <XinPeriodItem data={item}/>
                        </div>
                    );
                });
            }
            const { activeIndex } = this.state;
            return (
                <div className={style.xinPeriod}>
                    <div className={style.xinPeriodIn}>
                        <p className={style.title} dangerouslySetInnerHTML={{ __html: xinPeriodData.title }}/>
                        <div className={style.desc} dangerouslySetInnerHTML={{ __html: xinPeriodData.desc }}/>
                        <div className={style.twoArrow}>
                            <img className={`${style.arrow} ${style.l_arrow}`}
                                 src={activeIndex > 0 ? activeArrow : greyArrow} alt=''
                                 onClick={() => {this.switchover(-1);}}
                            />
                            <img className={`${style.arrow} ${style.r_arrow}`}
                                 src={activeIndex + 5 < xinPeriodData.list.length ? activeArrow : greyArrow} alt=''
                                 onClick={() => {this.switchover(+1);}}
                            />
                        </div>
                        <div className={`swiper-container ${style.list}`} ref={this.swiperRef} id='xinPeriod'>
                            <div className="swiper-wrapper">
                                {list}
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
);

//  每一项
const XinPeriodItem = ({
    data,
}) => {
    //  console.log(data);
    return (
        <div className={`${style.nameImg} ${layout.left} name-img`}>
            <p className={style.name}>{data.name} </p>
            <div className={style.imgCenter2}/>
            <dl className={style.xinDesc}>
                <dd className={style.dd}>· 伯努利1.0</dd>
                <dd className={style.dd}>· 4 TOPS</dd>
                <dd className={style.dd}>· 2 W</dd>
                <dd className={style.dd}>· AEC-Q100</dd>
            </dl>
        </div>
    );
};