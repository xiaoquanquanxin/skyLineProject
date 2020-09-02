import React from 'react';
import CSSModules from 'react-css-modules';
import { pathConfig } from '@utils/constant';
import style from './index.less';
import layout from '@css/layout.less';

const MenuListItem = CSSModules(
    ({
        //  是激活状态
        isActive,
        //  文字
        content,
        //  链接
        href,
        //  打开方式
        target
    }) => {
        let clickFn = null;
        //  路由一样，不跳转
        if (window.location.pathname === href) {
            clickFn = (e) => {
                e.preventDefault();
                return false;
            };
        }
        return (
            <li>
                <a className={`${isActive ? style.activeColor : ''} ${style.menuListItem}`}
                   href={href}
                   target={target}
                   onClick={clickFn}>
                    {content}
                </a>
            </li>
        );
    }
);

//  中英文切换
const ChineseEnglishSwitch = CSSModules(
    (isCN) => (
        <li>
            <div className={`${style.menuListItem} ${style.languageItem}`}>
                {isCN ? <span className={style.activeColor}>CN</span> : <a href='https://horizon.ai/'>CN</a>}
                <b className={style.languageSplit}>/</b>
                {!isCN ? <span className={style.activeColor}>EN</span> : <a href='https://en.horizon.ai/'>EN</a>}
            </div>
        </li>
    )
);

//  产品列表项
const ProductItem = CSSModules(
    ({ src, href, description }) => (
        <li className={style.item}>
            <a href={href}>
                <img className={style.itemImage} src={src} alt={description}/>
                <span className={style.itemDescription}>{description}</span>
            </a>
        </li>
    )
);

//  解决方案
const SolutionItem = CSSModules(
    ({ activeColor, block }) => (
        <li className={style.headerProgramme}>
            <div className={`${style.menuListItem}
                                 ${activeColor ? style.activeColor : ''}`}
            >解决方案
            </div>
            <ul className={style.programme}>
                <li><a href={pathConfig.intelligentDriving}>智能驾驶</a></li>
                <li className={style.aiotChildrenWrap}>
                    <a href='/'>智能物联网</a>
                    <ul className={style.aiotChildren}>
                        <li><a href={pathConfig.visual}>视觉</a></li>
                        <li><a href={pathConfig.voice}>语音</a></li>
                    </ul>
                </li>
            </ul>
        </li>
    )
);

//  主菜单
export const MenuPC = ({
    //  导航信息是展开的
    menuIsFold,
    //  是位于顶部并且是在首页
    isTopAndHome,
    //  激活了哪一个路由 index
    menuListActiveIndex,
    //  展开了哪一个菜单 index
    menuListUnFoldIndex,
    //  是中文
    isCN,
    //  数据
    navListData,
}) => {
    if (!navListData || !navListData.length) {
        return '';
    }
    const list = navListData.map((item) => {
        return (
            <MenuListItem
                isActive={item.isActive}
                key={item.id}
                content={item.name}
                href={item.url}
                target={item.is_out ? '_blank' : '_self'}
            />
        );
    });
    return (
        <ul className={`${style.menuPC} ${layout.clearfix} ${isTopAndHome ? style.isTopAndHome : ''}`}>
            {list}
        </ul>
    );
};