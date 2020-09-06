import style from './index.module.less';
import React from 'react';
import { logoClick, GetHeaderLogoMenuInformation } from '../common/headerCommon';
import { MenuMobile } from '@components/basicHeader/menuMobile';

//  移动端头部渲染
export const HeaderMobile = (
    ({
        //  页面是处于顶部
        isTop,
        //  菜单是否展开
        menuIsFold,
        //  是否为首页
        isHomePage,
        //  展开的一级菜单的index - 移动端
        primaryIndex,
        //  展开的二级菜单的index - 移动端
        secondaryIndex,
        //  数据
        navListData,
        //  一级菜单点击事件
        primaryMenuClick,
        //  次级菜单点击事件
        secondaryMenuClick,
        //  菜单展开点击事件
        menuFoldClick,
    }) => {
        //  如果需要永久展开菜单
        //  menuIsFold = false;
        //  渲染信息
        const headerRenderInfo = GetHeaderLogoMenuInformation(menuIsFold, isTop, isHomePage, false);
        return (
            <header className={style.basicHeader}>
                <div className={`${style.basicHeaderWrap} ${headerRenderInfo.isTopAndHome ? style.isTopAndHome : ''}`}>
                    {/*logo*/}
                    <img className={`${style.basicHeaderLogo}`}
                         src={headerRenderInfo.imageLogoSrc}
                         onClick={() => (logoClick(isHomePage))}
                         alt="地平线头部logo"/>
                    {/*菜单按钮*/}
                    <img className={style.basicHeaderMenu}
                         onClick={() => (menuFoldClick(menuIsFold))}
                         src={headerRenderInfo.imageMenuSrc}
                         alt="地平线菜单图标"/>
                    {/*菜单*/}
                    <MenuMobile
                        menuIsFold={menuIsFold}
                        navListData={navListData}
                        primaryIndex={primaryIndex}
                        secondaryIndex={secondaryIndex}
                        primaryMenuClick={primaryMenuClick}
                        secondaryMenuClick={secondaryMenuClick}
                    />
                </div>
            </header>
        );
    }
);






