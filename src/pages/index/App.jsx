import React from 'react';
import './index.css';

import { BasicHeader } from '@components/basicHeader';
import { BasicFooter } from '@components/basicFooter';
import { BannerSwiper } from '@components/index/BannerSwiper';
import { BASIC_COMPARE_WIDTH } from '@utils/constant';
import { resizeListener } from '@utils/eventListener';

const App = class extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            //  浏览器宽度是否超过BASIC_COMPARE_WIDTH
            isRelativelyWide: window.innerWidth > BASIC_COMPARE_WIDTH,

            //  swiper
            swiperData: null,
            //  车规级 AI 芯片
            mainContent: null,
            //  新一代底层计算平台
            subContent: null,
            //  智能客户
            customList: null,
        };
    }

    //  钩子
    componentDidMount(){
        //  发请求，取首页数据
        const data = {
            'top_banner': [{
                'id': 1,
                'type': 1,
                'img': '/upload/202008/27/banner965621598506922.gif',
                'video': '/upload/202008/28/272051598595782.mp4',
                'title': 'AI on Horizon，Journey Together',
                'desc': '芯无止境 开放赋能',
                'title2': null,
                'url': null,
                'rank': 10,
                'second': 10,
                'created_at': '1592900508',
                'updated_at': '1598616319',
                'deleted_at': 0
            }],
            'middle_banner': [{
                'id': 2,
                'type': 2,
                'img': '/upload/202009/01/banner573311598975322.gif',
                'video': '/upload/202009/01/588041598975331.mp4',
                'title': '车规级 AI 芯片<br/>赋能汽车智能化',
                'desc': '智能驾驶的实现需要强大的算力支撑。面向高级辅助驾驶、自动驾驶、智能座舱等汽车智能化场景，地平线可为客户提供基于强算力 AI 芯片的多场景化解决方案。',
                'title2': null,
                'url': null,
                'rank': 0,
                'second': 0,
                'created_at': '0',
                'updated_at': '1598975334',
                'deleted_at': 0
            }],
            'bottom_banner': [{
                'id': 3,
                'type': 3,
                'img': '/upload/202008/27/banner482001598507147.jpg',
                'video': null,
                'title': '新一代底层计算平台<br/>加速普惠 AI',
                'desc': '地平线致力于重塑下一个时代的底层计算平台，解决日益增长与碎片化的数据处理挑战。在通用 AI 领域，地平线正携手合作伙伴赋能千行百业。',
                'title2': null,
                'url': null,
                'rank': 0,
                'second': 0,
                'created_at': '0',
                'updated_at': '1598507184',
                'deleted_at': 0
            }],
            'client': [{
                'id': 16,
                'name': '长安汽车',
                'img': '/upload/202008/27/banner422841598510394.jpg',
                'rank': 10,
                'created_at': '1598510396',
                'updated_at': '1598510396',
                'deleted_at': 0
            }, {
                'id': 15,
                'name': '上汽',
                'img': '/upload/202008/27/banner176461598510353.jpg',
                'rank': 20,
                'created_at': '1598510359',
                'updated_at': '1598510359',
                'deleted_at': 0
            }, {
                'id': 14,
                'name': '奥迪',
                'img': '/upload/202008/27/banner943911598510329.jpg',
                'rank': 30,
                'created_at': '1598510331',
                'updated_at': '1598510331',
                'deleted_at': 0
            }, {
                'id': 13,
                'name': '广汽',
                'img': '/upload/202008/27/banner559161598510312.jpg',
                'rank': 40,
                'created_at': '1598510313',
                'updated_at': '1598510313',
                'deleted_at': 0
            }, {
                'id': 12,
                'name': '红旗',
                'img': '/upload/202008/27/banner678701598510295.jpg',
                'rank': 50,
                'created_at': '1598510297',
                'updated_at': '1598510297',
                'deleted_at': 0
            }, {
                'id': 11,
                'name': 'freetech',
                'img': '/upload/202008/27/banner887301598510271.jpg',
                'rank': 60,
                'created_at': '1598510272',
                'updated_at': '1598510272',
                'deleted_at': 0
            }, {
                'id': 10,
                'name': 'BOSCH',
                'img': '/upload/202008/27/banner428771598510231.jpg',
                'rank': 70,
                'created_at': '1598510235',
                'updated_at': '1598510245',
                'deleted_at': 0
            }, {
                'id': 9,
                'name': 'faurecia clarion',
                'img': '/upload/202008/27/banner442651598510205.jpg',
                'rank': 80,
                'created_at': '1598510207',
                'updated_at': '1598510207',
                'deleted_at': 0
            }, {
                'id': 8,
                'name': 'SK',
                'img': '/upload/202008/27/banner538221598510163.jpg',
                'rank': 90,
                'created_at': '1598510164',
                'updated_at': '1598510164',
                'deleted_at': 0
            }, {
                'id': 7,
                'name': '阿里云',
                'img': '/upload/202008/27/banner373441598510012.jpg',
                'rank': 100,
                'created_at': '1598510013',
                'updated_at': '1598510129',
                'deleted_at': 0
            }, {
                'id': 6,
                'name': '小米',
                'img': '/upload/202008/27/banner894201598509994.jpg',
                'rank': 110,
                'created_at': '1598509995',
                'updated_at': '1598510122',
                'deleted_at': 0
            }, {
                'id': 5,
                'name': '商米',
                'img': '/upload/202008/27/banner904351598509901.jpg',
                'rank': 120,
                'created_at': '1598509902',
                'updated_at': '1598510116',
                'deleted_at': 0
            }, {
                'id': 4,
                'name': 'KEDACOM',
                'img': '/upload/202008/27/banner441171598509880.jpg',
                'rank': 130,
                'created_at': '1598509882',
                'updated_at': '1598510110',
                'deleted_at': 0
            }, {
                'id': 3,
                'name': '富士智能',
                'img': '/upload/202008/27/banner381011598509859.jpg',
                'rank': 140,
                'created_at': '1598509860',
                'updated_at': '1598510104',
                'deleted_at': 0
            }, {
                'id': 2,
                'name': '更多',
                'img': '/upload/202008/27/banner895841598509801.jpg',
                'rank': 150,
                'created_at': '1598509803',
                'updated_at': '1598510097',
                'deleted_at': 0
            }]
        };
        this.setState(() => ({
            swiperData: data.top_banner,
            mainContent: data.middle_banner,
            subContent: data.bottom_banner,
            customList: data.client,
        }));

        //  resize监听，用于适配
        const rfn = (width) => {
            this.setState(() => {
                return {
                    isRelativelyWide: width > BASIC_COMPARE_WIDTH
                };
            });
        };
        //  resize监听
        resizeListener(rfn);
    }

    render(){
        const {
            swiperData,
            mainContent,
            subContent,
            customList,
        } = this.state;
        return (
            <div className="App">
                <BasicHeader/>
                {/*首swiper*/}
                <BannerSwiper swiperData={swiperData}/>
                {/*脚部*/}
                <BasicFooter/>
            </div>
        );
    }
};

export default App;

//  异步加载组件
//import asyncComponent from '@components/asyncComponentLoader/asyncComponentLoader';
//const BasicBanner = asyncComponent(() => import('@components/basicBanner'));

