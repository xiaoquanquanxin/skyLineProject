import React from 'react';
import CSSModules from 'react-css-modules';
import style from './index.less';
import layout from '@css/layout.less';
import { basicCompareWidth } from '@utils/constant';
import { resizeListener } from '@utils/eventListener';
import { SiteInfo } from '@components/basicFooter/siteInfo';
//  箭头
const currSrc = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAACBUlEQVRoQ+2XzSpFURTHfyvyURLvYIKJiRJ1ScrIzEN4AiPxGF5BmUgkJZGRKRMZKMrA50AZKUtL++p24u5zztqS2md69n/t9f9Y69wr/PNH/nn/ZAJ/7WB2IDvgVCBHyCmgG54dcEvoLJAdcArohmcH3BI6C5RyQFUHgFWgE1gRkRfnvd/CVbULWAaGgDURuY7dU5bAJrAYil0BkyJyFyte5b2q9gIHVjvgLoFhEXlvVydKQFW7gVego6VQUhLfNN+8akJETl0EDKyq68BSoZCRaIjIbRWli2dVtQ/Yb1G+eeRERBqx2lEHAgHL/g4wXyh4E+JUi0Ro/hAYL9Q9B2ZE5DkJgUDCBmw7FQlV7Q+Zr9289VXKgaYKYUv8RMLiFN0aQQxr/hgYq6t8E1eJQMQJi9FUjERQPknzlR0o4URbEqo6CFjm3crXdqAkCYuTbamvJzR/Aox6Y9OKrxyhQlM/DbZ95Oxj90nit5qvHaEKJKaBJ+AotfLuCJUk8QjcAyOF2FyEgY/u+WTfgVihsGL3gNnIWWveZuQhVrPMe9cMFC9Q1R5gtw2JpM0nmYEKJJI3/ysEwtYxJ7ZafnacAXOpYpNsjcYyqqoLgP0Z2hCRt9j5Ou+TzkCdBryYTMCroBefHfAq6MVnB7wKevHZAa+CXnx2wKugF58d8CroxWcHvAp68R/4Mq4x+a2PSAAAAABJRU5ErkJggg==';

const BasicFooterRender = CSSModules(
    ({
        isRelativelyWide,
        menuListActiveIndex,
        menuListUnFoldIndex,
        isCN,
    }) => (
        <section className={style.basicFooter}>
            <div className={`${style.basicFooterInfo} ${layout.clearfix}`}>
                <div className={style.static}>
                    <p className={style}>我们的愿景：</p>
                    <p className={style.subDescription}>边缘人工智能芯片全球领导者</p>
                    <p className={style}>我们的使命：</p>
                    <p className={style.subDescription}>赋能万物，让每个人的生活更安全，更美好</p>
                </div>
                <ul className={`${style.linkList} ${layout.clearfix}`}>
                    <li className={style.linkItem}>
                        <p className={style.linkItemPar}>公司产品
                            <img src={currSrc} className={style.curr} alt='箭头'/>
                        </p>
                    </li>
                    <li className={style.linkItem}>
                        <p className={style.linkItemPar}>公司业务
                            <img src={currSrc} className={style.curr} alt='箭头'/>
                        </p>
                    </li>
                    <li className={style.linkItem}>
                        <p className={style.linkItemPar}>关于我们
                            <img src={currSrc} className={style.curr} alt='箭头'/>
                        </p>
                    </li>
                    <li className={style.linkItem}>
                        <p className={style.linkItemPar}>联系我们
                            <img src={currSrc} className={style.curr} alt='箭头'/>
                        </p>
                    </li>
                </ul>
            </div>
            <SiteInfo/>
        </section>
    )
);
export const BasicFooter = class extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            //  浏览器宽度是否超过basicCompareWidth
            isRelativelyWide: window.innerWidth > basicCompareWidth,
            //  展开了哪一个菜单？
            menuListUnFoldIndex: -1,
            //  激活了哪一个路由？
            menuListActiveIndex: props.menuListActiveIndex || 0,
            //  是中文还是英文站点
            isCN: props.isCN || true,
        };
    }

    //  钩子
    componentDidMount(){
        //  resize监听，用于适配
        const rfn = (width) => {
            this.setState(() => {
                return {
                    isRelativelyWide: width > basicCompareWidth
                };
            });
        };
        //  resize监听
        resizeListener(rfn);
    }

    render(){
        return (
            <BasicFooterRender
                isRelativelyWide={this.state.isRelativelyWide}
                menuListActiveIndex={this.state.menuListActiveIndex}
                menuListUnFoldIndex={this.state.menuListUnFoldIndex}
                isCN={this.state.isCN}
            />
        );
    }
};