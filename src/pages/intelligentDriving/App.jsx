import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '@store/reduxMap';
import { commonRelativeWideFn } from '@utils/common';
import './index.css';

const AppRender = connect(
    mapStateToProps,
    mapDispatchToProps
)(
    ({
        //  浏览器信息，来源于redux
        REDUCER_BROWSER_INFO
    }) => {
        const { isRelativeWide } = REDUCER_BROWSER_INFO;
        return (
            <div>{
                isRelativeWide ? 'kuan' : 'zhai '
            }</div>
        );
    }
);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    class App extends Component {
//        constructor(props){
//            super(props);
//        }

        componentDidMount(){
            commonRelativeWideFn(this.props.setRelativeWideFn);
        }

        render(){
            return <AppRender/>;
        }
    }
);