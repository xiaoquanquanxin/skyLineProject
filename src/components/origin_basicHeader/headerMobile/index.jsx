import style from './index.less';
import React from 'react';
import { logoClick, GetHeaderLogoMenuInformation } from '../common/headerCommon';
import { MenuMobile } from '@components/basicHeader/menuMobile';

//  移动端头部渲染
export const HeaderMobile = (
    function ({
        isTop,
        menuIsFold,
        menuListActiveIndex,
        menuListUnFoldIndex,
        isCN,
        menuFoldClick,
        menuListClick,
    }){
        //  渲染信息
        const headerRenderInfo = GetHeaderLogoMenuInformation(menuIsFold, isTop, menuListActiveIndex);
        return (
            <header className={style.basicHeader}>
                <div
                    className={`${style.basicHeaderWrap} ${headerRenderInfo.isTopAndHome ? style.isTopAndHome : ''}`}>
                    {/*logo*/}
                    <img className={`${style.basicHeaderLogo}`}
                         src={headerRenderInfo.imageLogoSrc}
                         onClick={() => (logoClick(menuListActiveIndex))}
                         alt="地平线头部logo"/>
                    {/*菜单按钮*/}
                    <img className={style.basicHeaderMenu}
                         onClick={() => (menuFoldClick(menuIsFold))}
                         src={headerRenderInfo.imageMenuSrc}
                         alt="地平线菜单图标"/>
                    {/*菜单*/}
                    <MenuMobile
                        menuIsFold={menuIsFold}
                        menuListActiveIndex={menuListActiveIndex}
                        menuListUnFoldIndex={menuListUnFoldIndex}
                        isCN={isCN}
                        menuListClick={menuListClick}
                    />
                </div>
            </header>
        );
    }
);






