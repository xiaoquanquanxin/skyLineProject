import React from 'react';
import { resizeListener, scrollListener } from '@utils/eventListener';
import { BASIC_COMPARE_WIDTH } from '@utils/constant';
import { HeaderPC } from '@components/basicHeader/headerPC';
import { HeaderMobile } from '@components/basicHeader/headerMobile';
import { requestHeaderNav } from '@api/index';
import { navSortByRank } from '@utils/utils';

export const BasicHeader = class extends React.Component {
    constructor(props){
        super(props);
        //  是哪一个页面
        this.pathName = window.location.pathname.replace(/\//ig, '');
//        console.log(props);
        this.state = {
            //  是否滚动在顶部
            isTop: true,
            //  鼠标浮于上方，锁定白色
            isOverHeader: false,
            //  浏览器宽度是否超过BASIC_COMPARE_WIDTH
            isRelativelyWide: window.innerWidth > BASIC_COMPARE_WIDTH,
            //  右侧菜单的折叠状态 true:折叠
            menuIsFold: true,
            //  是首页？
            isHomePage: this.pathName === 'index.html',
            //  展开了哪一个菜单？
            menuListUnFoldIndex: -1,
            //  是中文还是英文站点
            isCN: props.isCN || true,

            //  请求的导航数据
            navListData: null
        };
    }

    //  钩子
    componentDidMount(){
        //  发请求，取导航数据
        requestHeaderNav()
            .then(v => {
                this.navSort(v.data);
                this.setState(() => ({
                    navListData: v.data
                }));
            });
        //  滚动监听回调函数，用于控制header的css
        const sfn = (scrollTop) => {
            this.setState(() => {
                return {
                    isTop: scrollTop === 0
                };
            });
        };
        //  滚动监听
        scrollListener(sfn);

        //  resize监听，用于适配
        const rfn = (width) => {
            this.setState(() => {
                return {
                    isRelativelyWide: width > BASIC_COMPARE_WIDTH
                };
            });
        };
        //  resize监听
        resizeListener(rfn);
    }

    //  导航排序
    /**
     * @param {Array} list              数据
     * @return {boolean}                子路由有没有被选中
     * **/
    navSort(list){
        navSortByRank(list, 'rank');
        //  当前路由有没有被选中
        let currentHasActive = false;
        for (let value of list) {
            //  console.log(value.url);
            //  如果遍历到的url和当前页面的url匹配，那么，我当前选中的就是这个路由，它的div应该是激活态
            if (value.url === this.pathName) {
                console.log('🐸', value);
                //  激活态
                value.isActive = true;
                //  不需要跳转
                value.url = null;
                currentHasActive = true;
            } else if (!value.url.includes('.html')) {
                //  如果不包含.html后缀，说明是死路由
                value.url = null;
            }
            //  如果没有子路由
            if (!value.son || !value.son.length) {
                value.son = null;
            } else {
                //  排子列表
                const childIsActive = this.navSort(value.son);
                //  子路由有没有被选中
                if (childIsActive) {
                    value.isActive = true;
                    currentHasActive = true;
                }
            }
        }
        return currentHasActive;
    }

    //  头部右侧折叠框的点击事件
    menuFoldClick = (menuIsFold) => {
        this.setState(() => {
            return {
                menuIsFold: !menuIsFold
            };
        });
    };
    //  箭头
    menuListClick = (menuListUnFoldIndex) => {
//        console.log('箭头');
        //  如果点击的还是原来那个
        if (this.state.menuListUnFoldIndex === menuListUnFoldIndex) {
            menuListUnFoldIndex = -1;
        }
        this.setState(() => {
            return {
                menuListUnFoldIndex: menuListUnFoldIndex
            };
        });
    };

    //  鼠标浮于上方
    headerMouseOver = () => {
        //  告诉子组件我不是在顶部，以展示白色
        this.setState(() => {
            return {
                isOverHeader: true,
            };
        });
    };
    //  鼠标离开
    headerMouseLeave = () => {
        this.setState(() => {
            return {
                isOverHeader: false,
            };
        });
    };

    //  渲染函数
    render(){
        const {
            isTop,
            isOverHeader,
            menuIsFold,
            isHomePage,
            menuListUnFoldIndex,
            isCN,
            navListData,
        } = this.state;
        return (
            //  pc？
            this.state.isRelativelyWide ?
                <HeaderPC
                    isTop={isTop}
                    isOverHeader={isOverHeader}
                    menuIsFold={menuIsFold}
                    isHomePage={isHomePage}
                    menuListUnFoldIndex={menuListUnFoldIndex}
                    isCN={isCN}
                    navListData={navListData}
                    headerMouseOver={this.headerMouseOver}
                    headerMouseLeave={this.headerMouseLeave}
                /> :
                <HeaderMobile
                    isTop={isTop}
                    menuIsFold={menuIsFold}
                    isHomePage={isHomePage}
                    menuListUnFoldIndex={menuListUnFoldIndex}
                    isCN={isCN}
                    menuListClick={this.menuListClick}
                    menuFoldClick={this.menuFoldClick}
                />
        );
    }
};

