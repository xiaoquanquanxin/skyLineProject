import React from 'react';
import CSSModules from 'react-css-modules';
import style from './index.less';
import layout from '@css/layout.less';
//  箭头
const currSrc = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAACBUlEQVRoQ+2XzSpFURTHfyvyURLvYIKJiRJ1ScrIzEN4AiPxGF5BmUgkJZGRKRMZKMrA50AZKUtL++p24u5zztqS2md69n/t9f9Y69wr/PNH/nn/ZAJ/7WB2IDvgVCBHyCmgG54dcEvoLJAdcArohmcH3BI6C5RyQFUHgFWgE1gRkRfnvd/CVbULWAaGgDURuY7dU5bAJrAYil0BkyJyFyte5b2q9gIHVjvgLoFhEXlvVydKQFW7gVego6VQUhLfNN+8akJETl0EDKyq68BSoZCRaIjIbRWli2dVtQ/Yb1G+eeRERBqx2lEHAgHL/g4wXyh4E+JUi0Ro/hAYL9Q9B2ZE5DkJgUDCBmw7FQlV7Q+Zr9289VXKgaYKYUv8RMLiFN0aQQxr/hgYq6t8E1eJQMQJi9FUjERQPknzlR0o4URbEqo6CFjm3crXdqAkCYuTbamvJzR/Aox6Y9OKrxyhQlM/DbZ95Oxj90nit5qvHaEKJKaBJ+AotfLuCJUk8QjcAyOF2FyEgY/u+WTfgVihsGL3gNnIWWveZuQhVrPMe9cMFC9Q1R5gtw2JpM0nmYEKJJI3/ysEwtYxJ7ZafnacAXOpYpNsjcYyqqoLgP0Z2hCRt9j5Ou+TzkCdBryYTMCroBefHfAq6MVnB7wKevHZAa+CXnx2wKugF58d8CroxWcHvAp68R/4Mq4x+a2PSAAAAABJRU5ErkJggg==';

//  链接项
const Link = CSSModules(
    ({ url, name, activeLinkIndex }) => (
        <p>
            {url ?
                <a className={`${style.link} ${layout.block} ${activeLinkIndex ? '' : ''}`} href={url}>{name}</a>
                : <span className={`${style.noLinking} ${layout.block}`}>{name}</span>
            }
        </p>
    )
);
//  链接的一列
const LinkListItem = CSSModules(
    ({
        //  浏览器宽度是否超过BASIC_COMPARE_WIDTH
        isRelativelyWide,
        //  文字链接区域的文字描述
        par,
        //  链接list
        linkList,
        //  当前模块是第几个，从零开始，下标
        currentIndex,
        //  展开的导航是第几个，从零开始，下标
        isSpreadIndex,
        //  当前链接列，第几个路由是被激活的
        activeLinkIndex,
        //  点击展开模块
        spreadClick,
    }) => {
        const isSpread = isSpreadIndex === currentIndex;
        //  生成块内链接list
        const list = linkList.map(item => {
            return (
                <Link
                    url={item.url}
                    key={item.id}
                    name={item.name}
                    activeLinkIndex={activeLinkIndex}
                />
            );
        });
        return (
            <li className={`${style.linkItem} ${isRelativelyWide ? layout.left : ''}`}>
                <p className={style.linkItemPar} onClick={() => {spreadClick(currentIndex);}}>
                    {/*文字链接区域的文字描述*/}
                    {par}
                    {/*箭头*/}
                    {isRelativelyWide
                        ? ''
                        : <img src={currSrc} alt='箭头' className={`${style.curr} ${isSpread ? style.isSpread : ''}`}/>
                    }
                </p>
                <div className={`${style.linkWrap} ${(isSpread || isRelativelyWide) ? layout.block : layout.none}`}>
                    {list}
                </div>
            </li>
        );
    }
);

export const LinkList = CSSModules(
    ({
        //  浏览器宽度是否超过BASIC_COMPARE_WIDTH
        isRelativelyWide,
        //  被展开的链接块
        isSpreadIndex,
        //  被选中的link
        activeLinkIndex,
        //  数据
        data,
        //  展开底导航
        spreadClick,
    }) => {
        if (data === null) {
            return '';
        }
        const list = [
            { par: '公司业务', key: 'solution' },
            { par: '公司产品', key: 'product' },
            { par: '关于我们', key: 'aboutus' },
            { par: '联系我们', key: 'contact' },
        ].map((item, index) => {
            return (
                <LinkListItem
                    key={index}
                    isRelativelyWide={isRelativelyWide}
                    par={item.par}
                    linkList={data[item.key]}
                    currentIndex={index}
                    isSpreadIndex={isSpreadIndex}
                    activeLinkIndex={activeLinkIndex}
                    spreadClick={spreadClick}
                />
            );
        });
        return (
            <ul className={`${style.linkList} ${layout.clearfix} ${isRelativelyWide ? layout.right : ''}`}>
                {list}
            </ul>
        );
    }
);