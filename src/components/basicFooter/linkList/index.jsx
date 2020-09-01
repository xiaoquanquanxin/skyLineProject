import React from 'react';
import CSSModules from 'react-css-modules';
import style from './index.less';
import layout from '@css/layout.less';
//  箭头
const currSrc = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAACBUlEQVRoQ+2XzSpFURTHfyvyURLvYIKJiRJ1ScrIzEN4AiPxGF5BmUgkJZGRKRMZKMrA50AZKUtL++p24u5zztqS2md69n/t9f9Y69wr/PNH/nn/ZAJ/7WB2IDvgVCBHyCmgG54dcEvoLJAdcArohmcH3BI6C5RyQFUHgFWgE1gRkRfnvd/CVbULWAaGgDURuY7dU5bAJrAYil0BkyJyFyte5b2q9gIHVjvgLoFhEXlvVydKQFW7gVego6VQUhLfNN+8akJETl0EDKyq68BSoZCRaIjIbRWli2dVtQ/Yb1G+eeRERBqx2lEHAgHL/g4wXyh4E+JUi0Ro/hAYL9Q9B2ZE5DkJgUDCBmw7FQlV7Q+Zr9289VXKgaYKYUv8RMLiFN0aQQxr/hgYq6t8E1eJQMQJi9FUjERQPknzlR0o4URbEqo6CFjm3crXdqAkCYuTbamvJzR/Aox6Y9OKrxyhQlM/DbZ95Oxj90nit5qvHaEKJKaBJ+AotfLuCJUk8QjcAyOF2FyEgY/u+WTfgVihsGL3gNnIWWveZuQhVrPMe9cMFC9Q1R5gtw2JpM0nmYEKJJI3/ysEwtYxJ7ZafnacAXOpYpNsjcYyqqoLgP0Z2hCRt9j5Ou+TzkCdBryYTMCroBefHfAq6MVnB7wKevHZAa+CXnx2wKugF58d8CroxWcHvAp68R/4Mq4x+a2PSAAAAABJRU5ErkJggg==';

//  链接项
const Link = CSSModules(
    ({ href, text, activeLinkIndex }) => (
        <p>{href ?
            <a className={`${style.link} ${layout.block} ${activeLinkIndex ? '' : ''}`} href={href}>{text}</a>
            : <span className={`${style.noLinking} ${layout.block}`}>{text}</span>}</p>
    )
);
//  链接的一列
const LinkListItem = CSSModules(
    ({
        isRelativelyWide,
        par,
        linkList,
        //  展开的导航是第几个，从零开始，下标
        isSpreadIndex,
        //  当前模块是第几个，从零开始，下标
        currentIndex,
        //  当前链接列，第几个路由是被激活的
        activeLinkIndex,
        //  点击展开模块
        spreadClick,
    }) => {
        const isSpread = isSpreadIndex === currentIndex;
        //  生成块内链接list
        const list = linkList.map(item => <Link
            //            todo  错误
            href={item.href}
            key={item.text}
            text={item.text}
            activeLinkIndex={activeLinkIndex}
        />);
        return (
            <li className={`${style.linkItem} ${isRelativelyWide ? layout.left : ''}`}>
                <p className={style.linkItemPar} onClick={() => {spreadClick(currentIndex);}}>
                    {/*文字链接区域的文字描述*/}
                    {par}
                    {/*箭头*/}
                    {isRelativelyWide ? '' : <img src={currSrc} className={`${style.curr} ${isSpread ? style.isSpread : ''}`}
                                                  alt='箭头'/>}
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
        isRelativelyWide,
        isSpreadIndex,
        activeLinkIndex,
        spreadClick,
    }) => (
        <ul className={`${style.linkList} ${layout.clearfix} ${isRelativelyWide ? layout.right : ''}`}>
            <LinkListItem
                isRelativelyWide={isRelativelyWide}
                par='公司产品'
                linkList={[
                    { text: '征程处理器', href: 'www' },
                    { text: '旭日处理器', href: 'www' },
                    { text: '地平线 Matrix', href: 'www' },
                    { text: '地平线 Nebula', href: 'www' },
                ]}
                currentIndex={0}
                isSpreadIndex={isSpreadIndex}
                activeLinkIndex={activeLinkIndex}
                spreadClick={spreadClick}
            />
            <LinkListItem
                isRelativelyWide={isRelativelyWide}
                par='公司业务'
                linkList={[
                    { text: '智能驾驶', href: '' },
                    { text: '智能物联网 - 视觉', href: '' },
                    { text: '智能物联网 - 语音', href: '' },
                ]}
                currentIndex={1}
                isSpreadIndex={isSpreadIndex}
                activeLinkIndex={activeLinkIndex}
                spreadClick={spreadClick}
            />
            <LinkListItem
                isRelativelyWide={isRelativelyWide}
                par='关于我们'
                linkList={[
                    { text: '公司介绍', href: '' },
                    { text: '发展历程', href: '' },
                    { text: '主要投资阵容', href: '' },
                    { text: '联系我们', href: '' },
                ]}
                currentIndex={2}
                isSpreadIndex={isSpreadIndex}
                activeLinkIndex={activeLinkIndex}
                spreadClick={spreadClick}
            />
            <LinkListItem
                isRelativelyWide={isRelativelyWide}
                par='联系我们'
                linkList={[
                    { text: '业务合作：bd@horizon.ai', href: '' },
                    { text: '其他合作：mkt@horizon.ai', href: '' },
                ]}
                currentIndex={3}
                isSpreadIndex={isSpreadIndex}
                activeLinkIndex={activeLinkIndex}
                spreadClick={spreadClick}
            />
        </ul>
    )
);