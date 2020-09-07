import React, { Component } from 'react';
import './index.css';
import { BasicHeader } from '@components/basicHeader';

function App(){
    return (
        <div className="App">
            <BasicHeader
                menuListActiveIndex={3}
            />
        </div>
    );
}

export default App;
