import React from 'react';
import { isMobile } from '@utils/utils';
//  填充，移动端有露底
export const BlackPadding = ({
    boxShadow,
    color,
}) => {
    if (!isMobile) {
        return '';
    }
    color = color || '#111111';
    return (
        <div style={{
            boxShadow: `${color} 0px 0 0 0.01rem`,
            backgroundColor: color,
            height: '0',
            position: 'relative'
        }}/>
    );
};