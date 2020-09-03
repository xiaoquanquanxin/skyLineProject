import React from 'react';
import CSSModules from 'react-css-modules';
import style from './index.less';
import layout from '@css/layout.less';
//  箭头
import arrowsSrc from '@media/basicHeader/icon-arrow-black.png';
//  每一项
const MenuListItem = CSSModules(
    ({
        //  是激活状态
        isActive,
        //  文字
        content,
        //  链接
        href,
        //  打开方式
        target,
        //  子元素，子路由
        subList,
        //  点击箭头
        arrowClick,
    }) => {
        let arrowsElements = null;
        let subListElements = null;
        if (subList) {
            arrowsElements = <img src={arrowsSrc} alt="箭头" className={style.arrows} onClick={() => (arrowClick(1))}/>;
            subListElements = <NavLevel2 subList={subList}/>;
        }
        return (
            <li className={`${isActive ? style.activeColor : ''} ${style.menuListItem}`}>
                <a href={href} target={target}>{content}</a>
                {arrowsElements}
                {subListElements}
            </li>
        );
    }
);

//  二级菜单
const NavLevel2 = CSSModules(
    ({ subList }) => {
        const list = subList.map((item) => {
            let arrowsElements = null;
            let subListElements = null;
            if (item.son) {
                arrowsElements = <img src={arrowsSrc} alt="箭头" className={style.arrows}/>;
                subListElements = <NavLevel3 lowestList={item.son}/>;
            }
            return (
                <dd key={item.id} className={item.isActive ? style.navLevel2Active : ''}>
                    <a href={item.url} target={item.target}>{item.name}</a>
                    {arrowsElements}
                    {subListElements}
                </dd>
            );
        });
        return (
            <dl className={style.navLevel2}>
                {list}
            </dl>
        );
    }
);

//  三级菜单
const NavLevel3 = CSSModules(
    ({ lowestList }) => {
        const list = lowestList.map((item) => {
            return (
                <dd key={item.id} className={item.isActive ? style.navLevel3Active : ''}>
                    <a href={item.url} target={item.target}>{item.name}</a>
                </dd>
            );
        });
        return (
            <dl className={style.navLevel3}>
                {list}
            </dl>
        );
    }
);

//  主菜单
export const MenuMobile = ({
    //  是折叠
    menuIsFold,
    //  数据
    navListData,
    //  菜单展开的index
    menuListUnFoldIndex,
    //  点击箭头
    arrowClick,
}) => {
    if (!navListData || !navListData.length) {
        return '';
    }
    const list = navListData.map((item) => (
        <MenuListItem
            isActive={item.isActive}
            key={item.id}
            content={item.name}
            href={item.url}
            target={item.is_out ? '_blank' : '_self'}
            subList={item.son}
            arrowClick={arrowClick}
        />
    ));

    return (
        //  如果窄屏展开，或者宽屏
        <ul className={`${style.menuMobile} ${!menuIsFold ? style.menuListShow : ''}`}>
            {list}
        </ul>
    );
};

