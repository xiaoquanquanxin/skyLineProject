import React from 'react';
import { MenuPC } from '@components/basicHeader/menuPC';
import { GetHeaderLogoMenuInformation, logoClick } from '../common/headerCommon';
import style from './index.module.less';
import layout from '@css/layout.module.less';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '@store/reduxMap';

//  PC端头部
export const HeaderPC = connect(
    mapStateToProps,
    mapDispatchToProps
)(
    ({
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
        //  浏览器滚动信息
        REDUCER_BROWSER_INFO,
    }) => {
        const { scrollTop, scrollLeft } = REDUCER_BROWSER_INFO;
        //  渲染信息
        const headerRenderInfo = GetHeaderLogoMenuInformation(true, scrollTop <= 0, isHomePage, isOverHeader);
        return (
            <header className={style.basicHeader}
                    onMouseOver={() => {headerMouseOver();}}
                    onMouseLeave={() => {headerMouseLeave();}}
            >
                <div className={`${style.basicHeaderWrap} ${headerRenderInfo.isTopAndHome ? style.isTopAndHome : ''}`}
                     style={isHomePage ? { position: 'fixed', left: `${-scrollLeft}px` } : { position: 'relative' }}
                >
                    <div className={`${style.inner} ${layout.clearfix}`}>
                        {/*logo*/}
                        <div className={`${style.basicHeaderLogo} ${layout.left}`}>
                            <img className={`${layout.inlineBlock}`}
                                 src={headerRenderInfo.imageLogoSrc}
                                 onClick={() => (logoClick(isHomePage))}
                                 alt="地平线头部logo"/>
                        </div>
                        {/*菜单*/}
                        <MenuPC
                            navListData={navListData}
                            isTopAndHome={headerRenderInfo.isTopAndHome}
                        />
                    </div>
                </div>
            </header>
        );
    }
);