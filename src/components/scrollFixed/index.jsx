import React, { createRef } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from '@store/reduxMap';
import style from './index.module.less';

export const ScrollFixed = connect(
    mapStateToProps,
)(
    class extends React.Component {
        scrollFixedRef;

        constructor(props){
            super(props);
            this.scrollFixedRef = createRef();
        }

        render(){
            const { RenderElement, REDUCER_BROWSER_INFO } = this.props;
            const { current } = this.scrollFixedRef;
            const styleSheet = {};
            let className = null;
            //  如果有元素了
            if (current) {
                styleSheet.height = `${current.offsetHeight}px`;
                //  如果滚动的距离大于元素本身的距离top的距离
                if (REDUCER_BROWSER_INFO.scrollTop > current.offsetTop) {
                    className = style.scrollFixed;
                } else {
                    className = style.scrollRelative;
                }
            }
            return (
                <div className={style.wrap} style={styleSheet}>
                    <div className={className} ref={this.scrollFixedRef}>
                        <RenderElement/>
                    </div>
                </div>
            );
        }
    }
);
