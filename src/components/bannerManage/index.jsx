import React from 'react';
import { requestGetBannerByType } from '@api/index';
import { navSortByRank } from '@utils/utils';
import { CustomSwiper } from '@components/swiper';
import style from './index.module.less';

export class AboutBanner extends React.Component {
    /**
     * bannerType : 用于请求
     * */
    constructor(props){
        super(props);
        if (!props.bannerType) {
            throw new Error(`缺少用于发请求的bannerType${props.bannerType}`);
        }
        this.state = {
            swiperData: null,
        };
    }

    componentDidMount(){
        const { bannerType } = this.props;
        console.log(bannerType);
        //  发请求，取页面数据
        requestGetBannerByType(bannerType)
            .then(v => {
                navSortByRank(v.data, 'rank');
//                  const swiperData = v.data.concat(Object.assign({}, v.data[0]));
//                  swiperData[0].id = '122';
                const swiperData = v.data;
                //  console.log(swiperData);
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
                        basicDelay={5}
                    />
                </div>
            </div>
        );
    }
}
