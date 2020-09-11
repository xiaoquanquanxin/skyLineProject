import React from 'react';
import { requestGetBannerByType } from '@api/index';
import { navSortByRank } from '@utils/utils';
import { CustomSwiper } from '@components/swiper';
import style from './index.module.less';
import './banner.less';

export class AboutBanner extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            swiperData: null
        };
    }

    componentDidMount(){
        const { bannerType } = this.props;
        //  发请求，取页面数据
        requestGetBannerByType(bannerType)
            .then(v => {
                navSortByRank(v.data, 'rank');
                //  const swiperData = v.data.concat(Object.assign({}, v.data[0]));
                //  swiperData[0].id = '122';
                const swiperData = v.data;
                console.log(swiperData);

                this.setState(() => {
                    return {
                        swiperData,
                    };
                });
            });
    }

    render(){
        const { swiperData } = this.state;
        return (
            <div className={style.bannerSwiper} id='banner'>
                <div className={style.container}>
                    <CustomSwiper
                        swiperData={swiperData}
                        sliderItemType={3}
                        basicDelay={1}
                    />
                </div>
            </div>
        );
    }
}

//  关于我们，轮播每一项
export const AboutBannerSliderItem = ({
    data
}) => {
    return (
        <div className={style.bannerSlider}>
            <img className={style.bannerImg} src={data.img} alt={data.title || ''}/>
            <p className={style.bannerTitle}>{data.title}</p>
        </div>
    );
};