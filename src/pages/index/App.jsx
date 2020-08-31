import React from 'react';
import './index.css';
import { BasicHeader } from '@components/basicHeader';
import { BasicBanner } from '@components/basicBanner';
import { HomeChip } from '@components/index/homeChip';

function App(){
    return (
        <div className="App">
            {/*头部*/}
            <BasicHeader/>
            {/*主横幅*/}
            <BasicBanner/>
            {/*首页芯片*/}
            <HomeChip/>
        </div>
    );
}

export default App;

//  异步加载组件
//import asyncComponent from '@components/asyncComponentLoader/asyncComponentLoader';
//const BasicBanner = asyncComponent(() => import('@components/basicBanner'));

