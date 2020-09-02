import React from 'react';
import { resizeListener, scrollListener } from '@utils/eventListener';
import { BASIC_COMPARE_WIDTH } from '@utils/constant';
import { HeaderPC } from '@components/basicHeader/headerPC';
import { HeaderMobile } from '@components/basicHeader/headerMobile';

export const BasicHeader = class extends React.Component {
    constructor(props){
        super(props);
//        console.log(props);
        this.state = {
            //  是否滚动在顶部
            isTop: true,
            //  浏览器宽度是否超过BASIC_COMPARE_WIDTH
            isRelativelyWide: window.innerWidth > BASIC_COMPARE_WIDTH,
            //  右侧菜单的折叠状态 true:折叠
            menuIsFold: true,
            //  激活了哪一个路由？
            menuListActiveIndex: props.menuListActiveIndex || 0,
            //  展开了哪一个菜单？
            menuListUnFoldIndex: -1,
            //  是中文还是英文站点
            isCN: props.isCN || true,
        };
    }

    //  钩子
    componentDidMount(){
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
    headerMoseOver = () => {
        //  告诉子组件我不是在顶部，以展示白色
        this.setState(() => {
            return {
                isTop: false
            };
        });
    };
    //  鼠标离开
    headerMouseLeave = () => {
        this.setState(() => {
            return {
                isTop: (document.documentElement.scrollTop || document.body.scrollTop) === 0
            };
        });
    };

    //  渲染函数
    render(){
        const {
            isTop,
            menuIsFold,
            menuListActiveIndex,
            menuListUnFoldIndex,
            isCN,
        } = this.state;
        return (
            //  pc？
            this.state.isRelativelyWide ?
                <HeaderPC
                    isTop={isTop}
                    menuIsFold={menuIsFold}
                    menuListActiveIndex={menuListActiveIndex}
                    menuListUnFoldIndex={menuListUnFoldIndex}
                    isCN={isCN}
                    headerMouseOver={this.headerMoseOver}
                    headerMouseLeave={this.headerMouseLeave}
                /> :
                <HeaderMobile
                    isTop={isTop}
                    menuIsFold={menuIsFold}
                    menuListActiveIndex={menuListActiveIndex}
                    menuListUnFoldIndex={menuListUnFoldIndex}
                    isCN={isCN}
                    menuListClick={this.menuListClick}
                    menuFoldClick={this.menuFoldClick}
                />
        );
    }
};
