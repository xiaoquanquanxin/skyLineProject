import React from 'react';
//  填充，移动端有露底
export const BlackPadding = ({
    //  颜色
    color,
    //  y轴位移
    y,
}) => {
    color = color || 'red';
    y = y || 0;
    return (
        <div style={{
            boxShadow: `${color} 0 ${y}px 0 3px`,
            height: '0',
            position: 'relative'
        }}/>
    );
};