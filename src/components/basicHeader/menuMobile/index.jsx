import React from 'react';
import CSSModules from 'react-css-modules';
import style from './index.less';
//  箭头
import arrowsSrc from '@media/basicHeader/icon-arrow-black.png';
//  每一项
const MenuListItem = CSSModules(
    ({
        //  数据
        data,
        //  点击箭头
        primaryMenuClick,
        //  索引
        index,
        //  是否事件激活
        isEventActive,
    }) => {
        let arrowsElements = null;
        let subListElements = null;
        //  有二级列表
        if (data.son) {
            arrowsElements = <img src={arrowsSrc} alt="箭头"
                                  className={style.arrows}
                                  onClick={() => (primaryMenuClick(index))}/>;
            if (isEventActive) {
                subListElements = <NavLevel2 subList={data.son}/>;
            }
        }
        return (
            <li className={`${(isEventActive || data.isActive) ? style.activeColor : ''} ${style.menuListItem}`}>
                <a href={data.url}
                   target={data.is_out ? '_blank' : '_self'}
                   onClick={() => (primaryMenuClick(index))}
                >{data.name}</a>
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
            if (item.isActive) {
                console.log(item);
            }
            return (
                <dd key={item.id} className={(item.isActive) ? style.navLevel2Active : ''}>
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
    //  展开的一级菜单的index
    primaryIndex,
    //  一级菜单点击事件
    primaryMenuClick,
}) => {
    if (!navListData || !navListData.length) {
        return '';
    }
    const list = navListData.map((item, index) => (
        <MenuListItem
            key={item.id}
            data={item}
            primaryMenuClick={primaryMenuClick}
            index={index}
            isEventActive={primaryIndex === index}
        />
    ));

    return (
        //  如果窄屏展开，或者宽屏
        <ul className={`${style.menuMobile} ${!menuIsFold ? style.menuListShow : ''}`}>
            {list}
        </ul>
    );
};

