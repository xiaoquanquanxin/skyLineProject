import React from 'react';
import './index.css';
import { BasicHeader } from '@components/basicHeader';

function App(){
    return (
        <div className="App">
            <BasicHeader
                menuListActiveIndex={1}
            />
        </div>
    );
}

export default App;
