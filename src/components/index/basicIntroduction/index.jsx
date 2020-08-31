import React from 'react';
import style from './index.less';

export const BasicIntroduction = ({
    title,
    description,
    linkHref,
    contentIsLeft
}) => {
    console.log(contentIsLeft);
    return (
        <div className={`${style.basicIntroductionContent} ${contentIsLeft ? style.contentLeft : style.contentRight}`}>
            <p className={style.title}>{title}</p>
            <p className={style.description}>{description}</p>
            {/*todo    这个地址*/}
            <a href={linkHref} className={style.link}>了解更多&nbsp;&nbsp;&gt;</a></div>
    );
};