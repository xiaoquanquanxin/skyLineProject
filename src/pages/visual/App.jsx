import React, { Component } from 'react';
import './index.css';
import { BasicHeader } from '@components/basicHeader';

function App(){
    return (
        <BasicHeader
            menuListActiveIndex={2}
        />
    );
}

export default App;
