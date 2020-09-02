import style from './index.less';
import layout from '@css/layout.less';
import CSSModules from 'react-css-modules';
import { MenuPC } from '@components/basicHeader/menuPC';
import React from 'react';
import { GetHeaderLogoMenuInformation, logoClick } from '../common/headerCommon';

//  PC端头部
export const HeaderPC = CSSModules(({
    isTop,
    menuIsFold,
    menuListActiveIndex,
    menuListUnFoldIndex,
    isCN,
    headerMouseOver,
    headerMouseLeave,
}) => {
    //  渲染信息
    const headerRenderInfo = GetHeaderLogoMenuInformation(true, isTop, menuListActiveIndex);
//    console.log(headerRenderInfo.isTopAndHome);
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
                         onClick={() => (logoClick(menuListActiveIndex))}
                         alt="地平线头部logo"/>
                    {/*菜单*/}
                    <MenuPC
                        menuIsFold={menuIsFold}
                        isTopAndHome={headerRenderInfo.isTopAndHome}
                        menuListActiveIndex={menuListActiveIndex}
                        menuListUnFoldIndex={menuListUnFoldIndex}
                        isCN={isCN}
                    />
                </div>
            </div>
        </header>
    );
}, style, { allowMultiple: true });