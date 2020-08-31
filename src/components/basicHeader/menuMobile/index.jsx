import React from 'react';
import CSSModules from 'react-css-modules';
import { pathConfig } from '@utils/constant';
import style from './index.less';
import layout from '@css/layout.less';
import product01 from '@media/header/product-01.png';

const MenuListItem = CSSModules(
    function ({ activeColor, content, href, target }){
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
                <a className={`${activeColor ? style.activeColor : ''} ${style.menuListItem}`}
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
            <div className={style.menuListItem}>
                {isCN ? <span className={style.activeColor}>CN</span> : <a href='https://horizon.ai/'>CN</a>}
                <b className={style.languageItem}>/</b>
                {!isCN ? <span className={style.activeColor}>EN</span> : <a href='https://en.horizon.ai/'>EN</a>}
            </div>
        </li>
    )
);

//  产品列表项
const ProductItem = CSSModules(
    ({
        //  图片地址
        src,
        //  链接
        href,
        //  项目描述
        description,
        //  被选中的项目
        isActiveItem
    }) => (
        <li className={`${style.item} ${isActiveItem ? style.isActiveItem : ''}`}>
            <a href={href}>
                <img className={style.itemImage} src={src} alt={description}/>
                <span className={style.itemDescription}>{description}</span>
            </a>
        </li>
    )
);

//  产品中心
const ProductionCenter = CSSModules(
    ({
        activeColor,
        block,
        menuListClick,
    }) => (
        <li>
            <div onClick={() => (menuListClick(1))}
                 className={`${style.menuListItem}
                                 ${activeColor ? style.activeColor : ''}
                                 ${block ? style.curr : ''}`}>产品中心
                <img
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAB5klEQVRoQ+2XzSpFURTHfzfyURLvYIKJiRKFpIzMPIQnMLrxGF5BmUgkJZGRKRMZKMrA50AZKWnVPnXadc/e56x10611pvv8/3v9P/Y+97bo8afV4/PjAv47QU/AE1A64BVSGqiGewJqC5UEnoDSQDXcE1BbqCTITWAM2Ab6gTbwpdy3E3wA2AImgB3gMbVProB9YCOQPQDzwEuKvOb6MHAWuAV6D0wCv1U8OQIGgW+gr0RkLSIevthqDrjWChD8LrAZEYmIReC5ptPx6yPAacn5Yv0q8FfS5yQgBNL9I2AtYnsKGzcVIcOfA7MR7y2wDHymzMkVIDxywA4NRYyGzjceXoaqIyAlQuqUvDWCozL8JTDT1PkCV1dAlQip0UKGCLPhmyRQCO9Up5SI8dB5tfOaBHJESJ3klio/MrzcLNPa2pTxTSpUxndKQj5y8rErRHRleE2FckUsAR/AhbXzFhXKEfEOvAJTUW3uwoFP3vOW34EUl9TpBFhJvCjDyxl5SxHmrGvPQLzHEHBcIcJ0eKszkCvCfPhuCRBeSeKg9LPjBli1qo3lNZqq6Togf4b2gJ/Uy03Wrc9AkxlUGBegss8A7AkYmKii8ARU9hmAPQEDE1UUnoDKPgOwJ2BgoorCE1DZZwD+A5xEVzEAReBTAAAAAElFTkSuQmCC"
                    alt="箭头"/>
            </div>
            <ul className={`${style.headerProduct} ${layout.clearfix} ${block ? layout.block : layout.none}`}>
                <ProductItem
                    src={product01}
                    href={'/production.html'}
                    description={'Sunrise 旭日'}
                />
                <ProductItem
                    src={product01}
                    href={'/production.html'}
                    description={'Sunrise 旭日'}
                    isActiveItem={true}
                />
                <ProductItem
                    src={product01}
                    href={'/production.html'}
                    description={'Sunrise 旭日'}
                />
                <ProductItem
                    src={product01}
                    href={'/production.html'}
                    description={'Nebula 智能车载主动安全解决方案'}
                />
            </ul>
        </li>
    )
);
//  解决方案
const SolutionItem = CSSModules(
    function ({ activeColor, block, menuListClick }){
        const pathname = window.location.pathname;
//        console.log(`pathname:${pathname}`);
        return (
            <li>
                <div className={`${style.menuListItem}
                                 ${activeColor ? style.activeColor : ''}
                                 ${block ? style.curr : ''}`}
                     onClick={() => (menuListClick(2))}
                >解决方案
                    <img
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAB5klEQVRoQ+2XzSpFURTHfzfyURLvYIKJiRKFpIzMPIQnMLrxGF5BmUgkJZGRKRMZKMrA50AZKWnVPnXadc/e56x10611pvv8/3v9P/Y+97bo8afV4/PjAv47QU/AE1A64BVSGqiGewJqC5UEnoDSQDXcE1BbqCTITWAM2Ab6gTbwpdy3E3wA2AImgB3gMbVProB9YCOQPQDzwEuKvOb6MHAWuAV6D0wCv1U8OQIGgW+gr0RkLSIevthqDrjWChD8LrAZEYmIReC5ptPx6yPAacn5Yv0q8FfS5yQgBNL9I2AtYnsKGzcVIcOfA7MR7y2wDHymzMkVIDxywA4NRYyGzjceXoaqIyAlQuqUvDWCozL8JTDT1PkCV1dAlQip0UKGCLPhmyRQCO9Up5SI8dB5tfOaBHJESJ3klio/MrzcLNPa2pTxTSpUxndKQj5y8rErRHRleE2FckUsAR/AhbXzFhXKEfEOvAJTUW3uwoFP3vOW34EUl9TpBFhJvCjDyxl5SxHmrGvPQLzHEHBcIcJ0eKszkCvCfPhuCRBeSeKg9LPjBli1qo3lNZqq6Togf4b2gJ/Uy03Wrc9AkxlUGBegss8A7AkYmKii8ARU9hmAPQEDE1UUnoDKPgOwJ2BgoorCE1DZZwD+A5xEVzEAReBTAAAAAElFTkSuQmCC"
                        alt="箭头"/>
                </div>
                <ul className={`${style.programme} ${block ? layout.block : layout.none}`}>
                    <li
                        className={pathname === pathConfig.intelligentDriving ? style.isActiveItemProgramme : ''}
                    ><a href={pathConfig.intelligentDriving}>智能驾驶</a></li>
                    <li
                        className={(pathname === pathConfig.visual || pathname === pathConfig.voice)
                            ? style.isActiveItemProgramme : ''}
                    >
                        <a>智能物联网</a>
                        <ul className={style.aiotChildren}>
                            <li
                                className={pathname === pathConfig.visual ? style.isActiveItemProgramme : ''}
                            ><a href={pathConfig.visual}>视觉</a></li>
                            <li
                                className={pathname === pathConfig.voice ? style.isActiveItemProgramme : ''}
                            ><a href={pathConfig.voice}>语音</a></li>
                        </ul>
                    </li>
                </ul>
            </li>
        );
    }
);

//  主菜单
export const MenuMobile = ({
    menuIsFold,
    menuListActiveIndex,
    menuListUnFoldIndex,
    isCN,
    menuListClick,
}) => (
    //  如果窄屏展开，或者宽屏
    <ul className={`${style.menuMobile} ${!menuIsFold ? style.menuListShow : ''}`}>
        {/*首页，index=0*/}
        <MenuListItem
            activeColor={menuListActiveIndex === 0}
            content='首页'
            href='/index.html'
        />
        {/*产品中心，index=1*/}
        <ProductionCenter
            activeColor={menuListActiveIndex === 1}
            block={menuListUnFoldIndex === 1}
            menuListClick={menuListClick}
        />
        {/*解决方案，index=1*/}
        <SolutionItem
            activeColor={menuListActiveIndex === 2}
            block={menuListUnFoldIndex === 2}
            menuListClick={menuListClick}
        />
        {/*新闻中心，index=1*/}
        <MenuListItem
            activeColor={menuListActiveIndex === 3}
            content='新闻中心'
            href='/newsCenter.html'
        />
        {/*关于我们，index=1*/}
        <MenuListItem
            activeColor={menuListActiveIndex === 4}
            content='关于我们'
            href='/aboutAs.html'
        />
        {/*加入我们，index=1*/}
        <MenuListItem
            activeColor={menuListActiveIndex === 5}
            content='加入我们'
            target='_blank'
            href='http://horizon.hotjob.cn/'
        />
        {/*中英文切换，index=1*/}
        <ChineseEnglishSwitch isCN={isCN}/>
    </ul>
);