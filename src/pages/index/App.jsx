import React from 'react';
import './index.css';
import { BasicHeader } from '@components/basicHeader';
import BasicBanner from '@components/basicBanner';

//  异步加载组件
//import asyncComponent from '@components/asyncComponentLoader/asyncComponentLoader';
//  微信-确认订单页面
//const BasicBanner = asyncComponent(() => import('@components/basicBanner'));

function App(){
    return (
        <div className="App">
            <BasicHeader/>
            <BasicBanner/>
        </div>
    );
}

export default App;
