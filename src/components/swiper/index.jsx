import React, { createRef } from 'react';
import { mapDispatchToProps, mapStateToProps } from '@store/reduxMap';
import { connect } from 'react-redux';
import Swiper from 'swiper';
import { resizeListener } from '@utils/eventListener';
import { FRAME_DELAY } from '@utils/constant';
import { BannerSlider } from '@components/index/bannerSwiper';
import { CustomerSlickItem } from '@components/index/assignedCustomer';
import { AboutBannerSliderItem } from '@components/bannerManage/aboutBanner';

import 'swiper/dist/css/swiper.css';
import './index.less';

export const CustomSwiper = connect(
    mapStateToProps,
    mapDispatchToProps,
)(class extends React.Component {
    /**
     * basicDelay:默认滚动时间，这是为数据如果没有second字段准备的
     * */
    constructor(props){
        super(props);
        this.swiperRef = createRef();
        this.paginRefs = [];
        this.mySwiper = null;
        //  定时器
        this.timer = null;
        this.state = {
            //  -1:未开始，0:开始初始化，1:初始化完成
            status: -1,
            //  真实下标
            realIndex: 0,
        };
    }

    //  初始化
    componentDidMount(){
        this.setState(() => ({
            status: 0
        }));
    }

    //  更新props数据
    componentDidUpdate(prevProps, a, b){
        const { swiperData } = this.props;
        //  不是这个变化
        if (swiperData === prevProps.swiperData) {
            return;
        }
        console.log(`swiperData的数量`, swiperData.length);
        //  数据量必须>=2才能有swiper，否则没有swiper
        if (swiperData.length < 2) {
            return;
        }
        //  console.log('swiper的update执行次数');
        this.mySwiper = new Swiper(this.swiperRef.current, {
            autoplay: {
                delay: 100000000,
            },
            loop: true,
            on: {
                slideChangeTransitionStart: () => {
                    this.transform();
                },
            }
        });
        //  创建多个paginer分页器所用的ref
        for (let i = 0; i < swiperData.length; i++) {
            this.paginRefs.push(createRef());
        }
        resizeListener(() => {
            this.transform();
        });
        window.requestAnimationFrame(() => {
            this.transform();
        });
        this.setState(() => ({
            status: 1,
        }));
    }

    //  分页计时器变换
    transform(){
        const { status } = this.state;
        if (status !== 1) {
            return;
        }
        const { swiperData, basicDelay } = this.props;
        const { realIndex } = this.mySwiper;

        //  激活的i元素
        const activeElement = this.paginRefs[realIndex].current;
        //  必须有激活元素，否则是一个轮播图    todo 重要
        if (activeElement === null) {
            return;
        }

        if (this.timer) {
            clearTimeout(this.timer);
        }
        //  延迟时间
        const second = swiperData[realIndex].second || basicDelay;
        //  console.log('延迟时间：s', second);
        //  console.log('真实下标', realIndex);
        //  延迟次数
        const fullTime = second * 1000 / FRAME_DELAY;

        //  最开始的i的宽度所需执行次数
        let i = (fullTime * 12.5 / 100)|0;
        const fn = () => {
            this.timer = setTimeout(() => {
                if (i >= fullTime) {
                    clearTimeout(this.timer);
                    this.timer = null;
                    //  播放下一个
                    this.mySwiper.slideNext();
                    return;
                }
                //  console.log('定时器');
                //  i的宽度 = 执行次数 / 总需执行次数
                this.setActiveClassName(activeElement, i / fullTime);
                i++;
                fn();
            }, FRAME_DELAY * 1);
        };
        fn();
        //  console.log('swiper的transform执行执行');
        this.paginRefs.forEach(item => {
            item.current.classList.remove('active-pagination');
            item.current.querySelector('i').style.width = '0';
        });
        this.setActiveClassName(activeElement, i / fullTime);
    }

    //  激活类型的class
    setActiveClassName(activeElement, width){
        activeElement.classList.add('active-pagination');
        activeElement.querySelector('i').style.width = `${width * 100}%`;
    }

    render(){
        const { swiperData, sliderItemType } = this.props;
        const { status } = this.state;
        let SliderItem = null;
        switch (sliderItemType) {
            case 1: //  首页banner
                SliderItem = BannerSlider;
                break;
            case 2: //  首页的赋能客户
                SliderItem = CustomerSlickItem;
                break;
            case 3: //  新闻中心、关于我们
                SliderItem = AboutBannerSliderItem;
                break;
            default:
                throw new Error('错误的类型');
        }
        return (
            <div className={`swiper-container`} ref={this.swiperRef}
                 data-status={status}
            >
                <div className="swiper-wrapper">
                    {swiperData && swiperData.length && swiperData.map(
                        (item, index) => {
                            return (
                                <div key={item.id || index} className="swiper-slide">
                                    <SliderItem data={item}/>
                                </div>
                            );
                        })
                    }
                </div>
                <div className={`swiper-pagination-custom`}>
                    {swiperData && swiperData.length > 1 && swiperData.map(
                        (item, index) => {
                            return (
                                <span key={item.id || index} ref={this.paginRefs[index]}><i/></span>
                            );
                        })
                    }
                </div>
            </div>
        );
    }
});
