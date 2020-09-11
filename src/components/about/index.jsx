import React from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from '@store/reduxMap';

export const About = connect(
    mapStateToProps,
    mapStateToProps,
)(class extends React.Component{
    componentDidMount(){

    }

    render(){
        return (
            <div>
                1
            </div>
        );
    }
})