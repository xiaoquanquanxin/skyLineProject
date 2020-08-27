import React from 'react';
import CSSModules from 'react-css-modules';
import logoBlue from '@images/header/logo-blue.png';
import product01 from '@images/header/product-01.png';
import style from './index.less';
import { scrollListener } from '@utils/eventListener';

//  菜单列表项
const MenuListItem = CSSModules(
    function ({ menuListActiveIndex, currentIndex, content, href, target }){
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
                <a className={`${menuListActiveIndex === currentIndex ? style.activeColor : ''} ${style.menuListItem}`}
                   href={href}
                   target={target}
                   onClick={clickFn}>
                    {content}
                </a>
            </li>
        );
    }
);

//  产品列表项
const ProductItem = CSSModules(
    function ({ src, description }){
        return (
            <li className={style.item}>
                <a href="/product">
                    <img className={style.itemImage} src={src}/>
                    <span className={style.itemDescription}>{description}</span>
                </a>
            </li>
        );
    }
);

//  头部渲染
const BasicHeaderRenderComponent = CSSModules(
    function ({ isTop, menuIsFold, menuListActiveIndex, menuListUnFoldIndex, menuFoldClick, menuListClick, }){
        //  渲染信息
        const headerRenderInfo = {
            imageLogo: null,
            imageMenu: null,
        };

        //  如果折叠
        if (menuIsFold) {
            headerRenderInfo.imageMenu = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAAwCAYAAABaHInAAAABKElEQVRoQ+2aMWpCQRRFj41VGrssQbKEgJVYBYLgDrKAbCCWkgWkVzcgxMLKWlxAIHvIBgLpXjDJ/CYIA9NcL2/qN8O997w/8B/Tw3T1TH3xYywiroEHoG9idF2MbYCZiamTjfdibAfcGRn7KMaGwItRKz57Xx5GLdhZSWKXRjWJJTGRBLIVRUBUy0hi1VGJFCYxERDVMpJYdVQihd7EIuIGOAADkcBbZczLH/QrMG09TWj/ZzG2/JtSCWlrkvJWjF0Bj0Yzj5X35dEEXXRzEhMFc1ZWEktiIglkK4qAqJaRxKqjEilMYiIgqmUkseqoRAr9iUXEGBiJBN4qo3vncQ9s4fdBi8HqRgN7YGJgqFj4KjOPJ2BhZGzbtV5E3BoNc44u39S/ZvsGLbg7JPN5vKcAAAAASUVORK5CYII=';
        } else {
            //  如果展开
            headerRenderInfo.imageMenu = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAADaUlEQVRoQ82Zv2sUQRTHv+/usPB/sBLELtlZOwtJIoiCKERFjYUIGhQLC7HVSpAUEYIWappYKDaCIgQLQbSx2NmQ1ta/QEXwEvfJxLsw2ZudnZ2dibfl3v74fuZ939y97xEATExMHOj1ejMbGxtv19fXv6lz43qkaXqQmWeKoni/trb2ldI0nWLmVSLaA2CzKIrZPM/fjCOAEOIWES1q2qYVwDsAJ7STYwlhEK8kLymAGwAelVZ8k5lPSilXx6ESJvH875giJVAI8YSIrupimbkP4NT/hkjT9DqAx+WFZOZrUsqnWwDjCmESr5YdwLwSr3RvAwwglojo5jhUoko8M1/O83xlqHEHQA3EcSnlh93oCVfxIxXQ7GSqxG+1W8WGaCK+EsBSiagQSZJc6XQ6yyULK9vvsI3++YiF9A+FELtWCSWeiJ4R0bamwVZZKd5aAc1OC0R0u7QqQSthEX8xz/OXtr6zVqAOgoiOZln2uU1jtxHvVAEbBIBfAI75QrQV3whg0NgjdvKFEELMAXhu8HytbZyb2GQNIURrCJN4AH+KorhU5/myJqceKN9kgZjOsuyLrSeqxDPzWSnl66b95AUwsNNdIrpX2p1+DhrbCBFafOMeKK9OmqZqe11wgYghvjWAeoALRJIkZ4jold6wyvO+tmnVxCaP2iCKotjX6XTUl1FXu1cNTOd8PB+kiV0hAPwAsLcsHsDpLMvUKNv68G7iBhD6pZshxQfpAZfGHlwTXHwUgIr0QL0rStoR1EIW8cNCBU87ggFUpQdli4VOO4IAWKKPeQCHYkY2rQFcoo+YuVMrgCYDeCwIb4Am4od9UDFjqwTQO7LxAvBJD2ogvGfsxgC+6YG+G4VMOxoBhBAfuhLOACEGcMNkZ8ydmqQdTgAxxNsq0SQoqAUIlR7Yfje3CQrqosUg0YfLj35fiEqAkNGHC4C6xgfCCBBrAHcBaRrZmP7gGLFNqAHcBaCqEsxsjGx2AMRMD1zFa7uTKRUfgdgGUOIN6UGQ6KOpeA2iNjzbAqgQHyz68AVQ91kimyNZlkmanJw83O12P8aMPtoAVEEA+N7v9xMSQrwgovPaS6KkBzEgmHlRAdwhogcxo4+24of363Ya/OF9QfVATwhxH8B+AA+llJ9CvTDGc5IkmSWiOSJaVuneX9ZWEO+AL4LxAAAAAElFTkSuQmCC';
            //  如果展开， 那么样式一定是白色背景并且，菜单是黑色的
            isTop = false;
        }
        //  如果滚动到顶部
        if (isTop) {
            headerRenderInfo.imageLogo = 'data:image/png;base64,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';
        } else {
            headerRenderInfo.imageLogo = logoBlue;
            //  如果没有滚到顶部，但是导航展开，菜单应该是黑色的
            if (menuIsFold) {
                headerRenderInfo.imageMenu = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAAwCAYAAABaHInAAAABVElEQVRoQ+2aMWrDQBBF56vYKo0KQUqBdpeQIwRSGVeGEMgNcgBfwClDDpA+zgUMduEqdfABDLlDLhAISDDBMhKGNAvbjIfZenb5/7/RgoYFKV1Q6ot6Y3VdXzrnHonIaTDatu17byyEsALwoMHUwQMzfw3GtgBmWowR0XdvLMZ4xcyvWlqRmV90Xx6KWnC0YsTOjaoRM2JCErBWFAIiWYYRS45KSKEREwIiWYYRS45KSKFuYt7766IoPomoFBJ4lgxmfhr+oNdEdJ91mqzNP8PM4w3AYUqlZe17Y1VVXZRlOdcy8+i6bqn78tDSf6c+jNi5UTViRkxIAtaKQkAkyzBiyVEJKTRiQkAkyzBiyVEJKdRPLMY4IaJbIYFnyRjfeXjv7wBsAGgheBwNhBA+AEyzYhK0mZl/B2MLAM+CtOVK2Yyt1zTNDQAVb6mcczst39Q/wn+JlTHoMzbiyQAAAABJRU5ErkJggg==';
            }
        }
        return (
            <header className={style.basicHeader}>
                <div className={`${style.basicHeaderWrap} ${isTop ? style.isTop : ''}`} style={{ position: 'fixed' }}>
                    <img className={`${style.basicHeaderLogo}`}
                         src={headerRenderInfo.imageLogo}
                         alt="地平线头部logo"/>
                    <img className={style.basicHeaderMenu}
                         onClick={() => (menuFoldClick(menuIsFold))}
                         src={headerRenderInfo.imageMenu}
                         alt="地平线菜单图标"/>
                    <ul className={`${style.menuList} ${style.menuListShow}`}>
                        <MenuListItem
                            menuListActiveIndex={menuListActiveIndex}
                            currentIndex={1}
                            content='首页'
                            href='/index.html'
                        />
                        <li onClick={() => (menuListClick(1))}>
                            <div
                                className={`${style.menuListItem}
                                 ${menuListActiveIndex === 1 ? style.activeColor : ''}
                                 ${menuListUnFoldIndex === 1 ? style.curr : ''}`}>产品中心
                                <img
                                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAB5klEQVRoQ+2XzSpFURTHfzfyURLvYIKJiRKFpIzMPIQnMLrxGF5BmUgkJZGRKRMZKMrA50AZKWnVPnXadc/e56x10611pvv8/3v9P/Y+97bo8afV4/PjAv47QU/AE1A64BVSGqiGewJqC5UEnoDSQDXcE1BbqCTITWAM2Ab6gTbwpdy3E3wA2AImgB3gMbVProB9YCOQPQDzwEuKvOb6MHAWuAV6D0wCv1U8OQIGgW+gr0RkLSIevthqDrjWChD8LrAZEYmIReC5ptPx6yPAacn5Yv0q8FfS5yQgBNL9I2AtYnsKGzcVIcOfA7MR7y2wDHymzMkVIDxywA4NRYyGzjceXoaqIyAlQuqUvDWCozL8JTDT1PkCV1dAlQip0UKGCLPhmyRQCO9Up5SI8dB5tfOaBHJESJ3klio/MrzcLNPa2pTxTSpUxndKQj5y8rErRHRleE2FckUsAR/AhbXzFhXKEfEOvAJTUW3uwoFP3vOW34EUl9TpBFhJvCjDyxl5SxHmrGvPQLzHEHBcIcJ0eKszkCvCfPhuCRBeSeKg9LPjBli1qo3lNZqq6Togf4b2gJ/Uy03Wrc9AkxlUGBegss8A7AkYmKii8ARU9hmAPQEDE1UUnoDKPgOwJ2BgoorCE1DZZwD+A5xEVzEAReBTAAAAAElFTkSuQmCC"
                                    alt="箭头"/>
                            </div>
                            {
                                menuListUnFoldIndex === 1 ?
                                    <ul className={style.headerProduct}>
                                        <ProductItem
                                            src={product01}
                                            href={'/product'}
                                            description={'Sunrise 旭日'}
                                        />
                                        <ProductItem
                                            src={product01}
                                            href={'/product'}
                                            description={'Sunrise 旭日'}
                                        />
                                        <ProductItem
                                            src={product01}
                                            href={'/product'}
                                            description={'Sunrise 旭日'}
                                        />
                                        <ProductItem
                                            src={product01}
                                            href={'/product'}
                                            description={'Nebula 智能车载主动安全解决方案'}
                                        />
                                    </ul>
                                    : ''
                            }
                        </li>
                        <li onClick={() => (menuListClick(2))}>
                            <div
                                className={`${style.menuListItem}
                                 ${menuListActiveIndex === 2 ? style.activeColor : ''}
                                 ${menuListUnFoldIndex === 2 ? style.curr : ''}`}>解决方案
                                <img
                                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAB5klEQVRoQ+2XzSpFURTHfzfyURLvYIKJiRKFpIzMPIQnMLrxGF5BmUgkJZGRKRMZKMrA50AZKWnVPnXadc/e56x10611pvv8/3v9P/Y+97bo8afV4/PjAv47QU/AE1A64BVSGqiGewJqC5UEnoDSQDXcE1BbqCTITWAM2Ab6gTbwpdy3E3wA2AImgB3gMbVProB9YCOQPQDzwEuKvOb6MHAWuAV6D0wCv1U8OQIGgW+gr0RkLSIevthqDrjWChD8LrAZEYmIReC5ptPx6yPAacn5Yv0q8FfS5yQgBNL9I2AtYnsKGzcVIcOfA7MR7y2wDHymzMkVIDxywA4NRYyGzjceXoaqIyAlQuqUvDWCozL8JTDT1PkCV1dAlQip0UKGCLPhmyRQCO9Up5SI8dB5tfOaBHJESJ3klio/MrzcLNPa2pTxTSpUxndKQj5y8rErRHRleE2FckUsAR/AhbXzFhXKEfEOvAJTUW3uwoFP3vOW34EUl9TpBFhJvCjDyxl5SxHmrGvPQLzHEHBcIcJ0eKszkCvCfPhuCRBeSeKg9LPjBli1qo3lNZqq6Togf4b2gJ/Uy03Wrc9AkxlUGBegss8A7AkYmKii8ARU9hmAPQEDE1UUnoDKPgOwJ2BgoorCE1DZZwD+A5xEVzEAReBTAAAAAElFTkSuQmCC"
                                    alt="箭头"/>
                            </div>
                            {
                                menuListUnFoldIndex === 2 ?
                                    <ul className={style.programme}>
                                        <li><a href="/intelligentDriving.html">智能驾驶</a></li>
                                        <li>
                                            <a>智能物联网</a>
                                            <ul className={style.aiotChildren}>
                                                <li><a href="/visual.html">视觉</a></li>
                                                <li><a href="">语音</a></li>
                                            </ul>
                                        </li>
                                    </ul>
                                    : ''
                            }
                        </li>
                        <MenuListItem
                            menuListActiveIndex={menuListActiveIndex}
                            currentIndex={3}
                            content='新闻中心'
                            href='/newsCenter.html'
                        />
                        <MenuListItem
                            menuListActiveIndex={menuListActiveIndex}
                            currentIndex={4}
                            content='关于我们'
                            href='/aboutAs.html'
                        />
                        <MenuListItem
                            menuListActiveIndex={menuListActiveIndex}
                            currentIndex={5}
                            content='加入我们'
                            target='_blank'
                            href='http://horizon.hotjob.cn/'
                        />
                        <li>
                            <div
                                className={`${menuListActiveIndex === 6 ? style.activeColor : ''} ${style.menuListItem}`}>
                                <span>CN</span>
                                <b className={style.languageItem}>/</b>
                                <span>EN</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </header>
        );
    }, style, { allowMultiple: true });

export const BasicHeader = class extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            //  是否滚动在顶部
            isTop: true,
            //  右侧菜单的折叠状态
            menuIsFold: true,
            //  激活了哪一个路由？
            menuListActiveIndex: 0,
            //  展开了哪一个菜单？
            menuListUnFoldIndex: 2
        };
    }

    componentDidMount(){
        const fn = (scrollTop) => {
            this.setState(() => {
                return {
                    isTop: scrollTop === 0
                };
            });
        };
        scrollListener(fn);
    }

    //  头部右侧折叠框的点击事件
    menuFoldClick = (menuIsFold) => {
        this.setState(() => {
            return {
                menuIsFold: !menuIsFold
            };
        });
    };
    //  头部导航
    menuListClick = (menuListUnFoldIndex) => {
        //  如果点击的还是原来那个
        if (this.state.menuListUnFoldIndex === menuListUnFoldIndex) {
            menuListUnFoldIndex = null;
        }
        this.setState(() => {
            return {
                menuListUnFoldIndex: menuListUnFoldIndex
            };
        });
    };

    render(){
        return (
            <BasicHeaderRenderComponent
                isTop={this.state.isTop}
                menuIsFold={this.state.menuIsFold}
                menuListActiveIndex={this.state.menuListActiveIndex}
                menuListUnFoldIndex={this.state.menuListUnFoldIndex}
                menuFoldClick={this.menuFoldClick}
                menuListClick={this.menuListClick}
            />
        );
    }
};

