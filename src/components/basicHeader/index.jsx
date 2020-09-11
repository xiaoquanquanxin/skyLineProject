import React, { Component } from 'react';
import { HeaderPC } from '@components/basicHeader/headerPC';
import { HeaderMobile } from '@components/basicHeader/headerMobile';
import { requestHeaderNav } from '@api/index';
import { navSortByRank, specialPathName } from '@utils/utils';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '@store/reduxMap';

export const BasicHeader = connect(
    mapStateToProps,
    mapDispatchToProps,
)(
    class extends Component {
        pathName;

        constructor(props){
            super(props);
            //  是哪一个页面
            this.pathName = window.location.pathname.replace(/\//ig, '');
            this.state = {
                //  鼠标浮于上方，锁定白色
                isOverHeader: false,

                //  右侧菜单的折叠状态 true:折叠
                menuIsFold: true,
                //  是首页？
                isHomePage: this.pathName === 'index.html' || this.pathName === '',
                //  展开的一级菜单的index - 移动端
                primaryIndex: -1,
                //  展开的二级菜单的index - 移动端
                secondaryIndex: -1,
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
                    //  ⚠️⚠️特殊问题特殊处理
                    specialPathName(this.pathName, v.data);
                    this.setState(() => ({
                        navListData: v.data
                    }));
                });
        }

        //  渲染函数
        render(){
            const {
                isOverHeader,
                menuIsFold,
                isHomePage,
                primaryIndex,
                secondaryIndex,
                navListData,
            } = this.state;
            const {
                isRelativeWide
            } = this.props.REDUCER_BROWSER_INFO;
            return (
                //  pc？
                isRelativeWide ?
                    <HeaderPC
                        isOverHeader={isOverHeader}
                        isHomePage={isHomePage}
                        navListData={navListData}
                        headerMouseOver={this.headerMouseOver}
                        headerMouseLeave={this.headerMouseLeave}
                    /> :
                    <HeaderMobile
                        menuIsFold={menuIsFold}
                        isHomePage={isHomePage}
                        primaryIndex={primaryIndex}
                        secondaryIndex={secondaryIndex}
                        navListData={navListData}
                        primaryMenuClick={this.primaryMenuClick}
                        secondaryMenuClick={this.secondaryMenuClick}
                        menuFoldClick={this.menuFoldClick}
                    />
            );
        }

        /**
         * 导航排序
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

                if (value.url === null) {
                    console.log(value.url, value);
                } else if (value.url === this.pathName) {
//                console.log('匹配到的页面，这个路由是激活的🐸', value);
                    //  激活态
                    value.isActive = true;
                    //  不需要跳转
                    value.url = null;
                    currentHasActive = true;
                } else if (!value.url.includes('.html') && !value.url.includes('http')) {
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
        //  一级菜单点击事件
        primaryMenuClick = (primaryIndex) => {
            //  如果点击的还是原来那个
            if (this.state.primaryIndex === primaryIndex) {
                primaryIndex = -1;
            } else {
                //  点击的不同，次级index重置
                this.setState(() => ({
                    secondaryIndex: -1
                }));
            }
            this.setState(() => ({
                primaryIndex,
            }));
        };
        //  次级菜单点击事件
        secondaryMenuClick = (secondaryIndex) => {
            if (this.state.secondaryIndex === secondaryIndex) {
                secondaryIndex = -1;
            }
            this.setState(() => ({
                secondaryIndex,
            }));
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
    }
);

