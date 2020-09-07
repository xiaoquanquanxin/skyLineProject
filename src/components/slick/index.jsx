import React from 'react';
import Slider from 'react-slick';
import '@css/slick-theme.less';
import { resizeListener } from '@utils/eventListener';
import { BannerSlider } from '@components/index/bannerSlick';
import { BASIC_COMPARE_WIDTH, FRAME_DELAY } from '@utils/constant';

const SlickRender = ({
    slickSetting,
    swiperData,
    sliderRef,
    //  slider的类型
    sliderItemType,
}) => {
    let SliderItem = null;
    switch (sliderItemType) {
        case 1: //  首页banner
            SliderItem = BannerSlider;
            break;
        default:
            throw new Error('错误的类型');
    }
//    console.log('执行次数');
    return (
        <Slider {...slickSetting} ref={sliderRef}>
            {swiperData && swiperData.map(
                item => (
                    <SliderItem
                        key={item.id}
                        video={item.video}
                        img={item.img}
                        title={item.title}
                        desc={item.desc}
                        url={item.url}
                    />
                )
            )}
        </Slider>
    );

};

export class Slick extends React.Component {
    constructor(props){
        super(props);
        //  状态
        this.state = {
            //  数据
            swiperData: null,
        };
        //  设置
        this.slickSetting = {
            //  自动
            autoplay: false,
            //  自动周期
            autoplaySpeed: 1,

            //  一次的速度
            speed: 300,
            //  循环
            infinite: true,
            //  前后按钮
            arrows: false,
            //  自定义分页
            customPaging: (index) => {
                return (
                    <span><i ref={this.paginRefs[index]}/></span>
                );
            },
            //  变更之后
            afterChange: (activeIndex) => {
                this.activeIndex = activeIndex;
                this.transform();
            },
            //  鼠标浮于上方停播
            pauseOnHover: false,
            //  分页器是点
            dots: true,
            //   悬停在分页器上时防止自动播放
            pauseOnDotsHover: false,
            //  阈值，越大滑动距离可以越短
            touchThreshold: 30,

        };
        //  计时器
        this.timer = null;
        //  激活的index
        this.activeIndex = 0;
        //  dom元素
        this.paginRefs = [];
    }

    //  当数据更新时
    componentDidUpdate(prevProps, prevState, snapshot){
        const swiperData = this.props.swiperData;
        //  不是这个变化
        if (swiperData === prevProps.swiperData) {
            return;
        }
        console.log('swiperData', swiperData);
        this.setState(() => ({
            swiperData,
        }));
        //  创建多个paginer分页器所用的ref
        for (let i = 0; i < swiperData.length; i++) {
            this.paginRefs.push(React.createRef());
        }
        //  slider的ref
        this.sliderRef = React.createRef();
        resizeListener(() => {
            this.transform();
        });
        //  需要延迟一帧执行
        window.requestAnimationFrame(() => {
            this.transform();
        });
    }

    //  进度条的变化
    transform(){
        if (!this.sliderRef.current) {
            return;
        }
        //  插件有个bug，来回切换的时候，原先那个的slider的定时器不停止。需要先暂停，再播放
        this.sliderRef.current.slickPause();
        //  必须要有足够多的轮播
        if (this.paginRefs.length === 0) {
            return;
        }
        //  激活的i元素
        const activeElement = this.paginRefs[this.activeIndex].current;
        //  必须有激活元素，否则是一个轮播图
        if (activeElement === null) {
            return;
        }
        //  所有元素先置为初始化
        this.paginRefs.forEach(item => {
            //  初始化宽度为 i 标签的高度，i是蓝色的进度条
            item.current.style.width = `${activeElement.clientHeight}px`;
        });
        if (this.timer) {
            clearTimeout(this.timer);
        }

        //  本次延迟的完整时间
        const second = this.props.swiperData[this.activeIndex].second;
        //  延迟次数
        const fullTime = second * 1000 / FRAME_DELAY;
        //  最开始的i的宽度所需执行次数
        let i = (fullTime * 12.5 / 100)|0;
        const fn = () => {
            this.timer = setTimeout(() => {
                if (i >= fullTime) {
                    this.sliderRef.current.slickPlay();
                    clearTimeout(this.timer);
                    this.timer = null;
                    return;
                }
                //  i的宽度 = 执行次数 / 总需执行次数
                activeElement.style.width = `${i / fullTime * 100}%`;
                i++;
                fn();
            }, FRAME_DELAY);
        };
        fn();
    };

    render(){
        const {
            swiperData
        } = this.state;
        const {
            sliderItemType,
        } = this.props;
//        console.log('执行次数')
        return (
            <SlickRender
                slickSetting={this.slickSetting}
                swiperData={swiperData}
                sliderRef={this.sliderRef}
                sliderItemType={sliderItemType}
            />
        );
    }
}
