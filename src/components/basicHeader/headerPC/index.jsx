import React from 'react';
import CSSModules from 'react-css-modules';
import { MenuPC } from '@components/basicHeader/menuPC';
import { GetHeaderLogoMenuInformation, logoClick } from '../common/headerCommon';
import style from './index.module.less';
import layout from '@css/layout.module.less';

//  PC端头部
export const HeaderPC = CSSModules(({
    //  页面是处于顶部
    isTop,
    //  鼠标浮于上方
    isOverHeader,
    //  是否为首页
    isHomePage,
    //  数据
    navListData,
    //  鼠标浮于header上方
    headerMouseOver,
    //  鼠标离开
    headerMouseLeave,
}) => {
//    console.log('是首页',isHomePage);
    //  渲染信息
    const headerRenderInfo = GetHeaderLogoMenuInformation(true, isTop, isHomePage, isOverHeader);
    return (
        <header className={style.basicHeader}
                onMouseOver={() => {headerMouseOver();}}
                onMouseLeave={() => {headerMouseLeave();}}
        >
            <div className={`${style.basicHeaderWrap} ${headerRenderInfo.isTopAndHome ? style.isTopAndHome : ''}`}>
                <div className={`${style.inner} ${layout.clearfix}`}>
                    {/*logo*/}
                    <img className={`${style.basicHeaderLogo}`}
                         src={headerRenderInfo.imageLogoSrc}
                         onClick={() => (logoClick(isHomePage))}
                         alt="地平线头部logo"/>
                    {/*菜单*/}
                    <MenuPC
                        navListData={navListData}
                        isTopAndHome={headerRenderInfo.isTopAndHome}
                    />
                </div>
            </div>
        </header>
    );
}, style, { allowMultiple: true });