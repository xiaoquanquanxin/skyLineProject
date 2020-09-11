import React from 'react';
import { requestGetBannerByType } from '@api/index';
import { navSortByRank } from '@utils/utils';
import { CustomSwiper } from '@components/swiper';
import style from './index.module.less';

export class AboutBanner extends React.Component {
    //  区分使用使用的子组件
    //  key: bannerType , value : sliderItemType
    bannerSliderTypeMap = {
        //  关于我们、新闻中心
        4: 3,
        5: 3,
        //  核心技术、天工开物、高级别辅助驾驶、自动驾驶、智能座舱、高精地图、智能物联网
        6: 4,
    };
    //  功能类似，banner的Id
    //  key: bannerType , value : bannerId
    bannerIdMap = {
        //  关于我们、新闻中心
        4: 'aboutBanner',
        5: 'aboutBanner',
        //
        //  核心技术、天工开物、高级别辅助驾驶、自动驾驶、智能座舱、高精地图、智能物联网
        6: 'projectBanner',
    };

    /**
     * bannerType : 用于请求
     * */
    constructor(props){
        super(props);
        const { bannerType } = props;
        if (!bannerType) {
            throw new Error(`缺少用于发请求的bannerType${bannerType}`);
        }
        console.log(`bannerType:${bannerType}`);
        this.state = {
            swiperData: null,
            sliderItemType: this.bannerSliderTypeMap[bannerType],
            bannerId: this.bannerIdMap[bannerType],
        };
    }

    componentDidMount(){
        const { bannerType } = this.props;

        //  发请求，取页面数据
        requestGetBannerByType(bannerType)
            .then(v => {
                navSortByRank(v.data, 'rank');
//                const swiperData = v.data.concat(Object.assign({}, v.data[0]));
//                swiperData[0].id = '122';
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
        const { swiperData, sliderItemType, bannerId } = this.state;
        return (
            <div className={style.bannerSwiper} id={bannerId}>
                <div className={style.container}>
                    <CustomSwiper
                        swiperData={swiperData}
                        sliderItemType={sliderItemType}
                        basicDelay={5}
                    />
                </div>
            </div>
        );
    }
}
