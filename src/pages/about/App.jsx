import React, { Component } from 'react';
import { BasicHeader } from '@components/basicHeader';
import { BasicFooter } from '@components/basicFooter';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '@store/reduxMap';
import { requestGetAboutUs } from '@api/index';
import { commonRelativeWideFn } from '@utils/utils';
import { navSortByRank } from '@utils/utils';
import { About } from '@components/about';
import { AboutBanner } from '@components/bannerManage';
import './index.module.less';

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    class App extends Component {
        constructor(props){
            super(props);
            this.state = {};
        }

        componentDidMount(){
            requestGetAboutUs()
                .then(v => {
                    navSortByRank(v.invest, 'rank');
                });
            commonRelativeWideFn(this.props.setRelativeWideFn);
        }

        render(){
            return (
                <div className="App">
                    {/*头部*/}
                    <BasicHeader/>
                    {/*banner轮播*/}
                    <AboutBanner bannerType={5}/>
                    <About/>
                    {/*脚部*/}
                    <BasicFooter/>
                </div>
            );
        }
    }
);

//import BMap from 'BMap';
//var map = new BMap.Map('allmap'); // 创建Map实例
//map.centerAndZoom(new BMap.Point(116.404, 39.915), 11); // 初始化地图,设置中心点坐标和地图级别
//map.addControl(new BMap.MapTypeControl()); //添加地图类型控件
//map.setCurrentCity('北京'); // 设置地图显示的城市 此项是必须设置的
//map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
{/*<div id='allmap' style={{ width: '100vw', height: '100vh' }}/>*/}
