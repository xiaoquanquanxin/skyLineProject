import React from 'react';
import './index.less';
import { BasicHeader } from '@components/basicHeader';
import { BasicFooter } from '@components/basicFooter';

function App(){
    return (
        <div className="App">
            {/*头部*/}
            <BasicHeader/>

            {/*脚部*/}
            <BasicFooter/>
        </div>
    );
}

export default App;
