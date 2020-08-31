import React from 'react';
import CSSModules from 'react-css-modules';
import { pathConfig } from '@utils/constant';
import style from './index.less';
import layout from '@css/layout.less';
import product01 from '@images/header/product-01.png';

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
    function (isCN){
        return (
            <li>
                <div className={`${style.menuListItem} ${style.languageItem}`}>
                    {isCN ? <span className={style.activeColor}>CN</span> : <a href='https://horizon.ai/'>CN</a>}
                    <b className={style.languageSplit}>/</b>
                    {!isCN ? <span className={style.activeColor}>EN</span> : <a href='https://en.horizon.ai/'>EN</a>}
                </div>
            </li>
        );
    }
);

//  产品列表项
const ProductItem = CSSModules(
    function ({ src, href, description }){
        return (
            <li className={style.item}>
                <a href={href}>
                    <img className={style.itemImage} src={src} alt={description}/>
                    <span className={style.itemDescription}>{description}</span>
                </a>
            </li>
        );
    }
);

//  解决方案
const SolutionItem = CSSModules(
    function ({ activeColor, block }){
        return (
            <li className={style.headerProgramme}>
                <div className={`${style.menuListItem}
                                 ${activeColor ? style.activeColor : ''}`}
                >解决方案
                </div>
                <ul className={style.programme}>
                    <li><a href={pathConfig.intelligentDriving}>智能驾驶</a></li>
                    <li className={style.aiotChildrenWrap}>
                        <a>智能物联网</a>
                        <ul className={style.aiotChildren}>
                            <li><a href={pathConfig.visual}>视觉</a></li>
                            <li><a href={pathConfig.voice}>语音</a></li>
                        </ul>
                    </li>
                </ul>
            </li>
        );
    }
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
}) => {
//    console.log(isTopAndHome);
    return (
        //  如果窄屏展开，或者宽屏
        <ul className={`${style.menuPC} ${layout.clearfix} ${isTopAndHome ? style.isTopAndHome : ''} ${!menuIsFold ? style.menuListShow : ''}`}>
            {/*首页，index=0*/}
            <MenuListItem
                activeColor={menuListActiveIndex === 0}
                content='首页'
                href='/index.html'
            />
            {/*产品中心，index=1*/}
            <li className={style.headerProduct}>
                <div className={`${style.menuListItem}
                                 ${menuListActiveIndex === 1 ? style.activeColor : ''}`

                }>产品中心
                </div>
                <div className={style.productWrap}>
                    <ul className={`${style.product} ${layout.clearfix}`}>
                        <ProductItem
                            src={product01}
                            href={'/production.html'}
                            description={'Sunrise 旭日'}
                        />
                        <ProductItem
                            src={product01}
                            href={'/production.html'}
                            description={'Sunrise 旭日'}
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
                </div>
            </li>
            {/*解决方案，index=2*/}
            <SolutionItem
                activeColor={menuListActiveIndex === 2}
                block={menuListUnFoldIndex === 2}
            />
            {/*新闻中心，index=3*/}
            <MenuListItem
                activeColor={menuListActiveIndex === 3}
                content='新闻中心'
                href='/newsCenter.html'
            />
            {/*关于我们，index=4*/}
            <MenuListItem
                activeColor={menuListActiveIndex === 4}
                content='关于我们'
                href='/aboutAs.html'
            />
            {/*加入我们，index=5*/}
            <MenuListItem
                activeColor={menuListActiveIndex === 5}
                content='加入我们'
                target='_blank'
                href='http://horizon.hotjob.cn/'
            />
            {/*中英文切换*/}
            <ChineseEnglishSwitch isCN={isCN}/>
        </ul>
    );
};