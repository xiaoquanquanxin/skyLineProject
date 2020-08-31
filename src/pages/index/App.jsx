import React from 'react';
import './index.css';
import { BasicHeader } from '@components/basicHeader';
import BasicBanner from '@components/basicBanner';


function App(){
    return (
        <div className="App">
            <BasicHeader/>
            <BasicBanner/>

        </div>
    );
}



export default App;

//  异步加载组件
//import asyncComponent from '@components/asyncComponentLoader/asyncComponentLoader';
//const BasicBanner = asyncComponent(() => import('@components/basicBanner'));

